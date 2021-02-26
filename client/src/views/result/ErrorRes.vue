<template>
  <a-row>
    <a-col id="isBBB">
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
              <a-button type="primary" @click="backPrevRoute">返&emsp;回</a-button>
            </a-col>
          </a-row>
        </template>
      </a-result>
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col, Result, Button } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    ARow: Row,
    ACol: Col,
    AResult: Result,
    AButton: Button
  },
  props: {
    title: {
      type: String,
      default: '发生错误'
    },
    subTitle: {
      type: String,
      default: '发生错误，将返回至上一页面。  3 2 1'
    },
    isBack: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({})
    /**
     * 返回上一个路由
     * @method backPrevRoute
     */
    const backPrevRoute = () => {
      router.back()
      console.log('ErrorRes组件:', router)
    }
    return {
      state,
      props,
      backPrevRoute
    }
  }
}
</script>

<style lang="less" scoped></style>
