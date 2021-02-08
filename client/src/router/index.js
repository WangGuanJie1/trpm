import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// TODO: 目前身份权限属于写死状态，一旦发生变更将会对整个系统产生不可逆的影响，这里的身份权限要与MongoDB中dictionary_role保持一致性
const teacher = '教师'
const sLeader = '学校负责人'
const dLeader = '部门负责人'
const specialist = '专家'

const routes = [
  {
    path: '/',
    component: () => import('@/views/layouts/BaseLayout'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/components/ActionCard/ActionCard'),
        meta: {
          title: '首页',
          roles: [teacher, sLeader, dLeader, specialist]
        }
      },
      {
        path: '/projectSelectionApplication',
        name: 'projectSelectionApplication',
        component: () => import('@/views/list/projectSelectionApplication'),
        meta: {
          title: '项目申报选择',
          roles: [teacher, sLeader, dLeader, specialist]
        }
      },
      {
        path: '/viewSchoolProject',
        name: 'viewSchoolProject',
        // TODO: 组件暂时未做
        component: () => import('@/views/list/projectSelectionApplication'),
        meta: {
          title: '查看学校所有项目',
          roles: [sLeader]
        }
      },
      {
        path: '/viewDepartmentProject',
        name: 'viewDepartmentProject',
        // TODO: 组件暂时未做
        component: () => import('@/views/list/projectSelectionApplication'),
        meta: {
          title: '查看本部门所有项目',
          roles: [sLeader, dLeader]
        }
      },
      {
        path: '/viewOwnProject',
        name: 'viewOwnProject',
        // TODO: 组件暂时未做
        component: () => import('@/views/list/projectSelectionApplication'),
        meta: {
          title: '查看个人项目',
          roles: [teacher, sLeader, dLeader, specialist]
        }
      },
      {
        path: '/projectApplication',
        name: 'projectApplication',
        component: () => import('@/views/form/projectApplication'),
        meta: {
          title: '教研项目申请',
          roles: [teacher, sLeader]
        }
      },
      {
        path: '/createProjectBatch',
        name: 'createProjectBatch',
        component: () => import('@/views/form/createProjectBatch'),
        meta: {
          title: '创建项目批次信息',
          roles: [sLeader]
        }
      },
      {
        path: '/account/personalCenter',
        name: 'personalCenter',
        component: () => import('@/views/account/PersonalCenter'),
        meta: {
          title: '个人中心',
          roles: [teacher, sLeader, dLeader, specialist]
        }
      },
      {
        path: '/account/systemSetting',
        name: 'systemSetting',
        component: () => import('@/views/account/SyetemSetting'),
        meta: {
          title: '系统设置',
          roles: [teacher, sLeader, dLeader, specialist]
        }
      },
      {
        path: '/account/securitySetting',
        name: 'securitySetting',
        component: () => import('@/views/account/SecuritySetting'),
        meta: {
          title: '安全设置',
          roles: [teacher, sLeader, dLeader, specialist]
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/layouts/UserLayout'),
    children: [
      {
        path: '/login',
        component: () => import('@/views/user/SignIn'),
        meta: {
          title: '登录'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    redirect: '/404',
    component: () => import('@/views/exception/404'),
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  window.scrollTo(0, 0)
  // TODO: 在删除本地token后重访问以前页面会产生bug，访问不进去（该问题不确定，有待细究）
  if (to.path === '/login') {
    next()
  } else {
    // 跳转页面时候，需要验证浏览器是否还存在Token
    store.dispatch('verifyToken').then((res, err) => {
      const verifyToken = res.code === 200 && res.data.tokenUser === store.state.currentTeacherInfo.teacherInfo._id
      verifyToken ? next() : next({ path: '/login' })
    })
  }
  // console.log(to, from)
  // const role = store.state.currentTeacherInfo.roleInfo.roleName
  // console.log(role)
  // if (to.meta.roles && to.meta.roles.includes(role)) {
  //   console.log('有权限')
  //   next()
  // } else {
  //   next({ path: '/404' })
  // }

  // const teacherId = store.state.currentTeacherInfo.teacherInfo._id
  // const role = store.state.currentTeacherInfo.roleInfo.roleName
  // const requireAuth = to.meta.roles
})

export default router
