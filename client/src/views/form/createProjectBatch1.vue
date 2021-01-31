<template>
  <BaseContentLayout
    id="projectApplication"
    class="project-application-wrapper"
    :headerPageTitle="this.$route.meta.title"
  >
    <template #content>
      <a-tabs>
        <template #tabBarExtraContent style="background-color: skyblue">
          <a-row>
            <a-col>
              <a-button type="primary" @click="onSubmit(1)">提交</a-button>
              <a-button type="default" @click="onSubmit(0)" class="ml-10">暂存</a-button>
            </a-col>
          </a-row>
        </template>
        <a-tab-pane key="1" tab="项目基本信息">
          {{ baseProjectData }}
          <BaseProjectInfo v-model:baseProjectData="state.baseProjectData" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="主要教学工作简历">
          {{ state.teachingTableData }}
          <TeachingResume
            :tablePaginationOption="tablePaginationOption"
            v-model:teachingTableData="state.teachingTableData"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="主要科学研究和教学研究工作简历">
          {{ state.researchTableData }}
          <ResearchResume
            :tablePaginationOption="tablePaginationOption"
            v-model:researchTableData="state.researchTableData"
          />
        </a-tab-pane>
        <a-tab-pane key="4" tab="项目组主要成员">
          {{ state.memberTableData }}
          <Member :tablePaginationOption="tablePaginationOption" v-model:memberTableData="state.memberTableData" />
        </a-tab-pane>
        <a-tab-pane key="5" tab="立项依据和目标">
          {{ state.projectContentData }}
          <ProjectContent v-model:projectContentData="state.projectContentData" />
        </a-tab-pane>
      </a-tabs>
    </template>
  </BaseContentLayout>
</template>
<script>
import { Row, Col, Button, Tabs } from 'ant-design-vue'
import BaseContentLayout from '@/views/layouts/BaseContentLayout'

export default {
  components: {
    ARow: Row,
    ACol: Col,
    AButton: Button,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    BaseContentLayout,
    BaseProjectInfo,
    ProjectContent,
    Member,
    ResearchResume,
    TeachingResume
  },
  setup() {}
}
</script>

<style lang="less" scoped></style>
