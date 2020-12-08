const express = require('express')
const { listFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  projectReviewRecordFindAll,
} = require('../controllers/projectReviewRecord')

const router = express.Router()

router.get('/all', projectReviewRecordFindAll, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.allProjectReviewRecordInfo
    )
  )
})

module.exports = router
