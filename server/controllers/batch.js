const Batch = require("../models/Batch")
const createHttpError = require("http-errors")
const { stateFormat } = require("./dataFormat")
const {
  NOT_FOUND_BATCH_INFO,
  CREATE_BATCH_ERROR,
} = require("../config/statusCode")
const { fillAllMust } = require("../middlewares/fillMustRecord")

module.exports = {
  /**
   * 获取所有批次信息
   * @method batchFindAll
   */
  batchFindAll: async (req, res, next) => {
    Batch.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.batchInfo = doc
        next()
      } else {
        res.json(
          stateFormat(NOT_FOUND_BATCH_INFO.code, NOT_FOUND_BATCH_INFO.message)
        )
      }
    })
  },
  /**
   * 创建项目批次
   * @method createBatch
   */
  createBatch: async (req, res, next) => {
    req = fillAllMust(req)
    Batch.create(req.body, (err, doc) => {
      if (err) {
        console.log(err)
        next(createRenderer(404))
      }
      if (doc.length !== 0) {
        req.batchInfo = doc
        next()
      } else {
        res.json(
          stateFormat(CREATE_BATCH_ERROR.code, CREATE_BATCH_ERROR.message)
        )
      }
    })
  },
}
