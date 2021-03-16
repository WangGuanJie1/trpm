import accountRoutes from './accountRoutes'
import announcementMsgRoutes from './announcementMsgRoutes'
import basisMsgRoutes from './basisMsgRoutes'
import homeRoutes from './homeRoutes'
import logRoutes from './logRoutes'
import projActiveRoutes from './projActiveRoutes'
import projAuditRoutes from './projAuditRoutes'
import projMsgRoutes from './projMsgRoutes'
import projReviewRoutes from './projReviewRoutes'
import teacherMsgRoutes from './teacherMsgRoutes'
import otherRoutes from './otherRoutes'

import subMenuList from '../subMenuList'

export const homeRoute = homeRoutes
export const mainRoutesList = [].concat(
  accountRoutes,
  announcementMsgRoutes,
  basisMsgRoutes,
  logRoutes,
  projActiveRoutes,
  projAuditRoutes,
  projMsgRoutes,
  projReviewRoutes,
  teacherMsgRoutes
)
export const otherRoutesList = otherRoutes

/**
 * 生成侧边导航列表
 */
const createSubMenu = () => {
  // 重组侧边导航列表
  return subMenuList.map((menu) => {
    // 匹配路由项
    menu.routes = mainRoutesList.filter((route) => {
      // 路由所在导航名称相匹配
      return route.meta.subMenu === menu.key
    })
    return menu
  })
}

// 这里返回的是一个总集合，具体如何规定导航应该如何显示由调用该方法的组件控制
export const subMenu = createSubMenu()
