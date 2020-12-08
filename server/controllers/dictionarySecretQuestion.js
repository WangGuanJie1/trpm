const DictionarySecretQuestion = require('../models/DictionarySecretQuestion')
const createHttpError = require('http-errors')
const { stateFormat } = require('./dataFormat')
const {
  NOT_FOUND_DICTIONARY_SECRET_QUESTION_INFO,
  CREATE_DICTIONARY_SECRET_QUESTION_ERROR,
} = require('../config/statusCode')

module.exports = {
  /**
   * 获取所有密保问题字典信息
   * @method dictionarySecretQuestionFindAll
   */
  dictionarySecretQuestionFindAll: async (req, res, next) => {
    DictionarySecretQuestion.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.dictionarySecretQuestionInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_DICTIONARY_SECRET_QUESTION_INFO.code,
            NOT_FOUND_DICTIONARY_SECRET_QUESTION_INFO.message
          )
        )
      }
    })
  },
  /**
   * 创建密保问题
   * @method dictionarySecretQuestioCreate
   */
  dictionarySecretQuestioCreate: async (req, res, next) => {
    DictionarySecretQuestion.create(
      {
        question: req.query.question,
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          next(createHttpError(404))
        }
        if (doc) {
          req.dictionarySecretQuestionInfo = doc
          next()
        } else {
          res.json(
            stateFormat(
              CREATE_DICTIONARY_SECRET_QUESTION_ERROR.code,
              CREATE_DICTIONARY_SECRET_QUESTION_ERROR.message
            )
          )
        }
      }
    )
  },
}
