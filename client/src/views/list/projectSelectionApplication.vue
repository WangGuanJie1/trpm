<template>
  <BaseContentLayout
    id="projectSelectionApplication"
    class="project-selection-application-wrapper"
    :headerPageTitle="this.$route.meta.title"
  >
    <template #content>
      <a-spin tip="正在创建项目..." :spinning="isLoading">
        <a-table
          :columns="columns"
          :data-source="filterBatchParticularsInfo"
          :pagination="tablePaginationOption"
          bordered
        >
          <template #projectBatchName="{ record }">
            {{ record.projectBatchName }}
          </template>
          <template #time="{ record }">
            {{ record.apInTi }} -
            {{ record.apClTi }}
          </template>
          <template #operation="{ record }">
            <a @click="verifyQualification(record)">申请项目</a>
          </template>
        </a-table>
      </a-spin>
    </template>
    <template #headerPageExtra>
      <a-select style="width: 200px" v-model:value="selectOption" @change="handleChangeSelectOption">
        <a-select-option value="全部">全部</a-select-option>
        <a-select-option value="以主持人申报">以主持人申报</a-select-option>
        <a-select-option value="以参与者申报">以参与者申报</a-select-option>
      </a-select>
    </template>
  </BaseContentLayout>
</template>

<script>
import { Table, Select, Spin } from 'ant-design-vue'
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import BaseContentLayout from '@/views/layouts/BaseContentLayout'

