export default [
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/result/ErrorRes'),
    props: (router) => {
      // console.log('error路由参数内容查看：', router)
      return {
        // 这里要注意路由参数小写问题
        title: router.query.title,
        subTitle: router.query.subtitle,
        isBack: router.query.isback,
        extra: router.query.extra
      }
    },
    meta: {
      title: '发生错误'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/layouts/UserLayout'),
    children: [
      {
        path: '/login',
        name: 'login',
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
