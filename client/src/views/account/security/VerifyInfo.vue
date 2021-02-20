<template>
  <a-row>
    <a-col>
      <a-form v-if="optionName === 'question'">
        <a-form-item v-for="(item, index) in secretQuestion" :key="item._id" :label="item.question">
          <a-input size="large" v-model:value="item.answer" @change="(e) => fillAnswer(e, index)"></a-input>
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
import { useStore } from 'vuex'
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
    const store = useStore()
    const optionName = inject('optionName')
    const secretQuestion = inject('secretQuestion')
    const state = reactive({
      question: [] // 获取到的密保问题以及后续填写的答案 {_Id,question,answer}
    })

    // 如果教师选择通过密保问题来修改安全信息，则需要重新获取当前教师的密保问题，TODO: 存在多次请求的问题，此处可优化。
    if (optionName.value === 'question') {
      const _teacherId = store.state.currentTeacherInfo.teacherInfo._id
      store.dispatch('findSecurityQuestionByTeacherId', { _teacherId: _teacherId }).then((res, err) => {
        if (res.code === 200) {
          // 初始化答案内容
          res.data.forEach((element) => {
            element.answer = ''
          })
          secretQuestion.value = res.data
        }
      })
    }

    /**
     * 密保问题答案填写
     * @method fillAnswer
     * @param {Object} e 事件参数
     * @param {Number} index 密保答案索引
     */
    const fillAnswer = (e, index) => {
      // TODO: 关于密保问题答案没有输入校验，此处后续需要完善输入校验及web安全
    }

    return {
      state,
      fillAnswer,
      secretQuestion,
      optionName
    }
  }
}
</script>

<style lang="less" scoped></style>
