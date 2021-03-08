const mongoose = require("../models/connect")
const bcrypt = require("bcrypt")
const Security = require("../models/Security")
const { stateFormat } = require("../controllers/dataFormat")
const createHttpError = require("http-errors")
const {
  NOT_FOUND_SECURITY_INFO_BY_TEACHERID,
  INITIALIZE_SECURITY_ERROR,
  INITIALIZE_SECRET_QUESTION_INFO_BY_TEACHERID_ERROR,
  NOT_FOUND_SECRET_QUESTION_INFO_BY_TEACHERID,
  WRONG_PASSWORD,
  WRONG_QUESTION,
  WRONG_EMAIL,
  WRONG_IDCARD,
  THE_SAME_PASSWORD,
  INITIALIZE_MORE_SECURITY_ERROR,
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
   * 检查密码、邮箱是否为默认111，密保问题是否为空
   * @method checkSecurityIsDefault
   */
  checkSecurityIsDefault: async (req, res, next) => {
    let originPassword = req.securityInfo.password
    let originEmail = req.securityInfo.secureEmail
    let isValidPwd = bcrypt.compareSync("111", originPassword)
    let isValidEml = bcrypt.compareSync("111", originEmail)
    let isValidQues = req.securityInfo.secretQuestion.length === 0
    req.defaultSecurity = {
      pwd: isValidPwd,
      eml: isValidEml,
      ques: isValidQues,
    }
    next()
  },
  /**
   * 原密码验证
   * @method securityComparePassword
   */
  securityComparePassword: async (req, res, next) => {
    let { password } = req.body
    let originPassword = req.securityInfo.password // 数据库中的密码（原密码）
    let isValid = bcrypt.compareSync(password, originPassword)
    if (!isValid)
      res.json(stateFormat(WRONG_PASSWORD.code, WRONG_PASSWORD.message))
    next()
  },
  /**
   * 密保问题验证
   * @method securityCompareQuestion
   */
  securityCompareQuestion: async (req, res, next) => {
    const { _teacher, secretQuestion } = req.body
    const originSecretQuestion = req.securityInfo.secretQuestion // 原密保问题数组
    const isPassVerify = secretQuestion.every((item, index) => {
      const isValid = bcrypt.compareSync(
        secretQuestion[index].answer,
        originSecretQuestion[index].answer
      )
      return isValid === true
    })
    isPassVerify
      ? next()
      : res.json(stateFormat(WRONG_QUESTION.code, WRONG_QUESTION.message))
  },
  /**
   * 安全邮箱验证
   * @method securityCompareQuestion
   */
  securityCompareEmail: async (req, res, next) => {},
  /**
   * 身份证号码验证
   * @method securityCompareQuestion
   */
  securityCompareIdcard: async (req, res, next) => {
    const { idNumber } = req.body
    req.teacherInfo.idNumber === idNumber
      ? next()
      : res.json(stateFormat(WRONG_IDCARD.code, WRONG_IDCARD.message))
  },
  /**
   * 更新密码（需提供原密码、新密码）
   * @method updatePassword
   */
  updatePassword: async (req, res, next) => {
    // 教师编号 原密码 新密码
    let { _teacherId, password, newPassword } = req.body
    let originPassword = req.securityInfo.password // 数据库中的密码（原密码）
    let isValid = bcrypt.compareSync(password, originPassword)
    if (isValid) {
      res.json(stateFormat(THE_SAME_PASSWORD.code, THE_SAME_PASSWORD.message))
    } else {
      Security.findOneAndUpdate(
        { _teacherId },
        { password: newPassword },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log(err)
            return
          }
          next()
        }
      )
    }
  },
  /**
   * 更新邮箱 TODO：感觉这里有bug
   * @method updateSecureEmail
   */
  updateSecureEmail: async (req, res, next) => {
    let { _teacherId, secureEmail } = req.body
    Security.findOneAndUpdate(
      { _teacherId },
      { secureEmail },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err)
          next(createHttpError(404))
        }
        next()
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
   * 批量初始化安全信息
   * @method securityInitializeMore
   */
  securityInitializeMore: async (req, res, next) => {
    Security.insertMany(req.teacherInfo, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        console.log("security")
        req.securityInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            INITIALIZE_MORE_SECURITY_ERROR.code,
            INITIALIZE_MORE_SECURITY_ERROR.message
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
