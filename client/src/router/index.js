import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { homeRoute, mainRoutesList, otherRoutesList } from './routes'

// TODO: 目前身份权限属于写死状态，一旦发生变更将会对整个系统产生不可逆的影响，这里的身份权限要与MongoDB中dictionary_role保持一致性
const routes = [
  {
    path: '/',
    component: () => import('@/views/layouts/BaseLayout'),
    redirect: '/home',
    children: [].concat(homeRoute, mainRoutesList)
  },
  ...otherRoutesList
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const notRolePage = ['login', 'error', '404', 'securityInit'] // 不用校验权限的页面
const notVerifyTokenPage = ['login'] // 不需要验证token是否存在的页面

// TODO: 在删除本地token后重访问以前页面会产生bug，访问不进去（该问题不确定，有待细究）
router.beforeEach((to, from, next) => {
  /**
   * 判断跳转的地址是否是不需要token验证的页面
   * @method isNeedRole
   */
  const isNeedToken = (callback, callback2) => {
    // 如果要跳转的地址是不需要token验证的页面，直接放行
    if (notVerifyTokenPage.includes(to.name)) {
      next()
    } else {
      store.dispatch('verifyToken').then((res, err) => {
        const verifyToken = res.code === 200 && res.data.tokenUser === store.state.currentTeacherInfo.teacherInfo._id
        if (verifyToken) {
          console.log(to.name + '的权限验证通过')
          callback()
        } else {
          console.log(to.name + '的权限验证不通过')
          callback2()
        }
      })
    }
  }
  document.title = to.meta.title
  window.scrollTo(0, 0)

  console.table({
    fromUrl: from.name,
    toUrl: to.name,
    needRole: !notRolePage.includes(to.name),
    needToken: !notVerifyTokenPage.includes(to.name)
  })
  console.log(from, to)

  // TODO：这里存在一个重复next的问题，需要找到出问题的逻辑点
  // 如果要跳转的地址是不需要权限的页面，还需要验证token，如果跳转的地址是需要权限的页面，则需要验证权限信息
  if (notRolePage.includes(to.name)) {
    isNeedToken(next, () => router.push({ name: 'login' }))
  } else {
    const role = store.state.currentTeacherInfo.roleInfo.roleName
    const toUrlRoles = to.meta.roles
    // 权限比对
    if (toUrlRoles.includes(role)) {
      isNeedToken(next, () => router.push({ name: 'login' }))
    } else {
      router.push({
        name: 'error',
        query: {
          title: '禁止访问',
          subtitle: '您的权限级别无权访问该页面'
        }
      })
    }
  }
  next()
})

export default router
