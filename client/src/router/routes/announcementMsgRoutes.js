import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[5]

export default [
  {
    path: `/${subMenu.key}/school/publish`,
    name: 'schoolPublishAnno',
    // TODO: 组件暂时未做
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '发布学校公告',
      roles: [sLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/dept/publish`,
    name: 'deptPublishAnno',
    // TODO: 组件暂时未做
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '发布部门公告',
      roles: [dLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/school/management`,
    name: 'schoolManagementAnno',
    // TODO: 组件暂时未做
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '学校公告信息管理',
      roles: [sLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/dept/management`,
    name: 'deptManagementAnno',
    // TODO: 组件暂时未做
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '部门公告信息管理',
      roles: [dLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/school/view`,
    name: 'schoolViewAnno',
    // TODO: 组件暂时未做
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '查看学校公告信息',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/dept/view`,
    name: 'deptViewAnno',
    // TODO: 组件暂时未做
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '查看部门公告信息',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  }
]
