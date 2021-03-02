<template>
  <a-drawer
    title="重置安全信息"
    placement="top"
    height="90%"
    :closable="true"
    :visible="isInitSecurity"
    :bodyStyle="drawerBodyStyle"
    @close="closeEvent"
  >
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="13">
        <a-steps :current="current">
          <a-step v-for="item in state.steps" :key="item" :title="item"></a-step>
        </a-steps>
      </a-col>
    </a-row>

    <a-row type="flex" justify="center" align="middle" class="h-80">
      <a-col :span="13" class="h-100">
        <a-row type="flex" justify="center" align="middle" class="h-100 main-container">
          <a-col :span="12">
            <a-row id="step1" v-if="current === 0">
              <a-col> </a-col>
            </a-row>
            <a-row id="step2" v-if="current === 1">
              <a-col> </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row type="flex" justify="center">
      <a-col :span="13">
        <a-row type="flex" justify="end">
          <a-col>
            <a-space>
              <a-button type="primary" @click="btnNext" v-if="current === 0"> 下一步 </a-button>
              <a-button type="primary" @click="btnAffirm" v-if="current === 1"> 确&emsp;定 </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>
import { Col, Drawer, Row, Button, Steps, Space } from 'ant-design-vue'
import { reactive, ref, provide, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: {
    ADrawer: Drawer,
    ARow: Row,
    ACol: Col,
    AButton: Button,
    ASteps: Steps,
    AStep: Steps.Step,
    ASpace: Space
  },
  // 从登陆时输入的工号
  setup() {
    const router = useRouter()
    const store = useStore()
    console.log('InitSecurityInfoLayout组件', store)
    // const _teacherId = store.state.currentTeacherInfo.teacherInfo._teacherId
    // const jobCode = store.state.currentTeacherInfo.teacherInfo.jobCode
    // const defaultSecurity = store.state.currentTeacherInfo.defaultSecurity
    const isInitSecurity = inject('isInitSecurity') // 是否重置安全信息
    const current = ref(0) // 当前步骤号
    // 模态框样式
    const drawerBodyStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '85%'
    }
    const securityInfo = ref({})
    provide('securityInfo', securityInfo)
    const state = reactive({
      steps: ['填写安全信息', '完成']
    })
    /**
     * 下一步按钮事件
     * @method btnNext
     */
    const btnNext = () => {}
    /**
     * 确定按钮事件
     * @method btnAffirm
     */
    const btnAffirm = () => {}
    /**
     * 关闭事件
     * @method closeEvent
     */
    const closeEvent = () => {
      isInitSecurity.value = false
      setTimeout(() => {
        router.push({ name: 'index' })
      }, 100)
    }
    return {
      state,
      isInitSecurity,
      drawerBodyStyle,
      current,
      btnNext,
      btnAffirm,
      closeEvent
    }
  }
}
</script>

<style lang="less" scoped>
.h-100 {
  height: 100%;
}
.h-80 {
  height: 80%;
}
.main-container {
  border: 1px solid rgba(199, 199, 199, 0.2);
  border-radius: 8px;
}
</style>
