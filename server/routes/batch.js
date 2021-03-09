const express = require("express")
const { listFormat, entityFormat } = require("../controllers/dataFormat")
const { HTTP_SUCCEED } = require("../config/statusCode")
const { createBatch, batchFindAll } = require("../controllers/batch")

const router = express.Router()
router.post("/create", createBatch, (req, res) => {
  res.json(
    entityFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, {
      batchInfo: req.batchInfo,
    })
  )
})

router.get("/all", batchFindAll, (req, res) => {
  res.json(listFormat(HTTP_SUCCEED.code, HTTP_SUCCEED.message, req.batchInfo))
})

module.exports = router
