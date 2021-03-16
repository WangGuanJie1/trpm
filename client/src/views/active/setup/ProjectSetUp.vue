<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title">
    <template #content>
      <a-row type="flex" justify="center" align="middle">
        <a-col :span="24">
          <a-steps v-model:current="current" type="navigation" size="small" :style="stepStyle">
            <a-step v-for="item in state.steps" :status="item.status" :key="item.key" :title="item.title"></a-step>
          </a-steps>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <PorjectBaseInfo />
        </a-col>
      </a-row>
    </template>
  </BaseContentLayout>
</template>

<script>
import BaseContentLayout from '@/views/layouts/BaseContentLayout'
import { reactive, ref } from 'vue'
import { Row, Col, Steps } from 'ant-design-vue'

export default {
  components: {
    BaseContentLayout,
    ARow: Row,
    ACol: Col,
    ASteps: Steps,
    AStep: Steps.Step
  },
  setup() {
    const state = reactive({
      steps: [
        {
          key: 'setUp-01',
          title: '项目基本信息',
          status: 'wait'
        },
        {
          key: 'setUp-02',
          title: '主要教学工作简历',
          status: 'wait'
        },
        {
          key: 'setUp-03',
          title: '主要研究工作简历',
          status: 'wait'
        },
        {
          key: 'setUp-04',
          title: '项目组主要成员',
          status: 'wait'
        },
        {
          key: 'setUp-05',
          title: '立项依据和目标',
          status: 'wait'
        }
      ]
    })
    const current = ref(0)
    const stepStyle = {
      marginBottom: '60px',
      boxShadow: '0px -1px 0 0 #e8e8e8 inset'
    }

    return {
      state,
      current,
      stepStyle
    }
  }
}
</script>

<style lang="less" scoped></style>
