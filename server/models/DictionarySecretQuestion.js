/**
 * 字典：密保问题
 *
 */
const mongoose = require("./connect")

const Schema = mongoose.Schema
const model = mongoose.model

const DictionarySecretQuestionSchema = new Schema(
  {
    // 问题
    question: {
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

let DictionarySecretQuestion = model(
  "dictionary_secret_question",
  DictionarySecretQuestionSchema,
  "dictionary_secret_question"
)

module.exports = DictionarySecretQuestion
