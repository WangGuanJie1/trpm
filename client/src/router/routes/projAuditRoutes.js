import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[4]

export default [
  {
    path: `/${subMenu.key}/viewSchoolProject`,
    name: '没有组件',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '本部门项目审批',
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
      title: '各部门项目审批',
      roles: [dLeader.name],
      subMenu: subMenuList[2].key
    }
  }
]
