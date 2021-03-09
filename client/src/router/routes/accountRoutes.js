import { teacher, sLeader, dLeader, specialist } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[8]

export default [
  {
    path: '/personal/center',
    name: 'personalCenter',
    component: () => import('@/views/account/PersonalCenter'),
    meta: {
      title: '个人中心',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  },
  {
    path: '/security/setting',
    name: 'securitySetting',
    component: () => import('@/views/account/SecuritySetting'),
    meta: {
      title: '安全设置',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  },
  {
    path: '/system/setting',
    name: 'systemSetting',
    component: () => import('@/views/account/SyetemSetting'),
    meta: {
      title: '系统设置',
      roles: [teacher.name, sLeader.name, dLeader.name, specialist.name],
      subMenu: subMenu.key
    }
  }
]
