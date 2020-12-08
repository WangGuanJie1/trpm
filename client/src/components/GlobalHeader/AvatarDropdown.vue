<template>
  <div>
    <!-- TODO: dropdown 为默认true，所以不会触发spin，这里需要根据获取到头像数据后再渲染，否则执行spin -->
    <a-dropdown v-if="true">
      <a-avatar size="small" :src="avatar"> </a-avatar>
      <span>{{ username }}</span>
      <a-menu :selected-keys="[]">
        <a-menu-item key="center">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item key="settings">
          <a-icon type="setting" />
          个人设置
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-spin v-else> </a-spin>

    <a-dropdown>
      <template v-slot:overlay>
        <a @click="e => e.preventDefault()"> Hover me </a>
        <a-menu>
          <a-menu-item key="1">
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item key="12">
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item key="13">
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { Dropdown, Spin, Avatar, Menu } from 'ant-design-vue'
export default {
  data () {
    return {
      // TODO: username需要登录后获取
      username: '戒骄戒躁的王',
      // TODO: avatar需要登录后获取
      avatar:
        'https://lh3.googleusercontent.com/-xWEepX1PSVA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmvJoena98hPnusSGyIdeFlmqyeOA/photo.jpg?sz=46'
    }
  },
  components: {
    ADropdown: Dropdown,
    ASpin: Spin,
    AMenu: Menu,
    AMenuItem: Menu.item,
    AAvatar: Avatar
  }
}
</script>

<style lang="stylus" scoped></style>
