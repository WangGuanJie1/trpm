const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  dictionarySecretQuestionFindAll,
  dictionarySecretQuestioCreate,
} = require('../controllers/dictionarySecretQuestion')

const router = express.Router()
router.get('/create', dictionarySecretQuestioCreate, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      dictionarySecretQuestionInfo: req.dictionarySecretQuestionInfo,
    })
  )
})
router.get('/all', dictionarySecretQuestionFindAll, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.dictionarySecretQuestionInfo
    )
  )
})

module.exports = router
