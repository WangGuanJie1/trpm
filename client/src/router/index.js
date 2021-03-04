import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import subMenuList from './subMenuList.js'
// import { otherRoutes } from './routes'
const otherRoutes = []

// TODO: 目前身份权限属于写死状态，一旦发生变更将会对整个系统产生不可逆的影响，这里的身份权限要与MongoDB中dictionary_role保持一致性
const teacher = '教师'
const sLeader = '学校负责人'
const dLeader = '部门负责人'
const specialist = '专家'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/layouts/BaseLayout'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/components/ActionCard/ActionCard'),
        meta: {
          title: '首页',
          roles: [teacher, sLeader, dLeader, specialist],
          subMenu: subMenuList[0].key
        }
      },
      {
        path: '/projectSelectionApplication',
        name: 'projectSelectionApplication',
        component: () => import('@/views/list/projectSelectionApplication'),
        meta: {
          title: '申报教研项目',
          roles: [teacher, sLeader, dLeader, specialist],
          subMenu: subMenuList[1].key
        }
      },
      {
        path: '/projectSelectionApplication',
        name: 'projectSelectionApplication',
        component: () => import('@/views/list/projectSelectionApplication'),
        meta: {
          title: '申报教研项目',
          roles: [teacher, sLeader, dLeader, specialist],
          subMenu: subMenuList[1].key
        }
      },
      {
        path: '/viewSchoolProject',
        name: 'viewSchoolProject',
        // TODO: 组件暂时未做
        component: () => import('@/views/list/projectSelectionApplication'),
        meta: {
          title: '查看学校所有项目',
          roles: [sLeader],
          subMenu: subMenuList[2].key
        }
      },
      {
        path: '/viewDepartmentProject',
        name: 'viewDepartmentProject',
        // TODO: 组件暂时未做
        component: () => import('@/views/list/projectSelectionApplication'),
        meta: {
          title: '查看本部门所有项目',
          roles: [sLeader, dLeader],
          subMenu: subMenuList[2].key
        }
      },
      {
        path: '/viewOwnProject',
        name: 'viewOwnProject',
        // TODO: 组件暂时未做
        component: () => import('@/views/list/projectSelectionApplication'),
        meta: {
          title: '查看个人项目',
          roles: [teacher, sLeader, dLeader, specialist],
          subMenu: subMenuList[2].key
        }
      },
      {
        path: '/projectApplication',
        name: 'projectApplication',
        component: () => import('@/views/form/projectApplication'),
        meta: {
          title: '教研项目申请',
          roles: [teacher, sLeader],
          subMenu: subMenuList[1].key
        }
      },
      {
        path: '/createProjectBatch',
        name: 'createProjectBatch',
        component: () => import('@/views/form/createProjectBatch'),
        meta: {
          title: '创建项目批次信息',
          roles: [sLeader],
          subMenu: subMenuList[0].key
        }
      }
    ]
  },
  [...otherRoutes]
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const notRolePage = ['login', 'error', '404', 'securityInit'] // 不用校验权限的页面
const notVerifyTokenPage = ['login'] // 不需要验证token是否存在的页面

// TODO: 在删除本地token后重访问以前页面会产生bug，访问不进去（该问题不确定，有待细究）
router.beforeEach((to, from, next) => {
  /**
   * 判断跳转的地址是否是不需要token验证的页面
   * @method isNeedRole
   */
  const isNeedToken = (callback, callback2) => {
    // 如果要跳转的地址是不需要token验证的页面，直接放行
    if (notVerifyTokenPage.includes(to.name)) {
      next()
    } else {
      store.dispatch('verifyToken').then((res, err) => {
        const verifyToken = res.code === 200 && res.data.tokenUser === store.state.currentTeacherInfo.teacherInfo._id
        if (verifyToken) {
          console.log(to.name + '的权限验证通过')
          callback()
        } else {
          console.log(to.name + '的权限验证不通过')
          callback2()
        }
      })
    }
  }
  document.title = to.meta.title
  window.scrollTo(0, 0)

  const role = store.state.currentTeacherInfo.roleInfo.roleName
  const toUrlRoles = to.meta.roles

  console.table({
    fromUrl: from.name,
    toUrl: to.name,
    needRole: !notRolePage.includes(to.name),
    needToken: !notVerifyTokenPage.includes(to.name)
  })
  console.log(from, to)

  // TODO：这里存在一个重复next的问题，需要找到出问题的逻辑点
  // 如果要跳转的地址是不需要权限的页面，还需要验证token，如果跳转的地址是需要权限的页面，则需要验证权限信息
  if (notRolePage.includes(to.name)) {
    isNeedToken(next, () => router.push({ name: 'login' }))
  } else {
    // 权限比对
    if (toUrlRoles.includes(role)) {
      isNeedToken(next, () => router.push({ name: 'login' }))
    } else {
      router.push({
        name: 'error',
        query: {
          title: '禁止访问',
          subtitle: '您的权限级别无权访问该页面'
        }
      })
    }
  }
  next()
})

export default router
