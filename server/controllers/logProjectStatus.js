const LogProjectStatus = require('../models/LogProjectStatus')
const createHttpError = require('http-errors')
const { stateFormat } = require('./dataFormat')
const {
  NOT_FOUND_LOG_PROJECT_STATUS_INFO,
  CREATE_LOG_PROJECT_STATUS_ERROR,
} = require('../config/statusCode')

module.exports = {
  /**
   * 获取所有项目状态日志信息
   * @method logProjectStatusFindAll
   */
  logProjectStatusFindAll: async (req, res, next) => {
    LogProjectStatus.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.logProjectStatusInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_LOG_PROJECT_STATUS_INFO.code,
            NOT_FOUND_LOG_PROJECT_STATUS_INFO.message
          )
        )
      }
    })
  },
  /**
   * 创建项目状态日志信息
   * @method logProjectStatusCreate
   */
  logProjectStatusCreate: async (req, res, next) => {
    LogProjectStatus.create(req.query, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.logProjectStatusInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            CREATE_LOG_PROJECT_STATUS_ERROR.code,
            CREATE_LOG_PROJECT_STATUS_ERROR.message
          )
        )
      }
    })
  },
}
