/**
 * 项目评审记录信息
 *
 */
const mongoose = require("./connect")

const Schema = mongoose.Schema
const model = mongoose.model

const ProjectReviewRecordSchema = new Schema(
  {
    // 项目编号（数据来自project._id）
    _projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "project",
    },
    // 评审阶段编号（以项目评审时所在阶段为准,数据来自project.researchStatus）
    _projectStatusId: {
      type: Number,
      required: true,
    },
    // 专家编号（数据来自specialist._id）
    _specialistId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "specialist",
    },
    // 评审时的身份（数据来自specialist.roleId）
    roleId: {
      type: Number,
      required: true,
    },
    // 评审内容（输入）
    content: {
      type: String,
      required: true,
    },
    // 评审时间（以提交时间为准）
    reviewTime: {
      type: Date,
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

let ProjectReviewRecord = model(
  "project_review_record",
  ProjectReviewRecordSchema,
  "project_review_record"
)

module.exports = ProjectReviewRecord
