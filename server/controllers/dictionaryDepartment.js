const DictionaryDepartment = require("../models/DictionaryDepartment")
const createHttpError = require("http-errors")
const { stateFormat } = require("./dataFormat")
const {
  NOT_FOUND_DICTIONARY_DEPARTMENT_INFO,
  CREATE_DICTIONARY_DEPARTMENT_ERROR,
} = require("../config/statusCode")
const { fillAllMust } = require("../middlewares/fillMustRecord")

module.exports = {
  /**
   * 获取所有部门字典信息
   * @method dictionaryDepartmentFindAll
   */
  dictionaryDepartmentFindAll: async (req, res, next) => {
    DictionaryDepartment.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.dictionaryDepartmentInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_DICTIONARY_DEPARTMENT_INFO.code,
            NOT_FOUND_DICTIONARY_DEPARTMENT_INFO.message
          )
        )
      }
    })
  },
  /**
   * 创建部门
   * @method dictionaryDepartmentCreate
   */
  dictionaryDepartmentCreate: async (req, res, next) => {
    req = fillAllMust(req)
    DictionaryDepartment.create(req.query, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.dictionaryDepartmentInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            CREATE_DICTIONARY_DEPARTMENT_ERROR.code,
            CREATE_DICTIONARY_DEPARTMENT_ERROR.message
          )
        )
      }
    })
  },
}
