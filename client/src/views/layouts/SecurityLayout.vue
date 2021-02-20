<template>
  <a-drawer
    title="身份验证"
    placement="top"
    :closable="true"
    v-model:visible="showDrawer"
    height="90%"
    :bodyStyle="drawerBodyStyle"
    @close="closeEvent"
  >
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="13">
        <a-steps :current="state.current">
          <a-step v-for="item in state.steps" :key="item" :title="item"></a-step>
        </a-steps>
      </a-col>
    </a-row>

    <a-row type="flex" justify="center" align="middle" class="h-80">
      <a-col :span="13" class="h-100">
        <a-row type="flex" justify="center" align="middle" class="h-100 main-container">
          <a-col :span="12">
            <a-row id="step1" v-if="state.current === 0">
              <a-col>
                <VerifyTypeSelect @handle-change="optionIsChange" />
              </a-col>
            </a-row>
            <a-row id="step2" v-if="state.current === 1">
              <a-col>
                <VerifyInfo />
              </a-col>
            </a-row>
            <a-row id="step3" v-if="state.current === 2">
              <a-col></a-col>
            </a-row>
            <a-row id="step4" v-if="state.current === 3">
              <a-col></a-col>
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
              <a-button type="" @click="btnPrev" v-if="state.current !== 0"> 上一步 </a-button>
              <a-button type="primary" @click="btnNext" v-if="state.current !== 3" :loading="optionName === ''">
                下一步
              </a-button>
              <a-button type="primary" @click="btnAffirm" v-if="state.current === 3"> 确&emsp;定 </a-button>
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
import VerifyInfo from '@/views/account/security/VerifyInfo'
import VerifyTypeSelect from '@/views/account/security/VerifyTypeSelect'

export default {
  components: {
    VerifyTypeSelect,
    VerifyInfo,
    ADrawer: Drawer,
    ARow: Row,
    ACol: Col,
    ASpace: Space,
    ASteps: Steps,
    AStep: Steps.Step,
    AButton: Button
  },
  setup() {
    const btnIsTrigger = inject('btnIsTrigger')
    const btnTriggerName = inject('btnTriggerName')

    const showDrawer = ref(false)
    const optionName = ref('') // 选中的验证方式（英文标识）
    provide('optionName', optionName)
    const secretQuestion = ref('') // 验证信息的数据，数据内容根据验证方式改变，通过 optionName 进行区分
    provide('secretQuestion', secretQuestion)
    const state = reactive({
      current: 0, // 进度条位置
      steps: ['选择验证方式', '输入验证信息', '', '完成']
    })
    // 模态框样式
    const drawerBodyStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '85%'
    }

    /**
     * 安全选项卡组件选项变更
     * @method optionIsChange
     * @param {String} optionName 选项名称
     */
    const optionIsChange = (enName) => {
      console.log(enName)
      optionName.value = enName
    }

    /**
     * 下一步按钮事件
     * @method btnNext
     */
    const btnNext = () => {
      // 只有optionName有具体值时候才可允许触发下一步
      if (optionName.value) {
        // 在选择验证方式时点击下一步
        if (state.current === 0) state.current += 1

        // 在输入验证信息时点击下一步
        if (state.current === 1) {
          let verifyPass = 0 // 校验是否通过
          // 密保问题校验
          if (optionName.value === 'question') verifyPass = questionVerify()
          // 密码校验
          if (optionName.value === 'password') verifyPass = passwordVerify()

          // 邮箱校验
          if (optionName.value === 'email') verifyPass = emailVerify()

          // 身份证号码校验
          if (optionName.value === 'idcard') verifyPass = idcardVerify()

          // 是否允许下一步
          if (verifyPass === 1) state.current += 1
        }

        // 在更改信息时点击下一步
        if (state.current === 2) {
          state.current += 1
        }
      }
    }

    /**
     * 密保问题校验
     * @method questionVerify
     */
    const questionVerify = () => {}

    /**
     * 密码校验
     * @method passwordVerify
     */
    const passwordVerify = () => {}

    /**
     * 邮箱校验
     * @method emailVerify
     */
    const emailVerify = () => {}

    /**
     * 身份证号码校验
     * @method idcardVerify
     */
    const idcardVerify = () => {}

    /**
     * 上一步按钮事件
     * @method btnPrev
     */
    const btnPrev = () => {
      state.current -= 1
    }

    /**
     * 确定按钮事件
     * @method btnAffirm
     */
    const btnAffirm = () => {}

    /**
     * 模态框关闭事件
     * @method closeEvent
     */
    const closeEvent = (e) => {
      state.current = 0 // 只要触发模态框关闭就重置进度
    }

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
      optionName,
      btnIsTrigger,
      btnTriggerName,
      optionIsChange,
      btnNext,
      btnPrev,
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
