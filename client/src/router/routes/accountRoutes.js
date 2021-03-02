import subMenuList from '../subMenuList'
const subMenu = subMenuList[8]

export default [
  {
    path: `/${subMenu}/personalCenter`,
    name: 'personalCenter',
    component: () => import('@/views/account/PersonalCenter'),
    meta: {
      title: '个人中心',
      roles: [teacher, sLeader, dLeader, specialist],
      subMenu: subMenuList[0].key
    }
  },
  {
    path: `/${subMenu}/securitySetting`,
    name: 'securitySetting',
    component: () => import('@/views/account/SecuritySetting'),
    meta: {
      title: '安全设置',
      roles: [teacher, sLeader, dLeader, specialist],
      subMenu: subMenuList[0].key
    }
  },
  {
    path: `/${subMenu}/systemSetting`,
    name: 'systemSetting',
    component: () => import('@/views/account/SyetemSetting'),
    meta: {
      title: '系统设置',
      roles: [teacher, sLeader, dLeader, specialist],
      subMenu: subMenuList[0].key
    }
  }
]
