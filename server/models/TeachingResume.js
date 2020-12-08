/**
 * 主要教学工作简历
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const TeachingResumeSchema = new Schema(
  {
    // 项目编号（数据来自project._id）
    _projectId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    // 授课时间（数据来自dictionary_term.termName）
    termName: {
      type: String,
    },
    // 课程名称（输入）
    courseName: {
      type: String,
    },
    // 授课对象（输入）
    teachingObject: {
      type: String,
    },
    // 学时（输入）
    period: {
      type: Number,
    },
    // 部门名称（数据来自不确定）
    department: {
      type: String,
    },
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updatedAt' } }
)

let TeachingResume = model(
  'teaching_resume',
  TeachingResumeSchema,
  'teaching_resume'
)

module.exports = TeachingResume
