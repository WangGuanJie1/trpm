<template>
  <a-row>
    <a-col id="isBBB">
      <Asyncextra />

      <a-result status="error" :title="props.title" :sub-title="props.subTitle">
        <template #extra v-if="!props.isBack">
          <a-row>
            <a-col>
              <slot name="extra"></slot>
            </a-col>
          </a-row>
        </template>
        <template #extra v-else>
          <a-row>
            <a-col>
              <slot name="back"></slot>
            </a-col>
          </a-row>
        </template>
      </a-result>
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col, Result } from 'ant-design-vue'
import { reactive, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
console.log(router)
const abc = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve(import('./SuccessRes'))
    })
)
console.log(abc)
export default {
  components: {
    Asyncextra: abc,
    ARow: Row,
    ACol: Col,
    AResult: Result
  },
  props: {
    title: {
      type: String,
      default: '发生错误'
    },
    subTitle: {
      type: String,
      default: ''
    },
    isBack: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const state = reactive({})
    return { state, props }
  }
}
</script>

<style lang="less" scoped></style>