const columns = [
  {
    title: '批次名称',
    dataIndex: 'projectBatchName',
    width: '40%',
    slots: { customRender: 'projectBatchName' }
  },
  {
    title: '申报始末时间',
    dataIndex: 'time',
    width: '40%',
    slots: { customRender: 'time' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '20%',
    slots: { customRender: 'operation' }
  }
]

export default {
  components: {
    ATable: Table,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASpin: Spin,
    BaseContentLayout
  },
  data() {
    return {
      teacherInfo: this.$store.state.currentTeacherInfo.teacherInfo,
      // 当前教师主持和参与项目情况，防止当前教师没有参与过项目申报，这里把主持和参与的项目数量默认为0，
      teacherProjectInfo: {
        leaderCount: 0,
        participantCount: 0
      },
      filterBatchParticularsInfo: [],
      selectOption: '全部',
      columns,
      // 表格分页配置
      tablePaginationOption: {
        defaultPageSize: 10,
        hideOnSinglePage: true
      },
      isLoading: false
    }
  },
  watch: {
    teacherProjectInfo() {
      this.handleChangeSelectOption(this.selectOption)
    }
  },
  computed: {
    ...mapState({
      batchParticularsInfo: (state) => {
        const batchParticularsInfo = JSON.parse(JSON.stringify(state.batchParticularsInfo))
        return batchParticularsInfo.map((item, index) => {
          item.key = index.toString()
          item.apInTi = moment(item.apInTi).format('YYYY-MM-DD hh:mm:ss')
          item.apClTi = moment(item.apClTi).format('YYYY-MM-DD hh:mm:ss')
          return item
        })
      }
    }),
    /**
     * 筛选出符合主持人申报条件和参与者申报条件的批次
     * @method filterAllow
     * @returns {Array} 符合条件的批次
     */
    filterAllow() {
      // 符合申报条件（在项目申报时间内，且满足批次的申报条件）
      const leader = this.filterOnlyLeaderAllow
      const participant = this.filterOnlyParticipantAllow
      const record = Array.from(new Set(leader.concat(participant)))
      return this.sortTime(record)
    },
    /**
     * 筛选出不符合主持人申报条件和参与者申报条件的批次
     * TODO: 没编写该功能
     * @method filterNotAllow
     * @returns {Array} 不符合条件的批次
     */
    filterNotAllow() {
      return 1
    },
    /**
     * 筛选出仅符合主持人申报条件的批次
     * @method filterOnlyLeaderAllow
     * @returns {Array} 仅符合主持人申报条件的批次
     */
    filterOnlyLeaderAllow() {
      const batchParticularsInfo = this.verifyTime
      const leader = batchParticularsInfo.filter((item) => {
        return this.teacherProjectInfo.leaderCount < item.hoMaNuOfHoPr ||
          this.teacherProjectInfo.participantCount < item.hoMaNuOfPaPr
          ? 1
          : 0
      })
      return this.sortTime(leader)
    },
    /**
     * 筛选出仅符合参与者申报条件的批次
     * @method filterOnlyParticipantAllow
     * @returns {Array} 仅符合参与者申报条件的批次
     */
    filterOnlyParticipantAllow() {
      const batchParticularsInfo = this.verifyTime
      const participant = batchParticularsInfo.filter((item) => {
        return this.teacherProjectInfo.leaderCount < item.paMaNuOfHoPr ||
          this.teacherProjectInfo.participantCount < item.paMaNuOfPaPr
          ? 1
          : 0
      })
      return this.sortTime(participant)
    },
    /**
     * 筛选出符合申报时间的批次
     * @method verifyTime
     * @returns {Array} 符合申报时间的批次
     */
    verifyTime() {
      const data = this.batchParticularsInfo.filter((item) => {
        const momentTime = moment().valueOf()
        const startTime = moment(item.apInTi).valueOf()
        const endTime = moment(item.apClTi).valueOf()
        // 在可申报时间段内
        if (startTime <= momentTime && endTime > momentTime) {
          return true
        } else {
          return false
        }
      })
      return data
    }
  },
  methods: {
    // TODO: projectMemberFindByJobCode应被替换为teacherProjectInfoFindByJobcode，2者接口获得的数据不一样，需要对整体做出相关修改，数据具体请postman
    ...mapActions(['projectMemberFindByJobCode', 'initializeProject']),
    /**
     * 验证申报资格，符合申报条件创建项目
     * @method verifyQualification
     * @param {Object} record 当前选择的批次
     */
    verifyQualification(record) {
      this.isLoading = true
      console.log(record)
      // 判定当前教师在项目中的排名
      let memberRank = null
      switch (this.selectOption) {
        // 当选项卡选择全部时默认排名1
        case '全部': {
          memberRank = 1
          break
        }
        case '以主持人申报': {
          memberRank = 1
          break
        }
        case '以参与者申报': {
          memberRank = 2
          break
        }
      }
      const payload = {
        // 用于后端验证成员申报条件
        jobCode: this.teacherInfo.jobCode,
        hoMaNuOfHoPr: record.hoMaNuOfHoPr,
        hoMaNuOfPaPr: record.hoMaNuOfPaPr,
        paMaNuOfHoPr: record.paMaNuOfHoPr,
        paMaNuOfPaPr: record.paMaNuOfPaPr,
        // 用于后端通过申报验证后初始化项目
        _projectBatchId: record._projectBatchId,
        // 用于后端初始化项目成果后，加如到项目成员表（props参考MongoDB->trpm.project_member）
        name: this.teacherInfo.name,
        birthday: this.teacherInfo.birthday,
        cuEmPrTi: this.teacherInfo.cuEmPrTi,
        specificPositions: this.teacherInfo.specificPositions,
        department: this.teacherInfo.department,
        memberRank: memberRank
      }
      this.initializeProject(payload).then((res, err) => {
        this.isLoading = false
        if (res.code === 200) {
          // 更新当前教师主持或参与的项目信息（数据由初始化项目时提供）
          this.teacherProjectInfo = res.data.teacherProjectInfo
          const projectId = res.data.projectId
          console.log('成功创建项目,项目id:', res.data.projectId)
          this.$router.push({ name: 'projectSetUp', params: { projectId } })
        }
      })
    },
    /**
     * 触发改变选择框
     * @method handleChangeSelectOption
     * @param {String} selectOption 改变后的值
     */
    handleChangeSelectOption(selectOption) {
      switch (selectOption) {
        case '全部': {
          this.filterBatchParticularsInfo = this.filterAllow
          break
        }
        case '以主持人申报': {
          this.filterBatchParticularsInfo = this.filterOnlyLeaderAllow
          break
        }
        case '以参与者申报': {
          this.filterBatchParticularsInfo = this.filterOnlyParticipantAllow
          break
        }
      }
    },
    /**
     * 时间排序
     * @method sortTime
     * @param {Array} data 需要时间排序的批次数据（降序）
     * @returns {Array} 时间排序后的批次数据
     */
    sortTime(data) {
      return data.sort((a, b) => {
        return a.apInTi < b.apInTi ? 1 : -1
      })
    }
  },
  created() {
    // 从项目成员集合中获取当前教师主持或参与的项目信息
    this.projectMemberFindByJobCode({ jobCode: this.teacherInfo.jobCode }).then((res, err) => {
      this.teacherProjectInfo = res.code === 200 ? res.data.teacherProjectInfo : this.teacherProjectInfo
      // 进入页面默认初始化筛选出符合主持人申报条件和参与者申报条件的批次
      this.filterBatchParticularsInfo = this.filterAllow
    })
  }
}
</script>

<style lang="less" scoped>
.project-selection-application-wrapper {
}
</style>
