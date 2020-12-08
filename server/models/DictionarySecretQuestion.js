/**
 * 字典：密保问题
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const DictionarySecretQuestionSchema = new Schema({
  // 问题
  question: {
    type: String,
    required: true,
  },
})

let DictionarySecretQuestion = model(
  'dictionary_secret_question',
  DictionarySecretQuestionSchema,
  'dictionary_secret_question'
)

module.exports = DictionarySecretQuestion
