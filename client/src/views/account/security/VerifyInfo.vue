<template>
  <a-row>
    <a-col>
      <a-spin v-if="optionName === 'question'" size="large" :spinning="state.loading" tip="加载中...">
        <a-form v-show="!state.loading">
          <a-form-item v-for="(item, index) in secretQuestion" :key="item._id" :label="item.question">
            <a-input size="large" v-model:value="item.answer" @change="(e) => questionFormatVerify(e, index)"></a-input>
          </a-form-item>
        </a-form>
      </a-spin>
      <a-form v-else>
        <a-form-item v-if="optionName === 'password'" label="原密码">
          <a-input-password size="large" style="border-color: red" @change="passwordFormatVerfiy"></a-input-password>
        </a-form-item>
        <a-form-item v-if="optionName === 'idcard'" label="身份证号">
          <a-input size="large" v-model:value="idcard" @change="idcardFormatVerify"></a-input>
        </a-form-item>
        <a-form-item v-if="optionName === 'email'" label="邮箱">
          <a-input size="large" v-model:value="email" type="email" @change="emailFormatVerify"></a-input>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col, Input, Form, Spin } from 'ant-design-vue'
import { reactive, inject, watch } from 'vue'

export default {
  components: {
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AInputPassword: Input.Password,
    AForm: Form,
    AFormItem: Form.Item,
    ASpin: Spin
  },
  setup(props) {
    const allowNext = inject('allowNext') // 是否允许点击下一步按钮
    const optionName = inject('optionName')
    const secretQuestion = inject('secretQuestion')
    const idcard = inject('idcard')
    const email = inject('email')
    const state = reactive({
      loading: true,
      questionNotFill: [true]
    })

    // 如果教师选择通过密保问题来修改安全信息，则需要监视密保问题是否请求完成，以控制loading
    if (optionName.value === 'question') {
      watch(secretQuestion, () => {
        state.loading = false
      })
    }

    if (optionName.value === 'idcard') {
    }

    /**
     * 密保问题格式校验，TODO: 关于密保问题答案没有完善输入校验，此处后续需要完善输入校验及web安全
     * @method questionFormatVerify
     * @param {Object} e 事件参数
     * @param {Number} index 密保答案索引
     */
    const questionFormatVerify = (e, index) => {
      // 当3个密保问题都有填写则允许进行下一步
      const isAllowNextBtn = secretQuestion.value.every((item) => {
        return item.answer.length !== 0
      })
      allowNext.value = !isAllowNextBtn
    }

    /**
     * 身份证号码格式校验
     * @method idcardFormatVerify
     */
    const idcardFormatVerify = () => {
      allowNext.value = !(idcard.value.length === 18)
    }

    /**
     * 密码格式校验
     * @method passwordFormatVerfiy
     */
    const passwordFormatVerfiy = () => {}

    /**
     * 邮箱格式校验
     * @method emailFormatVerify
     */
    const emailFormatVerify = () => {}

    return {
      state,
      questionFormatVerify,
      idcardFormatVerify,
      passwordFormatVerfiy,
      emailFormatVerify,
      secretQuestion,
      optionName,
      idcard,
      email
    }
  }
}
</script>

<style lang="less" scoped></style>
