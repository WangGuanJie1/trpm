/**
 * 字典：学期
 *
 */
const mongoose = require("./connect")

const Schema = mongoose.Schema
const model = mongoose.model

const DictionaryTermSchema = new Schema(
  {
    // 学期名称
    termName: {
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

let DictionaryTerm = model(
  "dictionary_term",
  DictionaryTermSchema,
  "dictionary_term"
)

module.exports = DictionaryTerm
