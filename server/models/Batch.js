/**
 * 批次信息
 *
 */
const mongoose = require("./connect")

const Schema = mongoose.Schema
const model = mongoose.model

const BatchSchema = new Schema(
  {
    level: {
      type: String,
      enum: ["simple", "major"],
      require: true,
    },
    // 项目申报起始时间（yyyy-MM-dd hh:mm:ss）
    deInTi: {
      type: Date,
      default: null,
    },
    // 项目申报结束时间（yyyy-MM-dd hh:mm:ss）
    deClTi: {
      type: Date,
      default: null,
    },
    // 学院评审开始时间（yyyy-MM-dd hh:mm:ss）
    coAuInTi: {
      type: Date,
      default: null,
    },
    // 学院评审结束时间（yyyy-MM-dd hh:mm:ss）
    coAuClTi: {
      type: Date,
      default: null,
    },
    // 学校评审开始时间（yyyy-MM-dd hh:mm:ss）
    scAuInTi: {
      type: Date,
      default: null,
    },
    // 学校评审结束时间（yyyy-MM-dd hh:mm:ss）
    scAuClTi: {
      type: Date,
      default: null,
    },
    // 允许主持人主持项目的最大数量
    hoMaNuOfHoPr: {
      type: Number,
    },
    // 允许主持人参与项目的最大数量
    hoMaNuOfPaPr: {
      type: Number,
    },
    // 允许参与人主持项目的最大数量
    paMaNuOfHoPr: {
      type: Number,
    },
    // 允许参与人参加项目的最大数量
    paMaNuOfPaPr: {
      type: Number,
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

let BatchInfo = model("batch", BatchSchema, "batch")

module.exports = BatchInfo
