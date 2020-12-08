/**
 * 字典：项目批次
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const DictionaryProjectBatchSchema = new Schema({
  // 项目批次名称
  projectBatchName: {
    type: String,
    required: true,
  },
})

let DictionaryProjectBatch = model(
  'dictionary_project_batch',
  DictionaryProjectBatchSchema,
  'dictionary_project_batch'
)

module.exports = DictionaryProjectBatch
