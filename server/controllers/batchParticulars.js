const BatchParticulars = require('../models/BatchParticulars')
const createHttpError = require('http-errors')
const { stateFormat } = require('./dataFormat')
const {
  NOT_FOUND_BATCH_PARTICULARS_INFO,
  INITIALIZE_BATCH_PARTICULARS_ERROR,
} = require('../config/statusCode')

module.exports = {
  /**
   * 获取所有批次详情信息
   * @method batchParticularsFindAll
   */
  batchParticularsFindAll: async (req, res, next) => {
    BatchParticulars.aggregate(
      [
        {
          $lookup: {
            from: 'dictionary_project_batch',
            localField: '_projectBatchId',
            foreignField: '_id',
            as: 'dictionary_project_batch',
          },
        },
      ],
      (err, doc) => {
        if (err) {
          console.log(err)
          next(createHttpError(404))
        }
        if (doc.length !== 0) {
          const batchParticularsInfo = doc.map((item) => {
            const projectBatchName =
              item.dictionary_project_batch[0].projectBatchName
            item.projectBatchName = projectBatchName
            delete item.__v
            delete item.dictionary_project_batch
            return item
          })
          req.batchParticularsInfo = batchParticularsInfo
          next()
        } else {
          res.json(
            stateFormat(
              NOT_FOUND_BATCH_PARTICULARS_INFO.code,
              NOT_FOUND_BATCH_PARTICULARS_INFO.message
            )
          )
        }
      }
    )
  },
  /**
   * 初始化批次详情信息
   * @method batchParticularsInitialize
   */
  batchParticularsInitialize: async (req, res, next) => {
    req.query._projectBatchId = req.query._projectBatchId
      ? req.query._projectBatchId
      : req.dictionaryProjectBatchInfo._id
    BatchParticulars.create(req.query, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.batchParticularsInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            INITIALIZE_BATCH_PARTICULARS_ERROR.code,
            INITIALIZE_BATCH_PARTICULARS_ERROR.message
          )
        )
      }
    })
  },
}
