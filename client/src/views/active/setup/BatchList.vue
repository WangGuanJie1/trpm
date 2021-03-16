<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title">
    <template #content>
      <a-spin :tip="state.loading.tip" :spinning="state.loading.spinning">
        <a-table
          :columns="columns"
          :data-source="batchList"
          :rowKey="(record) => record._id"
          :pagination="tablePaginationOption"
          bordered
        >
          <template #name="{ record }">
            {{ record.name }}
          </template>
          <template #level="{ record }">
            {{ record.level === 'simple' ? '一般项目' : '重点项目' }}
          </template>
          <template #timeRange="{ record }"> {{ toDate(record.deInTi) }} ~ {{ toDate(record.deClTi) }}</template>
          <template #operation="{ record }">
            <a @click="initProject(record)">申报项目</a>
          </template>
        </a-table>
      </a-spin>
    </template>
  </BaseContentLayout>
</template>

<script>
import BaseContentLayout from '@/views/layouts/BaseContentLayout'
import { Table, Spin } from 'ant-design-vue'
import { reactive, ref, provide } from 'vue'
import { useStore } from 'vuex'
import { toDate } from '@/utils/timeChange'
import { useRouter } from 'vue-router'

// 表格列表项
const columns = [
  {
    title: '批次名称',
    dataIndex: 'name',
    width: '25%',
    slots: { customRender: 'name' }
  },
  {
    title: '批次级别',
    dataIndex: 'level',
    width: '25%',
    slots: { customRender: 'level' }
  },
  {
    title: '申报始末时间',
    dataIndex: 'timeRange',
    width: '25%',
    slots: { customRender: 'timeRange' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '25%',
    slots: { customRender: 'operation' }
  }
]

export default {
  components: {
    BaseContentLayout,
    ASpin: Spin,
    ATable: Table
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      loading: {
        spinning: false, // 是否为加载状态
        tip: '正在加载'
      }
    })
    const batchList = ref([]) // 批次数据
    // 表格分页配置
    const tablePaginationOption = {
      defaultPageSize: 10,
      hideOnSinglePage: true
    }
    /**
     * 设置加载状态
     * @method loadingEvent
     * @param {Boolean} spinning 是否为加载状态值
     * @param {String} tip 描述文案
     * @returns {Object} 更改后的加载设置
     */
    const loadingEvent = (spinning, tip = '') => {
      state.loading.spinning = spinning
      state.loading.tip = tip
      return state.loading
    }

    loadingEvent(true, '正在加载批次数据...')
    // 获取所有批次信息
    store.dispatch('loadBatchInfo').then((res, err) => {
      loadingEvent(false)
      if (res.code === 200) {
        batchList.value = res.data
      } else {
        // TODO: 这一步是获取批次信息失败给出的信息提示，当前页面并没有对错误进行处理
      }
    })

    /**
     * 初始化项目
     * @method initProject
     * @param {Object} record 当前申报的批次信息
     */
    const initProject = (record) => {
      loadingEvent(true, '正在创建项目...')
      const teacherInfo = store.state.currentTeacherInfo.teacherInfo
      const payload = {
        handler: teacherInfo.jobCode, // 操作人工号
        // 以下项目跟创建项目相关
        jobCode: teacherInfo.jobCode, // 当前操作教师工号
        _batchId: record._id, // 当前项目所属批次编号
        // 以下数据跟项目成员相关
        name: teacherInfo.name,
        birthday: teacherInfo.birthday,
        cuEmPrTi: teacherInfo.cuEmPrTi,
        specificPositions: teacherInfo.specificPositions,
        department: teacherInfo.department,
        memberRank: 1
      }
      store.dispatch('initializeProject', payload).then((res, err) => {
        loadingEvent(false)
        if (res.code === 200) {
          const projectId = res.data.projectId
          provide('projectId', projectId) // 向子组件共享初始化的项目编号信息
          router.push({ name: 'projectSetupItem', params: { projectId } })
        }
      })
    }

    return {
      state,
      columns,
      batchList,
      tablePaginationOption,
      toDate,
      initProject
    }
  }
}
</script>

<style lang="less" scope></style>
