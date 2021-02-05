<template>
  <a-row type="flex" justify="center" align="middle">
    <a-col>
      选择验证方式：
      <a-select v-model:value="state.selectTypeName">
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
  setup() {
    const securityType = inject('securityType')
    const state = reactive({
      selectTypeName: securityType.value[0].enName
    })

    return {
      state,
      securityType
    }
  }
}
</script>

<style lang="less" scoped></style>
