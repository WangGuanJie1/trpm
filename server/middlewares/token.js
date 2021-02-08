const createHttpError = require("http-errors")
const JWT = require("jsonwebtoken")
const keys = require("../config/keys")
const { stateFormat } = require("../controllers/dataFormat")
const {
  HTTP_HEADER_NOT_FOUND_TOKEN_INFO,
  TOKEN_OTHER_ERROR,
  TOKEN_EXPIRED,
} = require("../config/statusCode")

module.exports = {
  /**
   * 创建token
   * @method creatToken
   */
  creatToken: async (req, res, next) => {
    let { _teacherId } = req.route.methods.post ? req.body : req.query
    JWT.sign(
      { _teacherId: _teacherId },
      keys.secret,
      { expiresIn: keys.expiresIn },
      (err, token) => {
        if (err) {
          console.log(err)
          next(createHttpError(404))
        }
        req.token = token
        next()
      }
    )
  },
  /**
   * 解析并验证token
   * @method verifyToken
   */
  verifyToken: async (req, res, next) => {
    if (req.headers.hasOwnProperty("authorization")) {
      let token = req.headers["authorization"]
      token = token.replace("Bearer ", "") // 'Bearer ' 与expressJWT有关
      if (!token) {
        res.json(
          stateFormat(
            HTTP_HEADER_NOT_FOUND_TOKEN_INFO.code,
            HTTP_HEADER_NOT_FOUND_TOKEN_INFO.message
          )
        )
      }
      JWT.verify(token, keys.secret, (err, decoded) => {
        if (err) {
          console.log(err)
          err.name === "TokenExpiredError"
            ? res.json(stateFormat(TOKEN_EXPIRED.code, TOKEN_EXPIRED.message))
            : res.json(
                stateFormat(TOKEN_OTHER_ERROR.code, TOKEN_OTHER_ERROR.message)
              )
        }
        req.tokenUser = decoded._teacherId
        next()
      })
    }
  },
}
