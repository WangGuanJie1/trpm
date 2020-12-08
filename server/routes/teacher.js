const express = require('express')
const router = express.Router()
const {
  teacherCreate,
  teacherFindByJobCode,
  teacherFindAll,
} = require('../controllers/teacher')
const {
  securityComparePassword,
  securityFindByTeacherId,
  securityInitialize,
} = require('../controllers/security')
const { roleInitialize, roleFindByTeacherId } = require('../controllers/role')
const {
  settingInitialize,
  settingFindByTeacherId,
} = require('../controllers/setting')
const { creatToken } = require('../middlewares/token')
const { entityFormat, stateFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')

router.post(
  '/create',
  teacherCreate,
  roleInitialize,
  securityInitialize,
  settingInitialize,
  (req, res) => {
    res.json(stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message))
  }
)
router.get('/all', teacherFindAll, (req, res) => {
  res.json(listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.teacherInfo))
})
router.get('/find/by-jobcode', teacherFindByJobCode, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      teacherInfo: req.teacherInfo,
    })
  )
})
router.post(
  '/login',
  teacherFindByJobCode,
  securityFindByTeacherId,
  securityComparePassword,
  roleFindByTeacherId,
  settingFindByTeacherId,
  creatToken,
  (req, res) => {
    res.json(
      entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
        currentTeacherInfo: {
          teacherInfo: req.teacherInfo,
          roleInfo: req.roleInfo,
          settingInfo: req.settingInfo,
        },
        token: req.token,
      })
    )
  }
)

module.exports = router
