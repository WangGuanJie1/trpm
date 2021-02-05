<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title">
    <template #content>
      <a-space direction="vertical" :size="60" class="w-100 space-mt">
        <a-descriptions title="基本信息" bordered :column="descriptionsCol">
          <a-descriptions-item label="姓名">{{ state.teacherInfo.name }}</a-descriptions-item>
          <a-descriptions-item label="性别">{{ state.teacherInfo.gender }}</a-descriptions-item>
          <a-descriptions-item label="民族">{{ state.teacherInfo.nation }}</a-descriptions-item>
          <a-descriptions-item label="政治面貌">{{ state.teacherInfo.politicalOutlook }}</a-descriptions-item>
          <a-descriptions-item label="出生日期">{{ state.teacherInfo.birthday }}</a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="职位信息" bordered :column="descriptionsCol">
          <a-descriptions-item label="工号">{{ state.teacherInfo.jobCode }}</a-descriptions-item>
          <a-descriptions-item label="所属部门">{{ state.teacherInfo.department }}</a-descriptions-item>
          <a-descriptions-item label="所属系部">{{ state.teacherInfo.office }}</a-descriptions-item>
          <a-descriptions-item label="岗位">{{ state.teacherInfo.specificPositions }}</a-descriptions-item>
        </a-descriptions>
      </a-space>
    </template>
  </BaseContentLayout>
</template>

<script>
import { Descriptions, Space } from 'ant-design-vue'
import BaseContentLayout from '@/views/layouts/BaseContentLayout'
import { reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    BaseContentLayout,
    ADescriptions: Descriptions,
    ADescriptionsItem: Descriptions.Item,
    ASpace: Space
  },
  setup() {
    const store = useStore()
    const state = reactive({
      teacherInfo: store.state.currentTeacherInfo.teacherInfo
    })
    const labelCol = { span: 4 }
    const wrapperCol = { span: 20 }
    const descriptionsCol = 2

    return {
      state,
      labelCol,
      wrapperCol,
      descriptionsCol
    }
  }
}
</script>

<style lang="less" scoped>
.space-mt {
  margin-top: 30px;
}
</style>
