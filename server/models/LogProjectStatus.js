/**
 * 操作日志：项目状态
 * 1. 操作时间（operationTime）采用的是格林威治时间，比东八区少8小时，使用时需new Data（operationTime）
 * 2. 项目状态操作日志，当项目的状态发生改动时，需要及时记录日志信息。
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const LogProjectStatusSchema = new Schema(
  {
    // 项目编号（数据来自project._id）
    _projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'project',
    },
    // 项目状态（数据源自Project.auditStatus，0：暂存，1：提交，2：通过，3：驳回）
    auditStatus: {
      type: Number,
      required: true,
    },
    // 操作人工号（数据来自teacher.jobCode）
    jobCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createAt' } }
)

let DictionaryTerm = model(
  'log_project_status',
  LogProjectStatusSchema,
  'log_project_status'
)

module.exports = DictionaryTerm
