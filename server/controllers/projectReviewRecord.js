const ProjectReviewRecord = require('../models/ProjectReviewRecord')
const createHttpError = require('http-errors')
const { stateFormat } = require('./dataFormat')
const { NOT_FOUND_DICTIONARY_ROLE_INFO } = require('../config/statusCode')

module.exports = {
  /**
   * 获取所有项目评审记录信息
   * @method projectReviewRecordFindAll
   */
  projectReviewRecordFindAll: async (req, res, next) => {
    ProjectReviewRecord.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.allProjectReviewRecordInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_PROJECT_REVIEW_RECORD_INFO.code,
            NOT_FOUND_PROJECT_REVIEW_RECORD_INFO.message
          )
        )
      }
    })
  },
}
