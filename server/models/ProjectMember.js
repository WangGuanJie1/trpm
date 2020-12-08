/**
 * 项目组主要成员
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const ProjectMemberSchema = new Schema(
  {
    // 项目编号（数据来自project._id）
    _projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'project',
    },
    // 成员编号（外校：null，本校：数据来自teacher.jobCode）
    jobCode: {
      type: String,
      required: true,
      default: '',
    },
    // 成员姓名（外校：输入，本校：数据来自teacher.name）
    name: {
      type: String,
      required: true,
      default: '',
    },
    // 出生年月（外校：输入，本校：数据来自teacher.birthday）
    birthday: {
      type: String,
      default: '',
    },
    // 专业技术职称（外校：输入，本校：数据来自teacher.cuEmPrTi）
    cuEmPrTi: {
      type: String,
      default: '',
    },
    // 职务（外校：输入，本校：数据来自teacher.specificPositions）
    specificPositions: {
      type: String,
      default: '',
    },
    // 所在部门（外校：输入，本校：数据来自teacher.department）
    department: {
      type: String,
      default: '',
    },
    // 主要教研领域（输入）
    researchArea: {
      type: String,
      default: '',
    },
    // 项目中的分工（输入）
    responsibility: {
      type: String,
      default: '',
    },
    // 人员排名（输入）
    memberRank: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updatedAt' } }
)

let ProjectMember = model(
  'project_member',
  ProjectMemberSchema,
  'project_member'
)

module.exports = ProjectMember
