import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[2]

export default [
  {
    path: '/personal/project/view',
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
    path: '/dept/project/view',
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
    path: '/school/project/view',
    name: 'schoolProjectView',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '查看学校全部项目',
      roles: [sLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: '/project/setup/:projectId',
    name: 'projectSetupItem',
    // TODO: 组件暂时未做
    component: () => import('@/views/active/setup/ProjectSetUp'),
    meta: {
      title: '创建项目',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name]
    }
  }
]
