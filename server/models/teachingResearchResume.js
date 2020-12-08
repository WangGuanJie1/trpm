/**
 * 主要科学研究和教学研究工作简历
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const TeacherResearchResumeSchema = new Schema(
  {
    // 项目编号（数据来自project._id）
    _projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'project',
    },
    // 项目来源（输入）
    source: {
      type: String,
      default: '',
    },
    // 主要鉴定意见（输入）
    opinion: {
      type: String,
      default: '',
    },
    // 获奖情况（输入）
    awards: {
      type: String,
      default: '',
    },
    // 佐证材料（只允许上传.pdf）
    materials: {
      type: String,
      default: '',
    },
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updatedAt' } }
)

let TeacherResearchResume = model(
  'teacher_research_resume',
  TeacherResearchResumeSchema,
  'teacher_research_resume'
)

module.exports = TeacherResearchResume
