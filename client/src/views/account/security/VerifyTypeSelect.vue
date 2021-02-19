<template>
  <a-row>
    <a-col>
      <a-form>
        <a-form-item label="验证方式">
          <a-select
            style="width: 100% !important"
            v-model:value="state.verifyOptionName"
            @change="handleChange"
            :size="'large'"
            class="select-width"
          >
            <a-select-option v-for="item in securityType" :key="item.enName" :value="item.enName">
              {{ item.cnName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col, Select, Form } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    ARow: Row,
    ACol: Col,
    ASelect: Select,
    ASelectOption: Select.Option,
    AForm: Form,
    AFormItem: Form.Item
  },
  setup(props, context) {
    const store = useStore()
    const state = reactive({
      verifyOptionName: '' // 默认指定的选项
    })
    const securityType = ref([])
    const teacherId = store.state.currentTeacherInfo.teacherInfo._id

    /**
     * 触发验证方式改变选项
     * @method handleChange
     * @param {String} option 当前选项key
     */
    const handleChange = (option) => {
      state.verifyOptionName = option
      context.emit('handle-change', state.verifyOptionName)
    }

    // 获取安全验证方式，TODO: 这里点击上一步和下一步存在频繁请求的情况，并且这也导致上一步到第一步时候会重置所有刚刚的操作，缺少操作记忆功能
    store.dispatch('verifyTypeByTeacherId', { _teacherId: teacherId }).then((res, err) => {
      if (res.code === 200) {
        securityType.value = res.data
        state.verifyOptionName = res.data[0].enName // 初始化下拉列表框默认选项
        handleChange(res.data[0].enName)
      }
    })

    return {
      state,
      securityType,
      handleChange
    }
  }
}
</script>

<style lang="less" scoped>
.select-width {
  width: 200px;
}
</style>
