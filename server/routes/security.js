const express = require('express')
const { creatToken } = require('../middlewares/token')
const {
  securityFindByTeacherId,
  securityComparePassword,
  updatePassword,
} = require('../controllers/security')

const router = express.Router()
// 更新密码
router.post(
  '/upd/password',
  creatToken,
  securityFindByTeacherId,
  securityComparePassword,
  updatePassword
)

module.exports = router
