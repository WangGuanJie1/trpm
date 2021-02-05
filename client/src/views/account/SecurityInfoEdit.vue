<template>
  <a-drawer title="身份验证" placement="top" :closable="true" v-model:visible="showDrawer" height="90%">
    <a-steps :current="state.current">
      <a-step v-for="item in state.steps" :key="item" :title="item"></a-step>
    </a-steps>
    <SecurityVerify />
    <a-row class="steps-content" v-if="btnTriggerName.enName === 'password'">
      <a-col></a-col>
    </a-row>
    <a-row class="steps-content" v-if="btnTriggerName.enName === 'email'">
      <a-col></a-col>
    </a-row>
    <a-row class="steps-content" v-if="btnTriggerName.enName === 'question'">
      <a-col></a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-button type="primary">Next</a-button>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>
import { Drawer, Row, Col, Steps, Button } from 'ant-design-vue'
import { inject, reactive, watch, ref } from 'vue'
import SecurityVerify from '@/views/account/SecurityVerify'

export default {
  components: {
    SecurityVerify,
    ADrawer: Drawer,
    ARow: Row,
    ACol: Col,
    ASteps: Steps,
    AStep: Steps.Step,
    AButton: Button
  },
  setup() {
    const btnIsTrigger = inject('btnIsTrigger')
    const btnTriggerName = inject('btnTriggerName')
    const securityType = inject('securityType')

    const state = reactive({
      current: 0,
      steps: ['选择身份验证类型', '身份验证', `更改${btnTriggerName.value.enName}信息`, '完成']
    })
    const showDrawer = ref(false)

    watch(
      () => btnIsTrigger.value,
      () => {
        showDrawer.value = !showDrawer.value
        console.log('触发btn后', btnIsTrigger.value, showDrawer.value, btnTriggerName.value)
      }
    )

    return {
      state,
      showDrawer,
      btnIsTrigger,
      btnTriggerName,
      securityType
    }
  }
}
</script>

<style lang="less" scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>
