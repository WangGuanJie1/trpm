<template>
  <div>
    <logo :showTitle="collapsed"></logo>
    <a-menu
      :default-selected-keys="['5']"
      :default-open-keys="['sub1']"
      mode="inline"
      :theme="navTheme"
      class="global-sider-menu-wrapper"
      :inline-collapsed="collapsed"
    >
      <!-- <a-menu-item key="6">
        <router-link to="/createProjectBatch">首页</router-link>
      </a-menu-item> -->
      <a-sub-menu v-for="item in state.menu" :key="item.key">
        <template v-slot:title>
          <menu-fold-outlined />
          <span>{{ item.name }}</span>
        </template>
        <a-menu-item v-for="route in item.routes" :key="route.name">
          <router-link :to="{ name: route.name }">{{ route.meta.title }}</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from 'ant-design-vue'
import Logo from './logo'
import { reactive } from 'vue'
import { MenuFoldOutlined } from '@ant-design/icons-vue'
import { subMenu } from '../../router/routes'
import { useStore } from 'vuex'

export default {
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
    Logo,
    MenuFoldOutlined
  },
  props: ['collapsed', 'navTheme'],
  setup(props) {
    const store = useStore()
    const role = store.state.currentTeacherInfo.roleInfo.roleName // 当前登录教师的权限

    // 根据权限进行菜单处理（处理导航内容）
    const menu = subMenu.filter((menu) => {
      menu.routes = menu.routes.filter((route) => {
        return route.meta.roles.includes(role)
      })
      return menu.routes.length !== 0
    })

    const state = reactive({
      menu
    })
    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.global-sider-menu-wrapper {
  text-align: left;
}
</style>
