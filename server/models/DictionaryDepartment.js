/**
 * 字典：部门
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const DictionaryDepartmentSchema = new Schema({
  //部门名称
  departmentName: {
    type: String,
    required: true,
  },
})

let DictionaryDepartment = model(
  'dictionary_department',
  DictionaryDepartmentSchema,
  'dictionary_department'
)

module.exports = DictionaryDepartment
