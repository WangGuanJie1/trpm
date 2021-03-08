const express = require("express")
const router = express.Router()
const {
  teacherCreate,
  teacherFindByJobCode,
  teacherFindAll,
  teacherFindByTeacherId,
  teacherMoreCreate,
} = require("../controllers/teacher")
const {
  securityComparePassword,
  securityFindByTeacherId,
  securityInitialize,
  checkSecurityIsDefault,
  securityInitializeMore,
} = require("../controllers/security")
const {
  roleInitialize,
  roleFindByTeacherId,
  roleInitializeMore,
} = require("../controllers/role")
const {
  settingInitialize,
  settingFindByTeacherId,
  settingInitializeMore,
} = require("../controllers/setting")
const { creatToken } = require("../middlewares/token")
const {
  entityFormat,
  stateFormat,
  listFormat,
} = require("../controllers/dataFormat")
const { HTTP_SUCCEED } = require("../config/statusCode")

router.post(
  "/create",
  teacherCreate,
  roleInitialize,
  settingInitialize,
  securityInitialize,
  (req, res) => {
    res.json(stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message))
  }
)

router.post(
  "/createmore",
  teacherMoreCreate,
  roleInitializeMore,
  settingInitializeMore,
  securityInitializeMore,
  (req, res) => {
    res.json(stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message))
  }
)

router.get("/all", teacherFindAll, (req, res) => {
  res.json(listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.teacherInfo))
})

router.get("/find/by-jobcode", teacherFindByJobCode, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      teacherInfo: req.teacherInfo,
    })
  )
})

router.get("/find/by-teachereid", teacherFindByTeacherId, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      teacherInfo: req.teacherInfo,
    })
  )
})

router.post(
  "/login",
  teacherFindByJobCode,
  securityFindByTeacherId,
  securityComparePassword,
  checkSecurityIsDefault,
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
          defaultSecurity: req.defaultSecurity,
        },
        token: req.token,
      })
    )
  }
)

module.exports = router
