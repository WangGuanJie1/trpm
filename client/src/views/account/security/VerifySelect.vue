<template>
  <a-row type="flex" justify="center" align="middle">
    <a-col>
      选择验证方式：
      <a-select v-model:value="verifyOptionName" @change="handleChange" :size="'large'" class="select-width">
        <a-select-option v-for="item in securityType" :key="item.enName" :value="item.enName">{{
          item.cnName
        }}</a-select-option>
      </a-select>
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col, Select } from 'ant-design-vue'
import { reactive, inject } from 'vue'
export default {
  components: {
    ARow: Row,
    ACol: Col,
    ASelect: Select,
    ASelectOption: Select.Option
  },
  setup(props, context) {
    const securityType = inject('securityType')
    const verifyOptionName = inject('verifyOptionName')
    const state = reactive({})

    /**
     * 触发验证方式改变选项
     * @method handleChange
     * @param {String} option 当前选项key
     */
    const handleChange = (option) => {
      verifyOptionName.value = option
      context.emit('handle-change', verifyOptionName.value)
    }
    return {
      state,
      securityType,
      verifyOptionName,
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
