const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  batchParticularsFindAll,
  batchParticularsInitialize,
} = require('../controllers/batchParticulars')

const router = express.Router()
router.get('/init', batchParticularsInitialize, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      batchParticularsInfo: req.batchParticularsInfo,
    })
  )
})

router.get('/all', batchParticularsFindAll, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.batchParticularsInfo
    )
  )
})

module.exports = router
