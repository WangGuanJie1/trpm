const Setting = require("../models/Setting")
const createHttpError = require("http-errors")
const { stateFormat } = require("./dataFormat")
const {
  INITIALIZE_SETTING_ERROR,
  NOT_FOUND_SETTING_INFO,
} = require("../config/statusCode")

module.exports = {
  /**
   * 初始化账号风格配置
   * @method settingInitialize
   */
  settingInitialize: async (req, res, next) => {
    // 这里无需针对创建人和修改人是由系统默认
    Setting.create({ _teacherId: req.teacherInfo._id }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.settingInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            INITIALIZE_SETTING_ERROR.code,
            INITIALIZE_SETTING_ERROR.message
          )
        )
      }
    })
  },
  /**
   * 获取所有账号风格配置信息
   * @method settingFindAll
   */
  settingFindAll: async (req, res, next) => {
    Setting.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.allSettingInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_SETTING_INFO.code,
            NOT_FOUND_SETTING_INFO.message
          )
        )
      }
    })
  },
  /**
   * 根据教师编号查找账号风格配置信息
   * @method settingFindByTeacherId
   */
  settingFindByTeacherId: async (req, res, next) => {
    const teacherId = req.query.teacherId
      ? req.query.teacherId
      : req.teacherInfo._id
    Setting.findOne({ _teacherId: teacherId }, (err, doc) => {
      if (err) {
        console.log(err)
        return
      }
      if (doc) {
        req.settingInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_SETTING_INFO_BY_TEACHERID.code,
            NOT_FOUND_SETTING_INFO_BY_TEACHERID.message
          )
        )
      }
    })
  },
}
