import moment from 'moment'

/**
 * UTC 转 CST 获取日期
 * @param {String} utcTime UTC 时间
 * @param {String} separator 分隔符
 * @returns {String} 转换后的日期
 */
export const toDate = (utcTime, separator = '-') => {
  return moment(utcTime).format(['YYYY', 'MM', 'DD'].join(separator))
}

/**
 * UTC 转 CST 获取日期时间
 * @param {String} utcTime UTC 时间
 * @param {String} separator 分隔符
 * @returns {String} 转换后的日期时间
 */
export const toDateTime = (utcTime, separator = '-') => {
  return moment(utcTime).format(['YYYY', 'MM', 'DD'].join(separator) + ' HH:mm:ss')
}
