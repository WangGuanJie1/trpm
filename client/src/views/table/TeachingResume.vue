<template>
  <a-table :columns="teachingTable" :data-source="state.teachingData" bordered :pagination="tablePaginationOption">
    <template #termName="{ text, record }">
      <div>
        <a-select
          style="width: 100%"
          v-if="record.editable"
          :value="text"
          placeholder="请选择授课时间"
          @change="(val) => termHandleChange(val, record)"
        >
          <a-select-option v-for="item in state.termArray" :key="item._id" :value="item.termName">
            {{ item.termName }}
          </a-select-option>
        </a-select>
        <span v-else>
          {{ text }}
        </span>
      </div>
    </template>
    <template v-for="col in teachingInputColumns" #[col]="{ text, record }" :key="col">
      <div>
        <a-input
          v-if="record.editable"
          :value="text"
          @change="(e) => teachingHandleChange(e.target.value, record, col)"
        />
        <span v-else>
          {{ text }}
        </span>
      </div>
    </template>
    <template #operation="{ record }">
      <div>
        <span v-if="record.editable">
          <a @click="teachingSave(record)">保存</a>
          <!-- <a @click="memberCancel(record)" class="operation-button-interval">取消</a> -->
        </span>
        <span v-else>
          <a v-bind="state.teachingEditingKey !== '' ? { disabled: 'disabled' } : {}" @click="teachingEdit(record)">
            编辑
          </a>
          <a-popconfirm title="确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="deleteTeaching(record)">
            <a
              v-bind="state.teachingEditingKey !== '' ? { disabled: 'disabled' } : {}"
              class="operation-button-interval"
              :class="state.teachingEditingKey !== '' ? 'disabled-delete' : 'delete'"
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
    @click="addTeaching"
    v-bind="state.teachingCount == teachingOption.max ? { disabled: 'disabled' } : {}"
    >添加简历
  </a-button>
</template>

<script>
import { Table, Input, Button, Popconfirm, Select } from 'ant-design-vue'
import { watch, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    ATable: Table,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    APopconfirm: Popconfirm,
    AButton: Button
  },
  props: ['teachingTableData', 'tablePaginationOption'],
  setup(props, { emit }) {
    const store = useStore()
    // 教学工作简历表字段
    const teachingTable = [
      {
        title: '授课时间',
        dataIndex: 'termName',
        width: '20%',
        slots: { customRender: 'termName' }
      },
      {
        title: '课程名称',
        dataIndex: 'courseName',
        width: '20%',
        slots: { customRender: 'courseName' }
      },
      {
        title: '授课对象',
        dataIndex: 'teachingObject',
        width: '20%',
        slots: { customRender: 'teachingObject' }
      },
      {
        title: '学时',
        dataIndex: 'period',
        width: '10%',
        slots: { customRender: 'period' }
      },
      {
        title: '所在单位',
        dataIndex: 'department',
        width: '20%',
        slots: { customRender: 'department' }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '10%',
        slots: { customRender: 'operation' }
      }
    ]
    const teachingInputColumns = ['courseName', 'teachingObject', 'period', 'department'] // 主要教学工作简历表格input控件列选项
    const teachingOption = { min: 1, max: 5 } // 教学工作简历记录配置 TODO: 等待管理员配置最大值
    const state = reactive({
      // TODO: 这里不清楚如果改变store中的dictionaryTermInfo，会不会是响应式
      teachingEditingKey: '', // 教学工作简历表中当前正在编辑的记录号
      termArray: store.state.dictionaryTermInfo,
      teachingData: props.teachingTableData, // 教学工作简历数据
      cacheTeachingData: [], // 教学工作简历缓存数据
      teachingCount: 2 // 教学工作简历数量
    })

    /**
     * 授课时间改变（教学工作简历表）
     * @method termHandleChange
     * @param {String} val 选中的值
     * @param {Object} record 当前行的数据
     */
    const termHandleChange = (val, record) => {
      const newData = [...state.teachingData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target.termName = val
      }
    }
    /**
     * 表值改变（教学工作简历表）
     * @method teachingHandleChange
     * @param {String} text 当前输入内容
     * @param {Object} record 当前行的数据
     * @param {String} col 正在编辑的列
     */
    const teachingHandleChange = (text, record, col) => {
      const newData = [...state.teachingData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target[col] = text
      }
    }
    /**
     * 触发保存状态（教学工作简历表）
     * @method teachingSave
     * @param {Object} record 当前行的数据
     */
    const teachingSave = (record) => {
      const newData = [...state.teachingData]
      const newCacheData = [...state.cacheTeachingData]
      const target = newData.filter((item) => record.key === item.key)[0]
      const targetCache = newCacheData.filter((item) => record.key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        state.teachingData = newData
        Object.assign(targetCache, target)
        state.cacheTeachingData = newCacheData
      }
      state.teachingEditingKey = ''
      emit('update:teachingTableData', state.teachingData)
    }
    /**
     * 触发编辑状态（教学工作简历表）
     * @method teachingEdit
     * @param {Object} record 当前行的数据
     */
    const teachingEdit = (record) => {
      const newData = [...state.teachingData]
      const target = newData.filter((item) => record.key === item.key)[0]
      state.teachingEditingKey = record.key
      if (target) {
        target.editable = true
      }
    }
    /**
     * 删除教学工作简历
     * @method deleteTeaching
     * @param {Object} record 当前行的记录
     */
    const deleteTeaching = (record) => {
      state.teachingData = state.teachingData.filter((item) => item.key !== record.key)
      state.teachingCount -= 1
    }
    /**
     * 添加教学工作简历
     * @method addTeaching
     */
    const addTeaching = () => {
      if (state.teachingCount < teachingOption.max) {
        const newData = defaultTeachingData(state.teachingCount)
        state.teachingData = [...state.teachingData, newData]
        state.teachingCount += 1
        emit('update:teachingTableData', state.teachingData)
      }
    }
    /**
     * 默认教学工作简历数据格式
     * @method defaultTeachingData
     * @param {Number} key 编号记录
     */
    const defaultTeachingData = (key) => {
      return {
        key: key.toString(),
        termName: '',
        courseName: '',
        teachingObject: '',
        period: '',
        department: ''
      }
    }

    for (let i = 0; i < state.teachingCount; i++) {
      state.teachingData.push(defaultTeachingData(i))
    }
    state.cacheTeachingData = state.teachingData.map((item) => ({ ...item }))
    watch(
      () => state.teachingData,
      (newVal, oldVal) => {
        state.cacheTeachingData = newVal
      }
    )

    return {
      state,
      teachingTable,
      teachingOption,
      teachingInputColumns,
      termHandleChange,
      teachingSave,
      teachingEdit,
      deleteTeaching,
      addTeaching,
      teachingHandleChange
    }
  }
}
</script>

<style lang="less" scoped></style>
