const DictionaryProjectBatch = require("../models/DictionaryProjectBatch")
const createHttpError = require("http-errors")
const { stateFormat } = require("./dataFormat")
const {
  NOT_FOUND_DICTIONARY_PROJECT_BATCH_INFO,
  CREATE_DICTIONARY_PROJECT_BATCH_ERROR,
} = require("../config/statusCode")
const { fillAllMust } = require("../middlewares/fillMustRecord")

module.exports = {
  /**
   * 获取所有项目批次字典信息
   * @method dictionaryProjectBatchFindAll
   */
  dictionaryProjectBatchFindAll: async (req, res, next) => {
    DictionaryProjectBatch.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.dictionaryProjectBatchInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_DICTIONARY_PROJECT_BATCH_INFO.code,
            NOT_FOUND_DICTIONARY_PROJECT_BATCH_INFO.message
          )
        )
      }
    })
  },
  /**
   * 创建项目批次
   * @method dictionaryProjectBatchCreate
   */
  dictionaryProjectBatchCreate: async (req, res, next) => {
    req = fillAllMust(req)
    DictionaryProjectBatch.create(req.query, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.dictionaryProjectBatchInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            CREATE_DICTIONARY_PROJECT_BATCH_ERROR.code,
            CREATE_DICTIONARY_PROJECT_BATCH_ERROR.message
          )
        )
      }
    })
  },
}
