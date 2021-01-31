<template>
  <a-table :columns="memberTable" :data-source="state.memberData" bordered :pagination="tablePaginationOption">
    <template v-for="col in memberInputColumns" #[col]="{ text, record }" :key="col">
      <div>
        <div v-if="record.editable">
          <a-tooltip v-if="col === 'jobCode' ? 1 : 0" title="请填写本校教师工号">
            <a-input-search
              :value="text"
              @search="(val) => searchTeacherInfo(val, record)"
              @change="(e) => memberHandleChange(e.target.value, record, col)"
            />
          </a-tooltip>
          <a-input v-else :value="text" @change="(e) => memberHandleChange(e.target.value, record, col)" />
        </div>
        <span v-else>
          {{ text }}
        </span>
      </div>
    </template>
    <template #birthday="{ text, record }">
      <div>
        <a-date-picker
          v-if="record.editable"
          type="date"
          :value="text"
          @change="(e) => birthdayHandleChange(e, record)"
        ></a-date-picker>
        <span v-else>
          {{ text }}
        </span>
      </div>
    </template>
    <template #memberRank="{ text, record }">
      <div>
        <a-input-number
          v-if="record.editable"
          :min="memberRankOption.min"
          :max="memberRankOption.max"
          :value="text"
          @change="(e) => memberRankHandleChange(e, text, record)"
        >
        </a-input-number>
        <span v-else>
          {{ text }}
        </span>
      </div>
    </template>
    <template #operation="{ record }">
      <div>
        <span v-if="record.editable">
          <a @click="memberSave(record)">保存</a>
          <!-- <a @click="memberCancel(record)" class="operation-button-interval">取消</a> -->
        </span>
        <span v-else>
          <a v-bind="state.memberEditingKey !== '' ? { disabled: 'disabled' } : {}" @click="memberEdit(record)">
            编辑
          </a>
          <a-popconfirm title="确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="deleteMember(record)">
            <a
              v-bind="state.memberEditingKey !== '' ? { disabled: 'disabled' } : {}"
              class="operation-button-interval"
              :class="state.memberEditingKey !== '' ? 'disabled-delete' : 'delete'"
            >
              删除
            </a>
          </a-popconfirm>
        </span>
      </div>
    </template>
  </a-table>
  <a-button
    type="primary"
    @click="addMember"
    v-bind="state.memberCount == memberRankOption.max ? { disabled: 'disabled' } : {}"
    >添加成员</a-button
  >
</template>

