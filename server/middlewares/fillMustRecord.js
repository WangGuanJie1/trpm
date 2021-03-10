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
    const isDone = false // 判断是否在GET/POST请求中找到 handle
    // 如果是GET请求就重新赋值到req.query中
    const isGet = () => {
      req.query.createdBy = req.query.handler
      isDone = 1
    }
    // 如果是POST请求就重新赋值到req.body中
    const isPost = () => {
      req.body.createdBy = req.body.handler
      isDone = 1
    }
    // 如果GET和POST请求中都没有找到 handle 则执行此方法
    const isOther = () => {
      req.query.createdBy = "administrator"
      req.body.createdBy = "administrator"
    }
    req.query.handler ? isGet() : false
    req.body.handler ? isPost() : false
    isDone ? false : isOther()
    return req
  },

  /**
   * 添加修改人字段值（一般用于修改）
   * @param {Object} req 请求信息
   * @returns {Object} 修改后的请求信息
   */
  fillUpdatedBy: (req) => {
    const isDone = false // 判断是否在GET/POST请求中找到 handle
    // 如果是GET请求就重新赋值到req.query中
    const isGet = () => {
      req.query.updatedBy = req.query.handler
      isDone = 1
    }
    // 如果是POST请求就重新赋值到req.body中
    const isPost = () => {
      req.body.updatedBy = req.body.handler
      isDone = 1
    }
    // 如果GET和POST请求中都没有找到 handle 则执行此方法
    const isOther = () => {
      req.query.updatedBy = "administrator"
      req.body.updatedBy = "administrator"
    }
    req.query.handler ? isGet() : false
    req.body.handler ? isPost() : false
    isDone ? false : isOther()
    return req
  },

  /**
   * 添加创建人和修改人字段值（一般用于初始化数据）
   * @param {Object} req 请求信息
   * @returns {Object} 修改后的请求信息
   */
  fillAllMust: (req) => {
    // 如果是GET请求就重新赋值到req.query中
    const isGet = () => {
      req.query.createdBy = req.query.handler
      req.query.updatedBy = req.query.handler
    }
    // 如果是POST请求就重新赋值到req.body中
    const isPost = () => {
      req.body.createdBy = req.body.handler
      req.body.updatedBy = req.body.handler
    }
    req.query.handler ? isGet() : false
    req.body.handler ? isPost() : false
    return req
  },
}
