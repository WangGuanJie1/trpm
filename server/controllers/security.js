const mongoose = require("../models/connect")
const bcrypt = require("bcrypt")
const Security = require("../models/Security")
const { stateFormat } = require("../controllers/dataFormat")
const createHttpError = require("http-errors")
const {
  HTTP_SUCCEED,
  WRONG_PASSWORD,
  NOT_FOUND_SECURITY_INFO_BY_TEACHERID,
  INITIALIZE_SECURITY_ERROR,
  INITIALIZE_SECRET_QUESTION_INFO_BY_TEACHERID_ERROR,
  NOT_FOUND_SECRET_QUESTION_INFO_BY_TEACHERID,
} = require("../config/statusCode")
const { fillUpdatedBy } = require("../middlewares/fillMustRecord")

module.exports = {
  /**
   * 根据_teacherId查询单条数据
   * @method securityFindByTeacherId
   */
  securityFindByTeacherId: async (req, res, next) => {
    let _teacherId = req.body._teacherId
    Security.findOne({ _teacherId: _teacherId }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.securityInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_SECURITY_INFO_BY_TEACHERID.code,
            NOT_FOUND_SECURITY_INFO_BY_TEACHERID.message
          )
        )
      }
    })
  },
  /**
   * 密码验证
   * @method securityComparePassword
   */
  securityComparePassword: async (req, res, next) => {
    let { _teacherId, password } = req.body
    let originPassword = req.securityInfo.password
    let isValid = bcrypt.compareSync(password, originPassword)
    if (!isValid)
      res.json(stateFormat(WRONG_PASSWORD.code, WRONG_PASSWORD.message))
    next()
  },
  /**
   * 更新密码 TODO: 书写+方法命名不规范，待修改
   * @method updatePassword
   */
  updatePassword: async (req, res, next) => {
    let { _teacherId, password } = req.body
    Security.findOneAndUpdate(
      { _teacherId: _teacherId },
      { password: password },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err)
          return
        }
        req.data = stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message)
      }
    )
  },
  /**
   * 初始化安全信息
   * @method securityInitialize
   */
  securityInitialize: async (req, res, next) => {
    // 这里无需针对创建人和修改人是由系统默认
    Security.create({ _teacherId: req.teacherInfo._id }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.securityInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            INITIALIZE_SECURITY_ERROR.code,
            INITIALIZE_SECURITY_ERROR.message
          )
        )
      }
    })
  },
  /**
   * 初始化密保问题（一定需要提供3个问题及答案）
   * @method createSecretQuestion
   */
  initSecretQuestion: async (req, res, next) => {
    req = fillUpdatedBy(req)
    const secretQuestion = req.body.secretQuestion
    Security.updateOne(
      { _teacherId: req.body._teacherId },
      { secretQuestion: secretQuestion },
      (err, doc) => {
        if (err) {
          console.log(err)
          next(createHttpError(404))
        }
        if (doc.nModified !== 0) {
          next()
        } else {
          res.json(
            stateFormat(
              INITIALIZE_SECRET_QUESTION_INFO_BY_TEACHERID_ERROR.code,
              INITIALIZE_SECRET_QUESTION_INFO_BY_TEACHERID_ERROR.message
            )
          )
        }
      }
    )
  },
  /**
   * 筛选改变密码时候的验证方式
   * @method changePasswordSelectItem
   */
  changePasswordVerifyType: async (req, res, next) => {
    const verifyType = [
      {
        cnName: "密码",
        enName: "password",
      },
      {
        cnName: "邮箱",
        enName: "email",
      },
      {
        cnName: "密保问题",
        enName: "question",
      },
    ]
    // 身份证验证方式，不要轻易允许教师使用身份证验证
    const idCard2Verify = {
      cnName: "身份证号",
      enName: "idcard",
    }
    let { password, secureEmail } = req.securityInfo
    // 验证密码、邮箱、密保问题是否是默认设置
    const passwordIsValid = bcrypt.compareSync(password, "111")
    const emailIsValid = bcrypt.compareSync(secureEmail, "111")

    // 当密码是初始化密码111，则不允许使用密码进行验证
    if (!passwordIsValid) {
      const index = verifyType.findIndex(
        (element) => element.enName === "password"
      )
      verifyType.splice(index, 1)
    }
    // 当邮箱是初始化邮箱111，则不允许使用邮箱进行验证
    if (!emailIsValid) {
      const index = verifyType.findIndex(
        (element) => element.enName === "email"
      )
      verifyType.splice(index, 1)
    }
    // 当密保问题数量小于1，则不允许使用密保问题进行验证
    if (req.securityInfo.secretQuestion.length < 1) {
      const index = verifyType.findIndex(
        (element) => element.enName === "question"
      )
      verifyType.splice(index, 1)
    }
    // 检测验证方式禁用情况，若允许使用方式为0/1个则允许使用身份证验证
    if (verifyType.length < 2) {
      verifyType.push(idCard2Verify)
    }
    req.verifyType = verifyType
    next()
  },
  /**
   * 根据教师编号查找当前教师的安全问题
   * @method securityQuestionFindByTeacherId
   */
  securityQuestionFindByTeacherId: async (req, res, next) => {
    const { _teacherId } = req.body
    Security.aggregate(
      [
        {
          $lookup: {
            from: "dictionary_secret_question",
            localField: "secretQuestion._questionId",
            foreignField: "_id",
            as: "dictionary_secret_question",
          },
        },
        {
          $match: {
            _teacherId: mongoose.Types.ObjectId(_teacherId),
          },
        },
      ],
      (err, doc) => {
        if (err) {
          console.log(err)
          next(createHttpError(404))
        }
        if (doc) {
          if (doc[0].dictionary_secret_question.length === 0) {
            res.json(
              stateFormat(
                NOT_FOUND_SECRET_QUESTION_INFO_BY_TEACHERID.code,
                NOT_FOUND_SECRET_QUESTION_INFO_BY_TEACHERID.message
              )
            )
          } else {
            // TODO: 这里是将所有的字段都打包发送出去，没有进行字段筛选，一旦被抓包会有安全问题
            req.securityQuestionInfo = doc[0].dictionary_secret_question
            next()
          }
        } else {
          res.json(
            stateFormat(
              NOT_FOUND_SECURITY_INFO_BY_TEACHERID.code,
              NOT_FOUND_SECURITY_INFO_BY_TEACHERID.message
            )
          )
        }
      }
    )
  },
}
