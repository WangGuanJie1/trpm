const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  dictionaryDepartmentFindAll,
  dictionaryDepartmentCreate,
} = require('../controllers/dictionaryDepartment')
const { verifyToken } = require('../middlewares/token')

const router = express.Router()

router.get('/all', dictionaryDepartmentFindAll, verifyToken, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.dictionaryDepartmentInfo
    )
  )
})

router.get('/create', dictionaryDepartmentCreate, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      dictionaryDepartmentInfo: req.dictionaryDepartmentInfo,
    })
  )
})

module.exports = router
