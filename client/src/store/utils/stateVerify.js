/**
 * 请求数据状态验证
 * @method dataStateVerify
 * @param {Number} code 状态码
 * @param {Function} successCallback 验证成功回调函数
 * @param {Function} exceptionCallback 验证失败回调函数
 */
export function stateVerify(code, successCallback, exceptionCallback) {
  if (code === 200) {
    successCallback()
  } else {
    exceptionCallback()
  }
}
/**
 * 请求数据成功状态验证
 * @method stateSuccessVerify
 * @param {Number} code 状态码
 * @param {Function} successCallback 验证成功回调函数
 */
export function stateSuccessVerify(code, successCallback) {
  if (code === 200) {
    successCallback()
  }
}
/**
 * 请求数据失败状态验证
 * @param {Number} code 状态码
 * @param {Function} exceptionCallback 验证失败回调函数
 */
export function stateExceptionVerify(code, exceptionCallback) {
  if (code !== 200) {
    exceptionCallback()
  }
}