<script>
import { Table, Button, Popconfirm, Input, InputNumber, Tooltip, DatePicker } from 'ant-design-vue'
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  components: {
    ATable: Table,
    AButton: Button,
    APopconfirm: Popconfirm,
    AInput: Input,
    AInputSearch: Input.Search,
    AInputNumber: InputNumber,
    ATooltip: Tooltip,
    ADatePicker: DatePicker
  },
  props: ['memberTableData', 'tablePaginationOption'],
  setup(props, { emit }) {
    const store = useStore()
    // 项目组主要成员表格字段定义
    const memberTable = [
      {
        title: '成员编号',
        dataIndex: 'jobCode',
        width: '10%',
        slots: { customRender: 'jobCode' }
      },
      {
        title: '成员姓名',
        dataIndex: 'name',
        width: '10%',
        slots: { customRender: 'name' }
      },
      {
        title: '出生日期',
        dataIndex: 'birthday',
        width: '10%',
        slots: { customRender: 'birthday' }
      },
      {
        title: '专业技术职称',
        dataIndex: 'cuEmPrTi',
        width: '10%',
        slots: { customRender: 'cuEmPrTi' }
      },
      {
        title: '职务',
        dataIndex: 'specificPositions',
        width: '10%',
        slots: { customRender: 'specificPositions' }
      },
      {
        title: '所在部门',
        dataIndex: 'department',
        width: '10%',
        slots: { customRender: 'department' }
      },
      {
        title: '主要教学科研领域',
        dataIndex: 'mainResearchArea',
        width: '10%',
        slots: { customRender: 'mainResearchArea' }
      },
      {
        title: '项目中的分工',
        dataIndex: 'responsibility',
        width: '10%',
        slots: { customRender: 'responsibility' }
      },

      {
        title: '成员排名',
        dataIndex: 'memberRank',
        sorter: (a, b) => {
          return a.memberRank - b.memberRank
        },
        width: '10%',
        slots: { customRender: 'memberRank' }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' }
      }
    ]
    // 项目组主要成员表格input控件列选项
    const memberInputColumns = [
      'jobCode',
      'name',
      'cuEmPrTi',
      'specificPositions',
      'department',
      'mainResearchArea',
      'responsibility'
    ]
    const memberRankOption = { min: 1, max: 5 } // 成员排名控件配置 TODO：等待管理员配置最大值
    const state = reactive({
      memberEditingKey: '', // 项目组主要成员表中当前正在编辑的记录号
      memberData: props.memberTableData, // 项目组主要成员数据
      cacheMemberData: [], // 项目组主要成员缓存数据
      memberCount: 2 // 项目组主要成员数量
    })

    /**
     * 根据工号查找教师信息 TODO: 没有排重功能
     * @method searchTeacherInfo
     * @param {String} jobCode 工号
     * @param {Object} record 当前行的数据
     */
    const searchTeacherInfo = (jobCode, record) => {
      const newData = [...state.memberData]
      // const cacheData = [...state.cacheMemberData]
      // const findInCacheData = cacheData.filter((item) => jobCode === item.jobCode)[0]

      // if (findInCacheData) {
      //   return
      // }
      store.dispatch('findTeacherByJobcode', { jobCode: jobCode }).then((res, err) => {
        if (res.code === 200) {
          const teacherInfo = res.data.teacherInfo
          const target = newData.filter((item) => record.key === item.key)[0]
          if (target) {
            const { name, birthday, cuEmPrTi, specificPositions, department } = teacherInfo
            target.name = name
            target.birthday = birthday
            target.cuEmPrTi = cuEmPrTi
            target.specificPositions = specificPositions
            target.department = department
          }
        }
      })
    }
    /**
     * 表值改变（成员表）
     * @method memberHandleChange
     * @param {String} text 当前输入内容
     * @param {Object} record 当前行的数据
     * @param {String} col 正在编辑的列
     */
    const memberHandleChange = (text, record, col) => {
      // console.log('当前输入内容：' + text, '当前行数据：', record, '正在编辑的列：' + col)
      const newData = [...state.memberData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target[col] = text
      }
    }
    /**
     * 生日时间更改（成员表）
     * @method birthdayHandleChange
     * @param {Object} time moment对象
     * @param {Object} record 当前行的数据
     */
    const birthdayHandleChange = (time, record) => {
      // TODO: 这里会报错，因为时间参数非moment对象
      const newData = [...state.memberData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        if (time) {
          target.birthday = moment(time).format('YYYY-MM-DD')
        } else {
          target.birthday = ''
        }
      }
    }
    /**
     * 成员排名更改（成员表） TODO: 该方法可能使排名混乱，逻辑待优化
     * @method memberRankHandleChange
     * @param {Number} number 新的数值
     * @param {Number} text 旧的数值
     * @param {Object} record 当前行的数据
     */
    const memberRankHandleChange = (number, text, record) => {
      const newData = [...state.memberData]
      const sameMemberRank = newData.find((item) => number === item.memberRank)
      const target = newData.filter((item) => record.key === item.key)[0]
      if (number <= state.memberCount) {
        if (sameMemberRank) sameMemberRank.memberRank = text
        if (target) target.memberRank = number
      }
    }
    /**
     * 触发保存状态（成员表）
     * @method memberSave
     * @param {Object} record 当前行的数据
     */
    const memberSave = (record) => {
      const newData = [...state.memberData]
      const newCacheData = [...state.cacheMemberData]
      const target = newData.filter((item) => record.key === item.key)[0]
      const targetCache = newCacheData.filter((item) => record.key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        state.memberData = newData
        Object.assign(targetCache, target)
        state.cacheMemberData = newCacheData
      }
      state.memberEditingKey = ''
      emit('update:memberTableData', state.memberData)
    }
    /**
     * 触发编辑状态（成员表）
     * @method memberEdit
     * @param {Object} record 当前行的数据
     */
    const memberEdit = (record) => {
      const newData = [...state.memberData]
      const target = newData.filter((item) => record.key === item.key)[0]
      state.memberEditingKey = record.key
      if (target) {
        target.editable = true
      }
    }
    /**
     * 触发取消状态（成员表） TODO: 目前取消功能已禁用，原因是当在编辑状态时，改变成员排名会直接保存，在这种情况下触发取消会产生排名重复
     * @method memberCancel
     */
    const memberCancel = (record) => {
      const newData = [...state.memberData]
      // const newCacheData = [...state.cacheMemberData]
      const target = newData.filter((item) => record.key === item.key)[0]
      state.memberEditingKey = ''
      if (target) {
        Object.assign(target, state.cacheMemberData.filter((item) => record.key === item.key)[0])
        delete target.editable
      }
    }
    /**
     * 删除成员
     * @method deleteMember
     * @param record 当前行的记录
     */
    const deleteMember = (record) => {
      state.memberData = state.memberData.filter((item) => {
        const itemKey = item.key
        if (record.memberRank < item.memberRank) {
          item.key = (item.key - 1).toString()
          --item.memberRank
        }
        return itemKey !== record.key
      })
      state.memberCount -= 1
    }
    /**
     * 添加成员
     * @method addMember
     */
    const addMember = () => {
      if (state.memberCount < memberRankOption.max) {
        const newData = defaultMemberData(state.memberCount)
        state.memberData = [...state.memberData, newData]
        state.memberCount += 1
        emit('update:memberTableData', state.memberData)
      }
    }
    /**
     * 默认成员数据格式
     * @method defaultMemberData
     * @param {Number} key 编号标记
     */
    const defaultMemberData = (key) => {
      return {
        key: key.toString(),
        jobCode: '',
        name: '',
        birthday: '',
        cuEmPrTi: '',
        specificPositions: '',
        department: '',
        mainResearchArea: '',
        responsibility: '',
        memberRank: key + 1
      }
    }

    for (let i = 0; i < state.memberCount; i++) {
      state.memberData.push(defaultMemberData(i))
    }
    state.cacheMemberData = state.memberData.map((item) => ({ ...item }))
    watch(
      () => state.memberData,
      (newVal, oldVal) => {
        state.cacheMemberData = newVal
      }
    )

    return {
      state,
      memberTable,
      memberInputColumns,
      memberRankOption,
      memberHandleChange,
      searchTeacherInfo,
      birthdayHandleChange,
      memberRankHandleChange,
      memberSave,
      memberEdit,
      memberCancel,
      deleteMember,
      addMember
    }
  }
}
</script>

<style lang="less" scoped></style>
