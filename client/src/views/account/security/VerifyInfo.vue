<template>
  <a-row>
    <a-col>
      <a-form v-if="optionName === 'question'">
        <a-form-item label="待填写12">
          <a-input size="large"></a-input>
        </a-form-item>
        <a-form-item label="待填写2">
          <a-input size="large"></a-input>
        </a-form-item>
        <a-form-item label="待填写a">
          <a-input size="large"></a-input>
        </a-form-item>
      </a-form>
      <a-form v-else>
        <a-form-item v-if="optionName === 'password'" label="原密码">
          <a-input-password size="large"></a-input-password>
        </a-form-item>
        <a-form-item v-if="optionName === 'idcard'" label="身份证号">
          <a-input size="large"></a-input>
        </a-form-item>
        <a-form-item v-if="optionName === 'email'" label="邮箱">
          <a-input size="large"></a-input>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col, Input, Form } from 'ant-design-vue'
import { reactive, inject } from 'vue'
export default {
  components: {
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AInputPassword: Input.Password,
    AForm: Form,
    AFormItem: Form.Item
  },
  setup(props) {
    const optionName = inject('optionName')
    const state = reactive({})
    return {
      state,
      optionName
    }
  }
}
</script>

<style lang="less" scoped></style>
