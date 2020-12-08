const express = require('express')
const { listFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const { specialistFindAll } = require('../controllers/specialist')

const router = express.Router()

router.get('/all', specialistFindAll, (req, res) => {
  res.json(
    listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.allSpecialistInfo)
  )
})

module.exports = router
