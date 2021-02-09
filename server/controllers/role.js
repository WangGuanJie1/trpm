const mongoose = require("../models/connect")
const Role = require("../models/Role")
const createHttpError = require("http-errors")
const { stateFormat } = require("./dataFormat")
const {
  NOT_FOUND_ROLE_INFO,
  INITIALIZE_ROLE_ERROR,
  NOT_FOUND_ROLE_INFO_BY_TEACHERID,
} = require("../config/statusCode")
const { fillAllMust } = require("../middlewares/fillMustRecord")

module.exports = {
  /**
   * 获取所有人员身份信息
   * @method roleFindAll
   */
  roleFindAll: async (req, res, next) => {
    Role.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.allRoleInfo = doc
        next()
      } else {
        res.json(
          stateFormat(NOT_FOUND_ROLE_INFO.code, NOT_FOUND_ROLE_INFO.message)
        )
      }
    })
  },
  /**
   * 初始化身份
   * @method roleInitialize
   */
  roleInitialize: async (req, res, next) => {
    // 这里无需针对创建人和修改人是由系统默认
    Role.create({ _teacherId: req.teacherInfo._id }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.roleInfo = doc
        next()
      } else {
        res.json(
          stateFormat(INITIALIZE_ROLE_ERROR.code, INITIALIZE_ROLE_ERROR.message)
        )
      }
    })
  },
  /**
   * 根据教师编号查找身份信息
   * @method roleFindByTeacherId
   */
  roleFindByTeacherId: async (req, res, next) => {
    teacherId = req.query.teacherId ? req.query.teacherId : req.teacherInfo._id
    Role.aggregate(
      [
        {
          $lookup: {
            from: "dictionary_role",
            localField: "_roleId",
            foreignField: "_id",
            as: "dictionary_role",
          },
        },
        {
          $match: {
            _teacherId: mongoose.Types.ObjectId(teacherId),
          },
        },
        {
          $project: {
            _id: 1,
            _roleId: 1,
            _teacherId: 1,
            "dictionary_role.roleName": 1,
          },
        },
      ],
      (err, doc) => {
        if (err) {
          console.log(err)
          next(createHttpError(404))
        }
        if (doc) {
          const roleName = doc[0].dictionary_role[0].roleName
          req.roleInfo = doc[0]
          delete req.roleInfo.dictionary_role
          req.roleInfo.roleName = roleName
          next()
        } else {
          req.json(
            stateFormat(
              NOT_FOUND_ROLE_INFO_BY_TEACHERID.code,
              NOT_FOUND_ROLE_INFO_BY_TEACHERID.message
            )
          )
        }
      }
    )
  },
}
