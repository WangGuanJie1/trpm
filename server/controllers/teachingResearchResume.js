const teacherResearchResume = require('../models/teachingResearchResume')
const createHttpError = require('http-errors')
const { stateFormat } = require('./dataFormat')
const {
  NOT_FOUND_TEACHING_RESEARCH_RESUME_INFO,
  CREATE_TEACHING_RESEARCH_RESUME_ERROR,
} = require('../config/statusCode')

module.exports = {
  /**
   * 获取所有主要科学研究和教学研究工作简历信息
   * @method teacherResearchResumeFindAll
   */
  teachingResearchResumeFindAll: async (req, res, next) => {
    teacherResearchResume.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.allTeachingResearchResumeFindAllInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_TEACHING_RESEARCH_RESUME_INFO.code,
            NOT_FOUND_TEACHING_RESEARCH_RESUME_INFO.message
          )
        )
      }
    })
  },
}
