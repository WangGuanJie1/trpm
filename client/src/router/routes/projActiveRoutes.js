import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[1]

export default [
  {
    path: `/${subMenu.key}/create/batch`,
    name: 'createBatch',
    component: () => import('@/views/form/createProjectBatch'),
    meta: {
      title: '创建项目批次信息',
      roles: [sLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/project/setup`,
    name: 'projectSetUp',
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '项目立项申报',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/project/phase/check`,
    name: 'projectPhaseCheck',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '项目阶段检查',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/project/final/check`,
    name: 'projectFinalCheck',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '项目结题检查',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  }
]
