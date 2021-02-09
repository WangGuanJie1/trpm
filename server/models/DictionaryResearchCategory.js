/**
 * 字典：研究类别
 *
 */
const mongoose = require("./connect")

const Schema = mongoose.Schema
const model = mongoose.model

const DictionaryResearchCategorySchema = new Schema(
  {
    // 研究类别名称
    categoryName: {
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

let DictionaryResearchCategory = model(
  "dictionary_research_category",
  DictionaryResearchCategorySchema,
  "dictionary_research_category"
)

module.exports = DictionaryResearchCategory
