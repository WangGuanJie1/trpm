/**
 * API数据格式规范
 */

module.exports = {
  /**
   * 响应实体格式(请自觉为data赋值key：val)
   * @method entityFormat
   * @param {Number} code 状态码
   * @param {String} msg 提示信息
   * @param {Object} data 对象
   * @returns {Object} 数据集合
   */
  entityFormat: (code, msg, data) => {
    return {
      code: code,
      message: msg,
      data: data,
    }
  },
  /**
   * 响应列表格式
   * @method listFormat
   * @param {Number} code 状态码
   * @param {String} msg 提示信息
   * @param {Array} list 对象数组
   * @returns {Array} 数据集合
   */
  listFormat: (code, msg, list) => {
    return {
      code: code,
      message: msg,
      data: list,
    }
  },
  /**
   * 响应返回状态格式
   * @method stateFormat
   * @param {Number} code 状态码
   * @param {String} msg 提示信息
   * @returns {Object} 数据集合
   */
  stateFormat: (code, msg) => {
    return {
      code: code,
      message: msg,
      data: '',
    }
  },
}
