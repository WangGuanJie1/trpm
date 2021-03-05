import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[0]

export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '首页',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  }
]
