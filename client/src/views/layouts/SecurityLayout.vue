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
      if (optionName.value) state.current += 1
    }

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
      btnAffirm
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
