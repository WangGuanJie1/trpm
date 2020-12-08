const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  logProjectStatusFindAll,
  logProjectStatusCreate,
} = require('../controllers/logProjectStatus')

const router = express.Router()

router.get('/all', logProjectStatusFindAll, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.logProjectStatusInfo
    )
  )
})
router.get('/create', logProjectStatusCreate, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      logProjectStatusInfo: req.logProjectStatusInfo,
    })
  )
})

module.exports = router
