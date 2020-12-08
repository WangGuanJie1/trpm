const Project = require('../models/Project')
const createHttpError = require('http-errors')
const { stateFormat } = require('./dataFormat')
const {
  NOT_FOUND_PROJECT_INFO,
  INITIALIZE_PROJECT_ERROR,
} = require('../config/statusCode')

module.exports = {
  /**
   * 获取所有项目信息
   * @method projectFindAll
   */
  projectFindAll: async (req, res, next) => {
    Project.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.allProjectInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_PROJECT_INFO.code,
            NOT_FOUND_PROJECT_INFO.message
          )
        )
      }
    })
  },
  /**
   * 初始化项目
   * @method projectInitialize
   */
  projectInitialize: async (req, res, next) => {
    const { _projectBatchId } =
      JSON.stringify(req.query) !== '{}' ? req.query : req.body
    Project.create({ _projectBatchId: _projectBatchId }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.projectInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            INITIALIZE_PROJECT_ERROR.code,
            INITIALIZE_PROJECT_ERROR.message
          )
        )
      }
    })
  },
}
