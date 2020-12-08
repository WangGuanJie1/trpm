/**
 * 字典：身份
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const DictionaryRoleSchema = new Schema({
  // 身份名称
  roleName: {
    type: String,
    required: true,
  },
})

let DictionaryRole = model(
  'dictionary_role',
  DictionaryRoleSchema,
  'dictionary_role'
)

module.exports = DictionaryRole
