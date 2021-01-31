/**
 * 人员身份（权限）
 *
 * 用于登录验证，当识别身份为专家时，请到specialist中具体细分专家身份
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const RoleSchema = new Schema(
  {
    // 教师记录编号（数据来自teacher._id）
    _teacherId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    // 身份编号（数据来自dictionary_role._id）
    _roleId: {
      type: Schema.Types.ObjectId,
      default: '5fb637317f45e444b4474088',
      required: true,
    },
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updatedAt' } }
)

let Role = model('role', RoleSchema, 'role')

module.exports = Role
