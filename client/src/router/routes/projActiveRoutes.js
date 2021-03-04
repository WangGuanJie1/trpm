import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[1]

export default [
  {
    path: `/${subMenu.key}/create/batch`,
    name: 'createProjectBatch',
    component: () => import('@/views/form/createProjectBatch'),
    meta: {
      title: '创建项目批次信息',
      roles: [sLeader.name],
      subMenu: subMenuList[0].key
    }
  },
  {
    path: `/${subMenu.key}/selection/application`,
    name: 'projectSelectionApplication',
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '项目立项申报',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenuList[1].key
    }
  },
  {
    path: `/${subMenu.key}/selection/application`,
    name: '没有组件',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '项目阶段检查',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenuList[1].key
    }
  },
  {
    path: `/${subMenu.key}/selection/application`,
    name: '没有组件',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '项目结题检查',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenuList[1].key
    }
  }
]
