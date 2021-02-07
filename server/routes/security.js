const express = require("express")
const { creatToken } = require("../middlewares/token")
const {
  securityFindByTeacherId,
  securityComparePassword,
  updatePassword,
} = require("../controllers/security")
const { entityFormat } = require("../controllers/dataFormat")
const { HTTP_SUCCEED } = require("../config/statusCode")

const router = express.Router()
// 更新密码 TODO: 该接口怀疑是测试API时候使用，需要重写
router.post(
  "/upd/password",
  creatToken,
  securityFindByTeacherId,
  securityComparePassword,
  updatePassword
)

// 根据教师编号查询教师安全信息
router.post("/find/by-teacherid", securityFindByTeacherId, (res, err) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.securityInfo)
  )
})

module.exports = router
