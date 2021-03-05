const express = require('express')
const { listFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const { roleFindAll, roleFindByTeacherId } = require('../controllers/role')

const router = express.Router()

router.get('/all', roleFindAll, (req, res) => {
  res.json(listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.allRoleInfo))
})
router.get('/find/by-teacherid', roleFindByTeacherId, (req, res) => {
  res.json(listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.roleInfo))
})

module.exports = router
