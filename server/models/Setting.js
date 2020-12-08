/**
 * 账号风格配置信息
 *
 * 用于管理登录账号的界面风格及其它相关配置信息
 */
const mongoose = require('./connect')

const Schema = mongoose.Schema
const model = mongoose.model

const SettingSchema = new Schema(
  {
    // 教师编号（数据来自teacher._id）
    _teacherId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'teacher',
    },
    // 导航主题配色
    navTheme: {
      type: String,
      default: 'dark',
      enum: ['dark', 'light'],
      set: (val) => {
        return val.toLowerCase()
      },
    },
  },
  { timestamps: { createdAt: 'createAt', updatedAt: 'updatedAt' } }
)

let Setting = model('setting', SettingSchema, 'setting')

module.exports = Setting
