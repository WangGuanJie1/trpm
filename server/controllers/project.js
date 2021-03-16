const Project = require("../models/Project")
const createHttpError = require("http-errors")
const { stateFormat } = require("./dataFormat")
const {
  NOT_FOUND_PROJECT_INFO,
  INITIALIZE_PROJECT_ERROR,
  PROJECT_UPDATE_BY_ID_ERROR,
} = require("../config/statusCode")
const { fillUpdatedBy, fillAllMust } = require("../middlewares/fillMustRecord")

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
    req = fillAllMust(req)
    const { _batchId, createdBy, updatedBy } =
      JSON.stringify(req.query) !== "{}" ? req.query : req.body
    Project.create({ _batchId, createdBy, updatedBy }, (err, doc) => {
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
  /**
   * 根据项目id更新项目数据
   * @method projectUpdateById
   */
  projectUpdateById: async (req, res, next) => {
    req = fillUpdatedBy(req)
    const payload = JSON.stringify(req.query) !== "{}" ? req.query : req.body
    // 由于前端未对负载信息做限制，所以这里需要防恶意篡改项目批次信息
    "_researchCategoryId" in payload ? delete payload._researchCategoryId : null
    Project.findOneAndUpdate(
      { _id: payload.projectId },
      payload,
      { new: true },
      (err, doc) => {
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
              PROJECT_UPDATE_BY_ID_ERROR.code,
              PROJECT_UPDATE_BY_ID_ERROR.message
            )
          )
        }
      }
    )
  },
}
