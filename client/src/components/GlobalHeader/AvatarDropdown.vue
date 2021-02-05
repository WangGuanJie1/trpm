<template>
  <div class="avatar-dropdown-wrapper">
    <!-- TODO: dropdown 为默认true，所以不会触发spin，这里需要根据获取到头像数据后再渲染，否则执行spin -->
    <a-dropdown v-if="true">
      <div class="pointer">
        <a-avatar size="default" :src="state.avatar" class="avatar">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <span class="name">{{ state.username }}</span>
        <CaretDownOutlined />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="personalCenter">
            <router-link :to="{ name: 'personalCenter' }"><UserOutlined :style="menuItemIcon" />个人中心 </router-link>
          </a-menu-item>
          <a-menu-item key="securitySetting">
            <router-link :to="{ name: 'securitySetting' }">
              <SafetyOutlined :style="menuItemIcon" />安全设置
            </router-link>
          </a-menu-item>
          <a-menu-item key="systemSetting">
            <router-link :to="{ name: 'systemSetting' }"><SettingOutlined :style="menuItemIcon" />系统设置</router-link>
          </a-menu-item>
          <a-menu-item key="logout">
            <router-link to=""><PoweroffOutlined :style="[menuItemIcon, logoutIcon]" />退出登录</router-link>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-spin v-else></a-spin>
  </div>
</template>

<script>
import { Dropdown, Avatar, Menu, Spin } from 'ant-design-vue'
import {
  CaretDownOutlined,
  UserOutlined,
  SafetyOutlined,
  SettingOutlined,
  PoweroffOutlined
} from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { reactive } from 'vue'
export default {
  components: {
    ADropdown: Dropdown,
    ASpin: Spin,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AAvatar: Avatar,
    CaretDownOutlined,
    UserOutlined,
    SafetyOutlined,
    SettingOutlined,
    PoweroffOutlined
  },
  setup() {
    const store = useStore()
    const menuItemIcon = {
      color: '#1890ff',
      marginRight: '12px'
    }
    const logoutIcon = {
      color: '#FF4D4F'
    }
    const state = reactive({
      username: store.state.currentTeacherInfo.teacherInfo.name,
      avatar: ''
      // 'https://lh3.googleusercontent.com/-xWEepX1PSVA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmvJoena98hPnusSGyIdeFlmqyeOA/photo.jpg?sz=46'
    })

    return {
      state,
      menuItemIcon,
      logoutIcon
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-dropdown-wrapper {
  padding: 0 24px;

  .pointer {
    cursor: pointer;
  }

  .avatar {
    margin: 0 12px;
  }

  .name {
    margin-right: 6px;
  }
}
</style>
