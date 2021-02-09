const DictionaryTerm = require("../models/DictionaryTerm")
const createHttpError = require("http-errors")
const { stateFormat } = require("./dataFormat")
const {
  NOT_FOUND_DICTIONARY_TERM_INFO,
  CREATE_DICTIONARY_TERM_ERROR,
} = require("../config/statusCode")
const { fillAllMust } = require("../middlewares/fillMustRecord")

module.exports = {
  /**
   * 获取所有学期字典信息
   * @method dictionaryTermFindAll
   */
  dictionaryTermFindAll: async (req, res, next) => {
    DictionaryTerm.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.dictionaryTermInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_DICTIONARY_TERM_INFO.code,
            NOT_FOUND_DICTIONARY_TERM_INFO.message
          )
        )
      }
    })
  },
  /**
   * 创建学期字典信息
   * @method dictionaryTermCreate
   */
  dictionaryTermCreate: async (req, res, next) => {
    req = fillAllMust(req)
    DictionaryTerm.create(req.query, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.dictionaryTermInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            CREATE_DICTIONARY_TERM_ERROR.code,
            CREATE_DICTIONARY_TERM_ERROR.message
          )
        )
      }
    })
  },
}
