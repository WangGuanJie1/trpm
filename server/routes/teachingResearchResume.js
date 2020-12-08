const express = require('express')
const { listFormat } = require('../controllers/dataFormat')
const { HTTP_SUCCEED } = require('../config/statusCode')
const {
  teachingResearchResumeFindAll,
} = require('../controllers/teachingResearchResume')

const router = express.Router()

router.get('/all', teachingResearchResumeFindAll, (req, res) => {
  res.json(
    listFormat(
      HTTP_SUCCEED.code,
      HTTP_SUCCEED.message,
      req.allTeachingResearchResumeFindAllInfo
    )
  )
})

module.exports = router
