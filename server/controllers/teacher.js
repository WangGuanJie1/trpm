const createHttpError = require("http-errors")
const Teacher = require("../models/Teacher")
const { stateFormat } = require("./dataFormat")
const {
  CREATE_TEACHER_ERROR,
  NOT_FOUND_JOBCODE,
  NOT_FOUND_TEACHER_INFO,
  NOT_FOUND_TEACHERID,
} = require("../config/statusCode")

module.exports = {
  /**
   * 创建教师
   * @method teacherCreate
   */
  teacherCreate: async (req, res, next) => {
    req = fillAllMust(req)
    const payload = JSON.stringify(req.query) !== "{}" ? req.query : req.body
    Teacher.create(payload, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.teacherInfo = doc
        next()
      } else {
        res.json(
          stateFormat(CREATE_TEACHER_ERROR.code, CREATE_TEACHER_ERROR.message)
        )
      }
    })
  },
  /**
   * 获取所有教师信息
   * @method teacherFindAll
   */
  teacherFindAll: async (req, res, next) => {
    Teacher.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.teacherInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_TEACHER_INFO.code,
            NOT_FOUND_TEACHER_INFO.message
          )
        )
      }
    })
  },
  /**
   * 根据jobCode查询单条数据
   * @method teacherFindByJobCode
   */
  teacherFindByJobCode: async (req, res, next) => {
    let { jobCode } = req.body.jobCode ? req.body : req.query
    Teacher.findOne({ jobCode: jobCode }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.body._teacherId = doc._id // TODO：待查明，这里为什么使用req.body来存储_teacherId
        req.teacherInfo = doc
        next()
      } else {
        res.json(stateFormat(NOT_FOUND_JOBCODE.code, NOT_FOUND_JOBCODE.message))
      }
    })
  },
  /**
   * 根据教师编号查询单条数据
   * @method teacherFindByTeacherId
   */
  teacherFindByTeacherId: async (req, res, next) => {
    let { _teacherId } = req.body._teacherId ? req.body : req.query
    Teacher.findOne({ _id: _teacherId }, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc) {
        req.teacherInfo = doc
        next()
      } else {
        res.json(
          stateFormat(NOT_FOUND_TEACHERID.code, NOT_FOUND_TEACHERID.message)
        )
      }
    })
  },
}
