const express = require('express')
const {
  listFormat,
  stateFormat,
  entityFormat,
} = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  projectMemberFindAll,
  verifyApplyQualification,
  createProjectMember,
  projectMemberFindByProjectId,
  sameProjectVerifyRepeat,
  projectMemberFindByJobCode,
  teacherProjectInfoFindByJobcode,
} = require('../controllers/projectMember')

const router = express.Router()

router.get('/all', projectMemberFindAll, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.allProjectMemberInfo
    )
  )
})

router.get('/veApQu', verifyApplyQualification, (req, res) => {
  res.json(stateFormat(req.veApQu.status.code, req.veApQu.status.message))
})

router.get('/find/by-jobcode', projectMemberFindByJobCode, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      teacherProjectInfo: req.teacherProjectInfo,
    })
  )
})

router.post('/find/by-projectid', projectMemberFindByProjectId, (req, res) => {
  if ('projectMemberInfo' in req) {
    res.json(
      listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.projectMemberInfo)
    )
  } else {
    res.json(
      stateFormat(
        NOT_FOUND_PROJECT_MEMBER_INFO_BY_PROJECTID.code,
        NOT_FOUND_PROJECT_MEMBER_INFO_BY_PROJECTID.message
      )
    )
  }
})

router.post(
  '/create',
  projectMemberFindByProjectId,
  sameProjectVerifyRepeat,
  createProjectMember,
  (req, res) => {
    res.json(
      listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.projectMemberInfo)
    )
  }
)

router.get(
  '/find/allinfo/by-jobcode',
  teacherProjectInfoFindByJobcode,
  (req, res) => {
    res.json(
      entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
        ...req.teacherProjectInfo,
      })
    )
  }
)

module.exports = router
