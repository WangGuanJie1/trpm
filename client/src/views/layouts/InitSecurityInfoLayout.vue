<template>
  <a-drawer title="初始化安全信息" placement="top" height="90%">
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="13">
        <a-form>
          <a-form-item>
            <a-button type="primary" @click="initSecurityInfo"></a-button>
            <a-button type="primary"></a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>
import { Col, Drawer, Row } from 'ant-design-vue'
import { reactive, ref, provide } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    ADrawer: Drawer,
    ARow: Row,
    ACol: Col
  },
  // 从登陆时输入的工号
  props: ['jobCode'],
  setup() {
    // const store = useStore()
    const securityInfo = ref({
      jobCode
    })
    const state = reactive({})
    const doInitSecurityInfo = () => {}
    provide('securityInfo', securityInfo)

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped></style>
