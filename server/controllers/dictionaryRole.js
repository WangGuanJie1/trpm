const DictionaryRole = require("../models/DictionaryRole")
const createHttpError = require("http-errors")
const { stateFormat } = require("./dataFormat")
const {
  NOT_FOUND_DICTIONARY_ROLE_INFO,
  CREATE_DICTIONARY_ROLE_ERROR,
} = require("../config/statusCode")
const { fillAllMust } = require("../middlewares/fillMustRecord")

module.exports = {
  /**
   * 获取所有身份字典信息
   * @method dictionaryRoleFindAll
   */
  dictionaryRoleFindAll: async (req, res, next) => {
    DictionaryRole.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.dictionaryRoleInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_DICTIONARY_ROLE_INFO.code,
            NOT_FOUND_DICTIONARY_ROLE_INFO.message
          )
        )
      }
    })
  },
  /**
   * 创建身份
   * @method dictionaryRoleCreate
   */
  dictionaryRoleCreate: async (req, res, next) => {
    req = fillAllMust(req)
    DictionaryRole.create(req.query, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.dictionaryRoleInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            CREATE_DICTIONARY_ROLE_ERROR.code,
            CREATE_DICTIONARY_ROLE_ERROR.message
          )
        )
      }
    })
  },
}
