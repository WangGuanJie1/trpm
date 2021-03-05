import { sLeader, dLeader } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[4]

export default [
  {
    path: `/${subMenu.key}/own/dept/project/approval`,
    name: 'ownDeptProjectApproval',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '本部门项目审批',
      roles: [dLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/all/dept/project/approval`,
    name: 'allDeptProjectApproval',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '各部门项目审批',
      roles: [sLeader.name],
      subMenu: subMenu.key
    }
  }
]
