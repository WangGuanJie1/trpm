/**
 * 项目信息
 *
 */
const mongoose = require("./connect")

const Schema = mongoose.Schema
const model = mongoose.model

const ProjectSchema = new Schema(
  {
    // 项目名称（输入）
    projectName: {
      type: String,
      default: "",
    },
    // 项目类别编号（数据来自dictionary_research_category._id）
    _researchCategoryId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "dictionary_research_category",
    },
    // 项目所属批次编号（数据来自dictionary_project_batch._id）
    _projectBatchId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "dictionary_project_batch",
    },
    // 所在部门（数据来源未确定）
    department: {
      type: String,
      default: "",
    },
    // 办公电话（输入）
    landline: {
      type: String,
      default: "",
    },
    // 手机联系方式（输入）
    telphone: {
      type: Number,
      default: "",
    },
    // 邮箱（输入）
    email: {
      type: String,
      default: "",
    },
    // 填表日期（输入）
    dateWritten: {
      type: String,
      default: "",
    },
    // 立项时间（管理员输入）
    establishmentTime: {
      type: String,
      default: "",
    },
    // 研究期限（输入，以年为单位，如输入2代表2年）
    researchPeriod: {
      type: Number,
      default: "",
    },
    // 本项目的现状与存在问题分析（输入）
    cuSiAnPrAn: {
      type: String,
      default: "",
    },
    // 本项目的改革研究内容、主要特色和解决的关键问题（输入）
    reCoAnMaFeAnKeIs: {
      type: String,
      default: "",
    },
    // 本项目改革研究的预期成果（输入）
    expectedResults: {
      type: String,
      default: "",
    },
    // 本项目的改革研究的总体安排及进度（输入）
    arAnPr: {
      type: String,
      default: "",
    },
    // 已有的工作基础、条件及前期已有工作成果（输入）
    woExAnAc: {
      type: String,
      default: "",
    },
    // 所在单位教学工作委员会意见（管理员输入）
    teCoOp: {
      type: String,
      default: "",
    },
    // 专家组评审意见（管理员输入，仅限于重点项目）
    exGrReOp: {
      type: String,
      default: "",
    },
    // 学校审批意见（管理员输入）
    scApOp: {
      type: String,
      default: "",
    },
    // 项目研究状态（0：申请，1：在研，2：结题，3：撤销）
    researchStatus: {
      type: Number,
      default: 0,
    },
    // 项目审核状态（0：暂存，1：提交，2：通过，3：驳回）
    auditStatus: {
      type: Number,
      default: 0,
    },
    // 备注
    remark: {
      type: String,
      default: "",
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

let Project = model("project", ProjectSchema, "project")

module.exports = Project
