const TeachingResume = require('../models/TeachingResume')
const createHttpError = require('http-errors')
const { stateFormat } = require('./dataFormat')
const { NOT_FOUND_TEACHING_RESUME_INFO } = require('../config/statusCode')

module.exports = {
  /**
   * 获取所有主要教学工作简历信息
   * @method dictionaryRoleFindAll
   */
  teachingResumeFindAll: async (req, res, next) => {
    TeachingResume.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.allTeachingResumeInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_TEACHING_RESUME_INFO.code,
            NOT_FOUND_TEACHING_RESUME_INFO.message
          )
        )
      }
    })
  },
}
