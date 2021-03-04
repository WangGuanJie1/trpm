import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[3]

export default [
  {
    path: `/${subMenu.key}/viewSchoolProject`,
    name: '没有组件',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '设置评审专家',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenuList[2].key
    }
  },
  {
    path: `/${subMenu.key}/viewSchoolProject`,
    name: '没有组件',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '查看所属部门全部项目',
      roles: [dLeader.name],
      subMenu: subMenuList[2].key
    }
  },
  {
    path: `/${subMenu.key}/viewSchoolProject`,
    name: '没有组件',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '查看学校全部项目',
      roles: [sLeader.name],
      subMenu: subMenuList[2].key
    }
  }
]
