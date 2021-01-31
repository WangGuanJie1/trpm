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
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import BaseProjectInfo from '@/views/form/BaseProjectInfo'
import ProjectContent from '@/views/form/ProjectContent'
import Member from '@/views/table/Member'
import ResearchResume from '@/views/table/ResearchResume'
import TeachingResume from '@/views/table/TeachingResume'
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
  setup() {
    const store = useStore()
    const route = useRoute()
    const projectId = route.params.projectId // 当前项目的编号
    const jobCode = store.state.currentTeacherInfo.teacherInfo.jobCode // 当前操作教师的工号
    // 表格分页配置
    const tablePaginationOption = {
      defaultPageSize: 10,
      hideOnSinglePage: true
    }
    const state = reactive({
      // 基本项目信息
      baseProjectData: {
        projectName: '',
        _researchCategoryId: '',
        department: '',
        landline: '',
        telphone: '',
        email: '',
        dateWritten: '',
        researchPeriod: 1
      },
      memberTableData: [], // 项目组主要成员数据
      teachingTableData: [], // 主要教学工作简历数据
      researchTableData: [], // 主要科学研究和教学研究工作简历数据
      // 项目文本内容信息
      projectContentData: {
        cuSiAnPrAn: '',
        reCoAnMaFeAnKeIs: '',
        expectedResults: '',
        arAnPr: '',
        woExAnAc: ''
      }
    })

    /**
     * 提交项目
     * @method onSubmit
     * @param {Number} auditStatus 项目审核状态号，对应MongoDB.project.auditStatus
     */
    const onSubmit = (auditStatus) => {
      const payload = JSON.parse(JSON.stringify(state.baseProjectData))
      payload.auditStatus = auditStatus
      console.log('baseProjectData', state.baseProjectData)
      console.log('memberTableData', state.memberTableData)
      console.log('teachingTableData', state.teachingTableData)
      console.log('researchTableData', state.researchTableData)
      console.log('projectContentData', state.projectContentData)
      store.dispatch('projectUpdateById', payload).then((res, err) => {
        console.log('存储结果如下：')
        console.log(res)
      })
    }

    state.baseProjectData.projectId = projectId
    state.baseProjectData.jobCode = jobCode

    return {
      state,
      projectId,
      tablePaginationOption,
      onSubmit
    }
  },
  beforeRouteEnter: (to, from, next) => {
    // TODO: BUG，这里缺少当前页面刷新时，针对params丢失的处理，当前页面需要params.projectId做判断判定具体项目，如果用户直接访问当前路由会产生不可预料的后果
    // console.log('组件内守卫')
    // console.log(to)
    // console.log(from)
    // 'projectId' in to.params ? next() : next('/login') +
    next()
  }
}
</script>

<style lang="less" scoped>
#projectApplication.project-application-wrapper {
  // background-color: #fff;
}
.operation-button-interval {
  margin-left: 10px;
}
.delete {
  color: #f81d22;
}
.disabled-delete {
  color: rgba(0, 0, 0, 0.25);
}
.ml-10 {
  margin-left: 10px;
}
</style>
