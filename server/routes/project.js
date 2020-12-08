const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const { projectFindAll, projectInitialize } = require('../controllers/project')
const {
  verifyApplyQualification,
  createProjectMember,
  projectMemberFindByJobCode,
} = require('../controllers/projectMember')

const router = express.Router()

router.get('/all', projectFindAll, (req, res) => {
  res.json(
    listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.allProjectInfo)
  )
})
router.post(
  '/init',
  verifyApplyQualification,
  projectInitialize,
  createProjectMember,
  projectMemberFindByJobCode,
  (req, res) => {
    res.json(
      entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
        projectId: req.projectInfo._id,
        teacherProjectInfo: req.teacherProjectInfo,
      })
    )
  }
)
module.exports = router
