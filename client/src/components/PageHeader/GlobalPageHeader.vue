<template>
  <a-row type="flex">
    <a-page-header class="global-page-header-wrapper" :title="title" :breadcrumb="{ routes, itemRender }">
      <template #subTitle>
        {{ subTitle }}
      </template>
      <template #extra>
        <slot name="headerPageExtra"></slot>
      </template>
      <template #footer>
        <div class="footer">
          <slot name="headerPageFooter"></slot>
        </div>
      </template>
      <slot name="headerPageContent"></slot>
    </a-page-header>
  </a-row>
</template>

<script>
import { Row, PageHeader } from 'ant-design-vue'

export default {
  components: {
    ARow: Row,
    APageHeader: PageHeader
  },
  props: ['title', 'subTitle'],
  data() {
    return {
      breadcrumb: {
        routes: this.$route.matched
      }
    }
  },
  computed: {
    routes() {
      let route = this.$route.matched
      // 排除不允许在面包屑显示的导航，一般是使用在父子path同名上，通过判断meta.breadcrumbShow是否存在来排除
      route = route.filter((item) => {
        item.breadcrumbName = item.meta.title
        item.children = []
        return 'title' in item.meta
      })
      return route
    }
  },
  watch: {},
  methods: {
    itemRender({ route, params, routes, paths }) {
      // console.log(this.routes)
      // console.log(route)
      // console.log(params)
      // console.log(routes)
      // console.log(paths)
      if (routes.indexOf(route) === routes.length - 1) {
        return <span>{route.meta.title}</span>
      } else {
        return <router-link to={`/${paths.join('/')}`}>{route.meta.title}</router-link>
      }
    }
  }
}
</script>

<style lang="less" scoped>
.global-page-header-wrapper {
  width: 100%;
  text-align: left;
  background-color: #fff;
}

.footer {
  margin-top: 32px;
  margin-bottom: 24px;
}
</style>
