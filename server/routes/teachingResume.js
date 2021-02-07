const express = require('express')
const { listFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const { teachingResumeFindAll } = require('../controllers/teachingResume')

const router = express.Router()

router.get('/all', teachingResumeFindAll, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.allTeachingResumeInfo
    )
  )
})

module.exports = router
    