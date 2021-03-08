/**
 * 账号安全信息
 *
 * 用于管理账号安全相关内容
 */
const mongoose = require("./connect")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema
const model = mongoose.model

const SecuritySchema = new Schema(
  {
    // 教师记录编号（数据来自teacher._id）
    _teacherId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "teacher",
    },
    // 密码
    password: {
      type: String,
      default: "111",
      set: (val) => {
        return bcrypt.hashSync(val, 10)
      },
      required: true,
    },
    // 安全邮箱
    secureEmail: {
      type: String,
      default: "111",
      set: (val) => {
        return bcrypt.hashSync(val, 10)
      },
    },
    // 密保问题
    secretQuestion: [
      {
        // 问题（数据来自dictionary_secret_question._id）
        _questionId: {
          type: Schema.Types.ObjectId,
          ref: "dictionary_secret_question",
        },
        // 答案
        answer: {
          type: String,
          set: (val) => {
            return bcrypt.hashSync(val, 10)
          },
        },
      },
    ],
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

let Security = model("security", SecuritySchema, "security")

module.exports = Security
