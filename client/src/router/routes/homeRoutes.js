export default [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '首页',
      roles: [teacher, sLeader, dLeader, specialist],
      subMenu: subMenuList[0].key
    }
  }
]
