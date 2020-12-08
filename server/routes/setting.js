const express = require('express')
const { listFormat, entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  settingFindAll,
  settingFindByTeacherId,
} = require('../controllers/setting')

const router = express.Router()

router.get('/all', settingFindAll, (req, res) => {
  res.json(
    listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.allSettingInfo)
  )
})
router.get('/find/by-teacherid', settingFindByTeacherId, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      settingInfo: req.settingInfo,
    })
  )
})
module.exports = router
