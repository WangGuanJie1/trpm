<template>
  <div>
    <logo></logo>
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      :theme="navTheme"
      class="global-sider-menu-wrapper"
    >
      <a-sub-menu key="sub1">
        <template v-slot:title>
          <a-icon type="mail" />
          <span>教研项目活动管理</span>
        </template>
        <a-menu-item key="5">
          <router-link to="/projectSelectionApplication">项目申报</router-link>
        </a-menu-item>
        <a-menu-item key="6">申报</a-menu-item>
        <a-menu-item key="7">结题 </a-menu-item>
        <a-menu-item key="8"> Option 8 </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="1">
        <a-icon type="pie-chart" />
        <span>教研项目查询</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="desktop" />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="inbox" />
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub2">
        <template v-slot:title>
          <a-icon type="appstore" />
          <span>Navigation Two</span>
        </template>
        <a-menu-item key="9"> Option 9 </a-menu-item>
        <a-menu-item key="10"> Option 10 </a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11"> Option 11 </a-menu-item>
          <a-menu-item key="12"> Option 12 </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from 'ant-design-vue'
import Logo from './logo'

export default {
  data() {
    return {}
  },
  computed: {
    navTheme() {
      return this.$store.state.themeSetting.navTheme
    }
  },
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
    Logo
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.global-sider-menu-wrapper {
  text-align: left;
}
</style>
