/**
 * 获取Promise方式的action
 * @method getPromiseAction
 * @param {Function} http axios数据请求
 * @param {Function} commit store中action的context.commit，具体查看vuex API中的Action
 * @param {String} mutationType store中的mutation
 * @returns {}
 */
export function getPromiseAction(http, commit, mutationType) {
  const promise = new Promise((resolve, reject) => {
    http
      .then(
        (res) => {
          commit(mutationType, res)
          return resolve(res)
        },
        (err) => {
          return reject(err)
        }
      )
      .catch((err) => {
        return reject(err)
      })
  })
  return promise
}
/**
 * 获取promise方式的action，无mutations
 * @method getPromiseActionNoMutations
 * @param {Function} http axios数据请求
 * @returns {}
 */
export function getPromiseActionNoMutations(http) {
  const promise = new Promise((resolve, reject) => {
    http
      .then(
        (res) => {
          return resolve(res)
        },
        (err) => {
          return reject(err)
        }
      )
      .catch((err) => {
        return reject(err)
      })
  })
  return promise
}
