const DictionaryResearchCategory = require("../models/DictionaryResearchCategory")
const createHttpError = require("http-errors")
const { stateFormat } = require("./dataFormat")
const {
  NOT_FOUND_DICTIONARY_RESEARCH_CATEGORY_INFO,
} = require("../config/statusCode")
const { fillAllMust } = require("../middlewares/fillMustRecord")

module.exports = {
  /**
   * 获取所有研究类别字典信息
   * @method dictionaryResearchCategoryFindAll
   */
  dictionaryResearchCategoryFindAll: async (req, res, next) => {
    DictionaryResearchCategory.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.dictionaryResearchCategoryInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_DICTIONARY_RESEARCH_CATEGORY_INFO.code,
            NOT_FOUND_DICTIONARY_RESEARCH_CATEGORY_INFO.message
          )
        )
      }
    })
  },
  /**
   * 创建研究类别
   * @method dictionaryResearchCategoryCreate
   */
  dictionaryResearchCategoryCreate: async (req, res, next) => {
    req = fillAllMust(req)
    DictionaryResearchCategory.create(req.query, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.dictionaryResearchCategoryInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            CREATE_DICTIONARY_RESEARCH_CATEGORY_ERROR.code,
            CREATE_DICTIONARY_RESEARCH_CATEGORY_ERROR.message
          )
        )
      }
    })
  },
}
