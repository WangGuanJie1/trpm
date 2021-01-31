<template>
  <a-layout id="base-layout-wrapper" class="base-layout-wrapper">
    <a-layout-sider
      :collapsed="state.collapsed"
      width="256"
      :trigger="null"
      collapsible
      :theme="state.navTheme"
      class="base-layout-sider-wrapper"
    >
      <GlobalSider :collapsed="state.collapsed" :navTheme="state.navTheme" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="base-layout-header-wrapper">
        <a-row type="flex" justify="space-between">
          <a-col>
            <menu-fold-outlined class="trigger" v-if="!state.collapsed" @click="toggleCollapsed" />
            <menu-unfold-outlined class="trigger" v-else @click="toggleCollapsed" />
          </a-col>
          <a-col>
            <AvatarDropdown />
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content class="base-layout-content-wrapper">
        <router-view class="min-content-height"> </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { Layout, Row, Col } from 'ant-design-vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import GlobalSider from '@/components/GlobalSider'
import { useStore } from 'vuex'
import { reactive } from 'vue'
import AvatarDropdown from '@/components/GlobalHeader/AvatarDropdown'

export default {
  components: {
    ALayout: Layout,
    ALayoutSider: Layout.Sider,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ARow: Row,
    ACol: Col,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    GlobalSider,
    AvatarDropdown
  },
  setup() {
    const store = useStore()
    const state = reactive({
      collapsed: false, // 导航收缩/展开
      navTheme: store.state.currentTeacherInfo.settingInfo.navTheme // 导航配色主题
    })

    /**
     * 触发导航收缩
     * @method toggleCollapsed
     */
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed
    }

    return {
      state,
      toggleCollapsed
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
    text-align: left;

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
