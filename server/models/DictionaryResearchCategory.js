/**
 * 字典：研究类别
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const DictionaryResearchCategorySchema = new Schema({
  // 研究类别名称
  categoryName: {
    type: String,
    required: true,
  },
})

let DictionaryResearchCategory = model(
  'dictionary_research_category',
  DictionaryResearchCategorySchema,
  'dictionary_research_category'
)

module.exports = DictionaryResearchCategory
