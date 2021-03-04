import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[7]

export default [
  {
    path: '/viewSchoolProject',
    name: 'viewSchoolProject',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '各部门基础信息管理',
      roles: [sLeader],
      subMenu: subMenuList[2].key
    }
  },
  {
    path: '/viewDepartmentProject',
    name: 'viewDepartmentProject',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '所属部门基础信息管理',
      roles: [sLeader, dLeader],
      subMenu: subMenuList[2].key
    }
  }
]
