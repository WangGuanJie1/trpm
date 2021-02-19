<template>
  <a-drawer
    title="身份验证"
    placement="top"
    :closable="true"
    v-model:visible="showDrawer"
    height="90%"
    :bodyStyle="drawerBodyStyle"
  >
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="13">
        <a-steps :current="state.current">
          <a-step v-for="item in state.steps" :key="item" :title="item"></a-step>
        </a-steps>
      </a-col>
    </a-row>

    <a-row type="flex" justify="center" align="middle" class="h-80p">
      <a-col :span="9">
        <a-row id="step1" v-if="state.current === 0">
          <a-col>
            <VerifyTypeSelect @handle-change="optionIsChange" />
          </a-col>
        </a-row>
        <a-row id="step2" v-if="state.current === 1">
          <a-col></a-col>
        </a-row>
        <a-row id="step3" v-if="state.current === 2">
          <a-col></a-col>
        </a-row>
        <a-row id="step4" v-if="state.current === 3">
          <a-col></a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row type="flex" justify="center">
      <a-col :span="13">
        <a-row type="flex" justify="center">
          <a-col>
            <a-space>
              <a-button type="" @click="btnNext"> 上一步 </a-button>
              <a-button type="primary" @click="btnNext"> 下一步 </a-button>
              <a-button type="primary" @click="btnAffirm"> 确定 </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>
import { Drawer, Row, Col, Steps, Button, Space } from 'ant-design-vue'
import { inject, reactive, watch, ref, provide } from 'vue'
import { useStore } from 'vuex'
import VerifyTypeSelect from '@/views/account/security/VerifyTypeSelect'

export default {
  components: {
    VerifyTypeSelect,
    ADrawer: Drawer,
    ARow: Row,
    ACol: Col,
    ASpace: Space,
    ASteps: Steps,
    AStep: Steps.Step,
    AButton: Button
  },
  setup() {
    const store = useStore()
    const btnIsTrigger = inject('btnIsTrigger')
    const btnTriggerName = inject('btnTriggerName')
    const securityType = inject('securityType')
    const verifyOptionName = ref(securityType.value[0].enName)
    provide('verifyOptionName', verifyOptionName)
    const showDrawer = ref(false)
    const state = reactive({
      current: 0, // 进度条位置
      steps: ['选择验证类型', '输入验证信息', '', '完成']
    })
    const drawerBodyStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '85%'
    }
    const teacherId = store.state.currentTeacherInfo.teacherInfo._id
    const securityInfo = ref('')
    store.dispatch('findSecurityInfoByTeacherId', { _teacherId: teacherId }).then((res, err) => {
      if (res.code === 200) {
        securityInfo.value = res.data
      }
    })

    watch(
      () => securityInfo.value,
      () => {
        console.log(securityInfo.value)
      }
    )

    /**
     * 安全选项卡组件选项变更
     * @method optionIsChange
     * @param {String} optionName 选项名称
     */
    const optionIsChange = (optionName) => {
      console.log(optionName)
      verifyOptionName.value = optionName
    }

    /**
     * 下一步按钮事件
     * @method btnNext
     */
    const btnNext = () => {
      console.log(verifyOptionName.value)
    }

    /**
     * 确定按钮事件
     * @method btnAffirm
     */
    const btnAffirm = () => {}

    watch(
      () => btnIsTrigger.value,
      () => {
        showDrawer.value = !showDrawer.value
        state.steps[2] = '更改' + btnTriggerName.value.cnName + '信息'
      }
    )

    return {
      state,
      drawerBodyStyle,
      showDrawer,
      btnIsTrigger,
      btnTriggerName,
      optionIsChange,
      btnNext,
      btnAffirm
    }
  }
}
</script>

<style lang="less" scoped>
.h-80p {
  height: 80%;
}
</style>
