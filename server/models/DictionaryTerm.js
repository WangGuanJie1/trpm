/**
 * 字典：学期
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const DictionaryTermSchema = new Schema({
  // 学期名称
  termName: {
    type: String,
    required: true,
  },
})

let DictionaryTerm = model(
  'dictionary_term',
  DictionaryTermSchema,
  'dictionary_term'
)

module.exports = DictionaryTerm
