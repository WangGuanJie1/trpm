const express = require("express")
const {
  listFormat,
  entityFormat,
  stateFormat,
} = require("../controllers/dataFormat")
const { HTTP_SUCCEED } = require("../config/statusCode")
const {
  dictionaryDepartmentFindAll,
  dictionaryDepartmentCreate,
  dictionaryDepartmentCreateMore,
} = require("../controllers/dictionaryDepartment")
const { verifyToken } = require("../middlewares/token")

const router = express.Router()

router.get("/all", dictionaryDepartmentFindAll, verifyToken, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.dictionaryDepartmentInfo
    )
  )
})

router.get("/create", dictionaryDepartmentCreate, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      dictionaryDepartmentInfo: req.dictionaryDepartmentInfo,
    })
  )
})

router.post("/createmore", dictionaryDepartmentCreateMore, (req, res) => {
  res.json(stateFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message))
})

module.exports = router
