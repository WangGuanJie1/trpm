import { dLeader } from '../role'
import subMenuList from '../subMenuList'
const subMenu = subMenuList[6]

export default [
  {
    path: `/${subMenu.key}/dept/teacher/view`,
    name: 'deptTeacherView',
    // TODO: 组件暂时未做
    component: () => import('@/components/ActionCard/ActionCard'),
    meta: {
      title: '查看本部门教师信息',
      roles: [dLeader.name],
      subMenu: subMenu.key
    }
  }
]
