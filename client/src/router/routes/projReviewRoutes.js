import { sLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[3]

export default [
  {
    path: `/${subMenu.key}/set/specialist`,
    name: '没有组件',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '设置评审专家',
      roles: [sLeader.name],
      subMenu: subMenu.key
    }
  },
  {
    path: `/${subMenu.key}/project/review`,
    name: 'projectReview',
    // TODO: 组件暂时未做
    component: () => import('@/views/list/projectSelectionApplication'),
    meta: {
      title: '项目评审打分',
      roles: [specialist.name],
      subMenu: subMenu.key
    }
  }
]
