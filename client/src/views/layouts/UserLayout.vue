<template>
  <a-row id="userLayout" type="flex" justify="center" align="middle" class="user-layout-wrapper">
    <a-col :xs="19" :sm="15" :md="11" :lg="8" :xl="5" type="flex" justify="center">
      <a-row type="flex" justify="center">
        <a-col flex="1">
          <a-spin size="large" :spinning="signInLoading" :delay="loadingDelay">
            <router-view></router-view>
          </a-spin>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col, Spin } from 'ant-design-vue'
import { mapState } from 'vuex'
export default {
  name: 'UserLayout',
  components: {
    ARow: Row,
    ACol: Col,
    ASpin: Spin
  },
  data() {
    return {
      loadingDelay: 100
    }
  },
  computed: {
    ...mapState({
      signInLoading: (state) => state.signInLoading
    })
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100vh;
  background: url('../../assets/bg_login.jpg') no-repeat center center fixed;
  background-size: cover;
}
</style>
