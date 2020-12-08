const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  dictionaryResearchCategoryFindAll,
  dictionaryResearchCategoryCreate,
} = require('../controllers/dictionaryResearchCategory')

const router = express.Router()
router.get('/create', dictionaryResearchCategoryCreate, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      dictionaryResearchCategoryInfo: req.dictionaryResearchCategoryInfo,
    })
  )
})
router.get('/all', dictionaryResearchCategoryFindAll, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.dictionaryResearchCategoryInfo
    )
  )
})

module.exports = router
