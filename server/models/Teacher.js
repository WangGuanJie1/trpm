/**
 * 教师信息
 *
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const TeacherSchema = new Schema(
  {
    // 聘用情况
    employment: {
      type: String,
    },
    // 部门
    department: {
      type: String,
    },
    // 系部
    office: {
      type: String,
      default: '',
    },
    // 工号
    jobCode: {
      type: String,
    },
    // 姓名
    name: {
      type: String,
    },
    // 性别
    gender: {
      type: String,
    },
    // 民族
    nation: {
      type: String,
    },
    // 生日
    birthday: {
      type: String,
    },
    // 身份证号
    idNumber: {
      type: String,
    },
    // 岗位分类

    jobClassification: {
      type: String,
    },
    // 管理级
    managementLevel: {
      type: String,
      default: '',
    },
    // 专业级
    professionalLevel: {
      type: String,
      default: '',
    },
    // 工勤级
    serviceLevel: {
      type: Number,
      default: '',
    },
    // 专级聘任时间（数据类型感觉不对）
    apTiOfPrLe: {
      type: String,
    },
    // 具体岗位
    specificPositions: {
      type: String,
      default: '',
    },
    // 岗位系列
    jobSeries: {
      type: String,
      default: '',
    },
    // 专技分类
    technicalClassification: {
      type: String,
      default: '',
    },
    // 政治面貌
    politicalOutlook: {
      type: String,
      default: '',
    },
    // 职称聘任级别
    prTiApLe: {
      type: String,
      default: '',
    },
    // 现聘聘任职称
    cuEmPrTi: {
      type: String,
      default: '无',
    },
    // 聘任时间（数据类型感觉不对）
    appointmentTime: {
      type: String,
      default: '',
    },
    // 最后学位
    finalDegree: {
      type: String,
      default: '',
    },
    // 最后学历
    finalEducation: {
      type: String,
      default: '本科',
    },
    // 最后院校
    finalInstitutions: {
      type: String,
      default: '',
    },
    // 最后专业
    lastMajor: {
      type: String,
      default: '',
    },
    // 最后时间
    lastTime: {
      type: String,
      default: '',
    },
    // 所学专业分类
    majorClassification: {
      type: String,
      default: '',
    },
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updatedAt' } }
)

let Teacher = model('teacher', TeacherSchema, 'teacher')

module.exports = Teacher
