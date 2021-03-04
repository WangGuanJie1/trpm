import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[7]

export default [
  {
    path: `/${subMenu.key}/viewSchoolProject`,
    name: '没有组件',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '各部门基础信息管理',
      roles: [sLeader.name],
      subMenu: subMenuList[2].key
    }
  },
  {
    path: `/${subMenu.key}/viewSchoolProject`,
    name: '没有组件',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '所属部门基础信息管理',
      roles: [dLeader.name],
      subMenu: subMenuList[2].key
    }
  }
]
