const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  dictionaryRoleFindAll,
  dictionaryRoleCreate,
} = require('../controllers/dictionaryRole')

const router = express.Router()

router.get('/all', dictionaryRoleFindAll, (req, res) => {
  res.json(
    listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.dictionaryRoleInfo)
  )
})
router.get('/create', dictionaryRoleCreate, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      dictionaryRoleInfo: req.dictionaryRoleInfo,
    })
  )
})

module.exports = router
