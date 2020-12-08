<template>
  <a-layout id="base-layout-wrapper" class="base-layout-wrapper">
    <a-layout-sider
      v-model="collapsed"
      width="256"
      :trigger="null"
      collapsible
      :theme="navTheme"
      class="base-layout-sider-wrapper"
    >
      <GlobalSider></GlobalSider>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="base-layout-header-wrapper">
        <menu-fold-outlined class="trigger" v-show="!collapsed" @click="menuChange" />
        <menu-unfold-outlined class="trigger" v-show="collapsed" @click="menuChange" />
      </a-layout-header>
      <!-- <GlobalPageHeader /> -->
      <a-layout-content class="base-layout-content-wrapper">
        <router-view class="min-content-height"> </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { Layout } from 'ant-design-vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import GlobalSider from '@/components/GlobalSider'
// import AvatarDropdown from '@/components/GlobalHeader/AvatarDropdown'
// import GlobalPageHeader from '@/components/PageHeader/GlobalPageHeader'

export default {
  data() {
    return {
      collapsed: false,
      navTheme: this.$store.state.themeSetting.navTheme
    }
  },
  components: {
    ALayout: Layout,
    ALayoutSider: Layout.Sider,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    GlobalSider
    // GlobalPageHeader
  },
  methods: {
    menuChange() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
<style lang="less" scoped>
.base-layout-wrapper {
  .base-layout-sider-wrapper {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    z-index: 999;
    min-height: 100vh;
  }

  .base-layout-header-wrapper {
    padding: 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 999;

    .trigger {
      padding: 0 24px;
      font-size: 18px;
      line-height: 64px;
      cursor: pointer;
      transition: color 0.3s;
    }

    .trigger:hover {
      color: #1890ff;
    }
  }

  .base-layout-content-wrapper {
    .min-content-height {
      min-height: 100vh;
    }
  }
}
</style>
