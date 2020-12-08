const Specialist = require('../models/Specialist')
const createHttpError = require('http-errors')
const { stateFormat } = require('./dataFormat')
const { NOT_FOUND_SPECIALIST_INFO } = require('../config/statusCode')

module.exports = {
  /**
   * 获取所有专家信息库信息
   * @method specialistFindAll
   */
  specialistFindAll: async (req, res, next) => {
    Specialist.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        next(createHttpError(404))
      }
      if (doc.length !== 0) {
        req.allSpecialistInfo = doc
        next()
      } else {
        res.json(
          stateFormat(
            NOT_FOUND_SPECIALIST_INFO.code,
            NOT_FOUND_SPECIALIST_INFO.message
          )
        )
      }
    })
  },
}
