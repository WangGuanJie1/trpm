<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title">
    <template #content>
      <a-spin tip="正在创建项目..." :spinning="state.isLoading">
        <a-table :columns="columns" :data-source="batchList" :pagination="tablePaginationOption" bordered>
          <template #name="{ record }">
            {{ record }}
          </template>
          <template #level>
            {{ record.level }}
          </template>
          <template #time="{ record }">
            {{ record.deInTi }} -
            {{ record.deClTi }}
          </template>
          <template #timeRange="{ record }"> {{ record.level }}</template>
          <template #operation="{ record }">
            <a>申请项目{{ record.level }}</a>
          </template>
        </a-table>
      </a-spin>
    </template>
  </BaseContentLayout>
</template>

<script>
import BaseContentLayout from '@/views/layouts/BaseContentLayout'
import { Table, Spin } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    BaseContentLayout,
    ASpin: Spin,
    ATable: Table
  },
  setup() {
    // 表格列表项
    const columns = [
      {
        title: '批次名称',
        dataIndex: 'name',
        width: '30%',
        slots: { customRender: 'name' }
      },
      {
        title: '批次级别',
        dataIndex: 'level',
        width: '20%',
        slots: { customRender: 'level' }
      },
      {
        title: '申报始末时间',
        dataIndex: 'timeRange',
        width: '30%',
        slots: { customRender: 'timeRange' }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        slots: { customRender: 'operation' }
      }
    ]
    // 表格分页配置
    const tablePaginationOption = {
      defaultPageSize: 10,
      hideOnSinglePage: true
    }
    const store = useStore()
    const state = reactive({
      isLoading: false // 验证是否有资格申报时候的加载动画
    })
    const batchList = ref([]) // 批次列表
    // 获取所有批次信息
    store.dispatch('loadBatchInfo').then((res, err) => {
      if (res === 200) {
        batchList.value = res.data
      }
    })
    console.log(12)
    return {
      state,
      columns,
      batchList,
      tablePaginationOption
    }
  }
}
</script>

<style lang="less" scope></style>
