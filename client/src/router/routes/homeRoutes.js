import { teacher, sLeader, dLeader, specialist } from '../role'

export default [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '首页',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenuList[0].key
    }
  }
]
