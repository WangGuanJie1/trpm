const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  dictionaryTermFindAll,
  dictionaryTermCreate,
} = require('../controllers/dictionaryTerm')

const router = express.Router()

router.get('/all', dictionaryTermFindAll, (req, res) => {
  res.json(
    listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.dictionaryTermInfo)
  )
})
router.get('/create', dictionaryTermCreate, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      dictionaryTermInfo: req.dictionaryTermInfo,
    })
  )
})

module.exports = router
