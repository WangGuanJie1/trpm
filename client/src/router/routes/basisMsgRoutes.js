import { sLeader, dLeader } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[7]

export default [
  {
    path: `/${subMenu.key}/all/dept/management`,
    name: 'allDeptManagement',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '各部门基础信息管理',
      roles: [sLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/own/dept/management`,
    name: 'ownDeptManagement',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '所属部门基础信息管理',
      roles: [dLeader.name],
      subMenu: subMenu.key
    }
  }
]
