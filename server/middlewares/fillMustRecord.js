/**
 * 用于对 createdBy 及 updatedBy 的处理
 */
module.exports = {
  /**
   * 添加创建人字段值
   * @param {Object} req 请求信息
   * @returns {Object} 修改后的请求信息
   */
  fillCreatedBy: (req) => {
    if (req.query.handler) req.query.createdBy = req.query.handler
    if (req.body.handler) req.body.createdBy = req.body.handler
    return req
  },

  /**
   * 添加修改人字段值（一般用于修改）
   * @param {Object} req 请求信息
   * @returns {Object} 修改后的请求信息
   */
  fillUpdatedBy: (req) => {
    if (req.query.handler) {
      req.query.updatedBy = req.query.handler
    } else {
      req.body.handler
        ? () => (req.body.updatedBy = req.body.handler)
        : "administrator"
    }
    return req
  },

  /**
   * 添加创建人和修改人字段值（一般用于初始化数据）
   * @param {Object} req 请求信息
   * @returns {Object} 修改后的请求信息
   */
  fillAllMust: (req) => {
    req.query.handler
      ? () => {
          req.query.createdBy = req.query.handler
          req.query.updatedBy = req.query.handler
        }
      : false
    req.body.handler
      ? () => {
          req.body.createdBy = req.body.handler
          req.body.updatedBy = req.body.handler
        }
      : false
    return req
  },
}
