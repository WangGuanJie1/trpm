const bcrypt = require("bcrypt")
const Security = require("../models/Security")
const { stateFormat } = require("../controllers/dataFormat")
const createHttpError = require("http-errors")
const {
  HTTP_SUCCEED,
  WRONG_PASSWORD,
  NOT_FOUND_SECURITY_INFO,
  INITIALIZE_SECURITY_ERROR,
} = require("../config/statusCode")

module.exports = {
  /**
   * 根据_teacherId查询单条数据
   * @method securityFindByTeacherId
   */
  securityFindByTeacherId: async (req, res, next) => {
    console.log(req.body)
    let _teacherId = req.body._teacherId
    Security.findOne({ _teacherId: _teacherId }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.securityInfo = doc
        console.log(req.securityInfo)
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_SECURITY_INFO.code,
            NOT_FOUND_SECURITY_INFO.message
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
   * 筛选改变密码时候的验证方式
   * @method changePasswordSelectItem
   */
  changePasswordVerifyType: async (req, res, next) => {
    // let { _teacherId, password } = req.body
    // let originPassword = req.securityInfo.password
    // let isValid = bcrypt.compareSync(password, originPassword)
    // if (!isValid)
    //   res.json(stateFormat(WRONG_PASSWORD.code, WRONG_PASSWORD.message))
    // next()

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
    const idCard2Verify = {
      cnName: "身份证号",
      enName: "idcard",
    }
    let { password, secureEmail } = req.securityInfo
    const passwordIsValid = bcrypt.compareSync(password, "111")
    const emailIsValid = bcrypt.compareSync(secureEmail, "111")
    if (!passwordIsValid) {
    }
  },
}
