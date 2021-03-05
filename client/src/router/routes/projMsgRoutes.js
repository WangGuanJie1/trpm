import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[2]

export default [
  {
    path: `/${subMenu.key}/personal/project/view`,
    name: 'personalProjectView',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '查看个人全部项目',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/dept/project/view`,
    name: 'deptProjectView',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '查看所属部门全部项目',
      roles: [dLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/school/project/view`,
    name: 'schoolProjectView',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '查看学校全部项目',
      roles: [sLeader.name],
      subMenu: subMenu.key
    }
  }
]
