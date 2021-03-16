const express = require("express")
const { listFormat, entityFormat } = require("../controllers/dataFormat")
const { HTTP_SUCCEED } = require("../config/statusCode")
const {
  projectFindAll,
  projectInitialize,
  projectUpdateById,
} = require("../controllers/project")
const {
  verifyApplyQualification,
  createProjectMember,
  projectMemberFindByJobCode,
  teacherProjectInfoFindByJobcode,
} = require("../controllers/projectMember")

const router = express.Router()

router.get("/all", projectFindAll, (req, res) => {
  res.json(
    listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.allProjectInfo)
  )
})
router.post(
  "/init",
  // verifyApplyQualification, // 旧，以前在初始化环节需要验证教师项目数量限制条件
  projectInitialize,
  // createProjectMember, // 旧
  // projectMemberFindByJobCode, // 旧
  (req, res) => {
    res.json(
      entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
        projectId: req.projectInfo._id,
        //   teacherProjectInfo: req.teacherProjectInfo, // 旧
      })
    )
  }
),
  router.post(
    "/update/by-id",
    projectUpdateById,
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
