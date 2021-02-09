/**
 * 字典：身份
 *
 */
const mongoose = require("./connect")

const Schema = mongoose.Schema
const model = mongoose.model

const DictionaryRoleSchema = new Schema(
  {
    // 身份名称
    roleName: {
      type: String,
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

let DictionaryRole = model(
  "dictionary_role",
  DictionaryRoleSchema,
  "dictionary_role"
)

module.exports = DictionaryRole
