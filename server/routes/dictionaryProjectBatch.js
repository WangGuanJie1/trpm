const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  dictionaryProjectBatchFindAll,
  dictionaryProjectBatchCreate,
} = require('../controllers/dictionaryProjectBatch')
const {
  batchParticularsInitialize,
} = require('../controllers/batchParticulars')

const router = express.Router()

router.get('/all', dictionaryProjectBatchFindAll, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.dictionaryProjectBatchInfo
    )
  )
})
router.get(
  '/create',
  dictionaryProjectBatchCreate,
  batchParticularsInitialize,
  (req, res) => {
    res.json(
      entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
        dictionaryProjectBatchInfo: req.dictionaryProjectBatchInfo,
      })
    )
  }
)

module.exports = router
