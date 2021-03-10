/**
 * 字典：部门
 *
 */
const mongoose = require("./connect")

const Schema = mongoose.Schema
const model = mongoose.model

const DictionaryDepartmentSchema = new Schema(
  {
    //部门名称
    departmentName: {
      type: String,
      required: true,
    },
    departmentId: {
      type: Number,
      required: true,
    },
    // 创建人
    createdBy: {
      type: String,
      default: "administrator",
      required: true,
    },
    // 修改人
    updatedBy: {
      type: String,
      default: "administrator",
      required: true,
    },
  },
  // 创建、修改时间
  { timestamps: { createdAt: "createAt", updatedAt: "updateAt" } }
)

let DictionaryDepartment = model(
  "dictionary_department",
  DictionaryDepartmentSchema,
  "dictionary_department"
)

module.exports = DictionaryDepartment
