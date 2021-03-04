<template>
  <a-row id="loginLayout" type="flex" justify="center" align="bottom" class="container">
    <a-col :xs="19" :sm="15" :md="11" :lg="8" :xl="20">
      <a-row type="flex" justify="center">
        <a-col :xl="24">
          <a-row>
            <a-col flex="1">
              <div>
                <img src="@/assets/logo.png" alt="logo" class="login-logo" />
                <h3 class="login-title">教研项目管理系统</h3>
              </div>
              <a-from layout="horizontal" align="end">
                <a-from-item>
                  <a-input v-model:value="state.jobCode" placeholder="请输入工号">
                    <template v-slot:prefix> <user-outlined class="login-icon-color" /> </template>
                  </a-input>
                </a-from-item>
                <a-from-item>
                  <a-input-password v-model:value="state.password" placeholder="请输入密码">
                    <template v-slot:prefix>
                      <lock-outlined class="login-icon-color" />
                    </template>
                  </a-input-password>
                </a-from-item>
                <a-from-item>
                  <a-row type="flex" justify="space-between">
                    <!-- <a-checkbox v-model="state.checked">自动登录</a-checkbox>
                    <a @click="forgetNotification">忘记密码</a> -->
                  </a-row>
                </a-from-item>
                <a-from-item>
                  <a-button type="primary" block @click="login">登录</a-button>
                </a-from-item>
              </a-from>
            </a-col>
          </a-row>
          <a-row>
            <p class="copyright">Copyright © 2020 丹东卓智科技有限公司</p>
          </a-row>
          <InitSecurityInfoLayout />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
// TODO: 没从antd中引入Checkbox
import { Row, Col, Button, Input, Form, notification } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { reactive, provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import InitSecurityInfoLayout from '@/views/layouts/InitSecurityInfoLayout'

export default {
  components: {
    ARow: Row,
    ACol: Col,
    AButton: Button,
    AInput: Input,
    AInputPassword: Input.Password,
    AFrom: Form,
    AFromItem: Form.Item,
    // ACheckbox: Checkbox,
    UserOutlined,
    LockOutlined,
    InitSecurityInfoLayout
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      jobCode: null,
      password: null,
      checked: false,
      showmore: false
    })
    const isInitSecurity = ref(false) // 安全信息是否为初始信息
    provide('isInitSecurity', isInitSecurity)

    const login = () => {
      store.dispatch('executeSignIn', { jobCode: state.jobCode, password: state.password }).then((res, err) => {
        if (res.code === 200) {
          const defaultSecurity = store.state.currentTeacherInfo.defaultSecurity
          console.log(defaultSecurity)
          defaultSecurity.pwd || defaultSecurity.eml || defaultSecurity.ques
            ? (isInitSecurity.value = true)
            : router.push({ name: 'index' })
        } else {
          router.push({ name: '404' })
        }
      })
    }

    // 忘记密码提示信息
    const forgetNotification = () => {
      notification.info({
        message: '提示信息',
        description: '如果您忘记密码，请联络所在部门教研项目负责人。',
        key: 'forgetPasswordAction'
      })
    }
    return {
      state,
      login,
      forgetNotification
    }
  }
}
</script>

<style lang="less" scoped>
#loginLayout.container {
  height: 35rem;
  border-radius: 6px;
  background-color: rgb(243, 243, 243);

  .login-logo {
    width: 90px;
    height: 90px;
  }

  .login-title {
    font-weight: 600;
    letter-spacing: 4px;
    line-height: 4em;
  }

  .login-icon-color {
    color: rgba(0, 0, 0, 0.25);
  }

  .copyright {
    font-size: 0.3em;
    line-height: 0.5em;
    color: rgb(160, 160, 160);
    margin-bottom: 1rem;
  }
}
</style>
