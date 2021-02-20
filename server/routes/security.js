const express = require("express")
const { creatToken } = require("../middlewares/token")
const {
  securityFindByTeacherId,
  securityComparePassword,
  changePasswordVerifyType,
  initSecretQuestion,
  updatePassword,
  securityQuestionFindByTeacherId,
  securityCompareQuestion,
  securityCompareIdcard,
  securityCompareEmail,
} = require("../controllers/security")
const {
  entityFormat,
  listFormat,
  stateFormat,
} = require("../controllers/dataFormat")
const { HTTP_SUCCEED } = require("../config/statusCode")

const router = express.Router()
// 更新密码 TODO: 该接口怀疑是测试API时候使用，需要重写
router.post(
  "/update/password",
  creatToken,
  securityFindByTeacherId,
  securityComparePassword,
  updatePassword
)

// 慎用：根据教师编号查询教师安全信息,该接口缺乏安全性，需要进一步加强安全性验证
router.post("/find/by-teacherid", securityFindByTeacherId, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.securityInfo)
  )
})

router.post(
  "/init/secretquestion/by-teacherid",
  initSecretQuestion,
  (req, res) => {
    res.json(stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message))
  }
)

router.post(
  "/verifytype",
  securityFindByTeacherId,
  changePasswordVerifyType,
  (req, res) => {
    res.json(
      listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.verifyType)
    )
  }
)

router.post(
  "/find/question/by-teacherid",
  securityQuestionFindByTeacherId,
  (req, res) => {
    res.json(
      listFormat(
        HTTP_SUCCEED.code,
        HTTP_SUCCEED.message,
        req.securityQuestionInfo
      )
    )
  }
)

router.post(
  "/verify/password/by-teacherid",
  securityFindByTeacherId,
  securityComparePassword,
  (req, res) => {
    res.json(stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message))
  }
)

router.post(
  "/verify/question/by-teacherid",
  securityFindByTeacherId,
  securityCompareQuestion,
  (req, res) => {
    res.json(stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message))
  }
)

router.post(
  "/verify/idcard/by-teacherid",
  securityFindByTeacherId,
  securityCompareIdcard,
  (req, res) => {
    res.json(stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message))
  }
)

router.post(
  "/verify/email/by-teacherid",
  securityFindByTeacherId,
  securityCompareEmail,
  (req, res) => {
    res.json(stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message))
  }
)

module.exports = router
