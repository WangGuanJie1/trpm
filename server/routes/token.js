const express = require('express')
const { entityFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const { creatToken, verifyToken } = require('../middlewares/token')

const router = express.Router()
router.get('/creat', creatToken, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      token: req.token,
    })
  )
})
router.get('/verify', verifyToken, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      tokenUser: req.tokenUser,
    })
  )
})

module.exports = router
