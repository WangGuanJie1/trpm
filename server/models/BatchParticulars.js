/**
 * 批次详情
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const BatchParticularsSchema = new Schema(
  {
    // 批次编号（数据来自dictionary_project_batch._id）
    _projectBatchId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    // 项目申报开始时间（yyyy-MM-dd hh:mm:ss）
    apInTi: {
      type: Date,
      default: null,
    },
    // 项目申报结束时间（yyyy-MM-dd hh:mm:ss）
    apClTi: {
      type: Date,
      default: null,
    },
    // 中期检查开始时间（yyyy-MM-dd hh:mm:ss）
    meTeInInTi: {
      type: Date,
      default: null,
    },
    // 中期检查结束时间（yyyy-MM-dd hh:mm:ss）
    meTeInClTi: {
      type: Date,
      default: null,
    },
    // 结题开始时间（yyyy-MM-dd hh:mm:ss）
    fiInTi: {
      type: Date,
      default: null,
    },
    // 结题结束时间（yyyy-MM-dd hh:mm:ss）
    fiClTi: {
      type: Date,
      default: null,
    },
    // 允许主持人主持项目的最大数量
    hoMaNuOfHoPr: {
      type: Number,
      required: true,
    },
    // 允许主持人参与项目的最大数量
    hoMaNuOfPaPr: {
      type: Number,
      required: true,
    },
    // 允许参与人主持项目的最大数量
    paMaNuOfHoPr: {
      type: Number,
      required: true,
    },
    // 允许参与人参加项目的最大数量
    paMaNuOfPaPr: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updatedAt' } }
)

let BatchInfo = model(
  'batch_particulars',
  BatchParticularsSchema,
  'batch_particulars'
)

module.exports = BatchInfo
