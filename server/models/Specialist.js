/**
 * 专家信息库
 *
 * 1.用于细分专家身份，这里将专家身份细分为两类，既校级评审专家（编号10001）、部门评审专家（编号10002）
 * 2.身份识别为校级评审专家时（roleId=10001），则不允许管理部门，部门编号（_departmentId）应为null
 * 3.身份识别为部门评审专家时（roleId=10002），必须填写部门编号（_departmentId），并且可以管理多个部门
 */
const mongoose = require("./connect")

const Schema = mongoose.Schema
const model = mongoose.model

const SpecialistSchema = new Schema(
  {
    // 教师编号（数据来自teacher._id）
    _teacherId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    // 身份编号（编号10001：校级评审专家，编号10002：部门评审专家）
    roleId: {
      type: Number,
      required: true,
    },
    // 部门编号（若roleId为10001，值为null，反之需要填写部门编号。数据来自dictionary_department._id）
    _departmentId: {
      type: [Number],
      default: [],
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

let Specialist = model("specialist", SpecialistSchema, "specialist")

module.exports = Specialist
