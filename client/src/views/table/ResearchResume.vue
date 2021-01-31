<template>
  <a-table :columns="researchTable" :data-source="state.researchData" bordered :pagination="tablePaginationOption">
    <template #establishmentTime="{ text, record }">
      <div>
        <a-date-picker
          v-if="record.editable"
          type="date"
          :value="text"
          @change="(e) => establishmentTimeHandleChange(e, record)"
        ></a-date-picker>
        <span v-else>
          {{ text }}
        </span>
      </div>
    </template>
    <template v-for="col in researchInputColumns" #[col]="{ text, record }" :key="col">
      <div>
        <a-input
          v-if="record.editable"
          :value="text"
          @change="(e) => researchHandleChange(e.target.value, record, col)"
        />
        <span v-else>
          {{ text }}
        </span>
      </div>
    </template>
    <template #supportingMaterials="{ record }">
      <div>
        <a-upload
          v-if="record.editable"
          :fileList="record.supportingMaterials"
          :remove="(e) => handleRemoveSupportingMaterials(e, record)"
          :beforeUpload="(file) => beforeUploadSupportingMaterials(file, record)"
        >
          <a-button> <upload-outlined />佐证材料 </a-button>
        </a-upload>
        <div v-else>
          <span v-if="record.supportingMaterials[0]">{{ record.supportingMaterials[0].name }}</span>
          <span v-else></span>
        </div>
      </div>
    </template>
    <template #operation="{ record }">
      <div>
        <span v-if="record.editable">
          <a @click="researchSave(record)">保存</a>
          <!-- <a @click="memberCancel(record)" class="operation-button-interval">取消</a> -->
        </span>
        <span v-else>
          <a v-bind="state.researchEditingKey !== '' ? { disabled: 'disabled' } : {}" @click="researchEdit(record)">
            编辑
          </a>
          <a-popconfirm title="确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="deleteResearch(record)">
            <a
              v-bind="state.researchEditingKey !== '' ? { disabled: 'disabled' } : {}"
              class="operation-button-interval"
              :class="state.researchEditingKey !== '' ? 'disabled-delete' : 'delete'"
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
    @click="addResearch"
    v-bind="state.researchCount == researchOption.max ? { disabled: 'disabled' } : {}"
    >添加简历</a-button
  >
</template>

<script>
import { Table, DatePicker, Input, Upload, Button, Popconfirm } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  components: {
    ATable: Table,
    ADatePicker: DatePicker,
    AInput: Input,
    AUpload: Upload,
    AButton: Button,
    APopconfirm: Popconfirm,
    UploadOutlined
  },
  props: ['researchTableData', 'tablePaginationOption'],
  setup(props, { emit }) {
    const store = useStore()
    // 主要科研和教研工作简历表格字段定义
    const researchTable = [
      {
        title: '立项时间',
        dataIndex: 'establishmentTime',
        width: '10%',
        slots: { customRender: 'establishmentTime' }
      },
      {
        title: '项目名称',
        dataIndex: 'projectName',
        width: '20%',
        slots: { customRender: 'projectName' }
      },
      {
        title: '项目来源',
        dataIndex: 'source',
        width: '20%',
        slots: { customRender: 'source' }
      },
      {
        title: '主要鉴定意见',
        dataIndex: 'appraisalOpinion',
        width: '20%',
        slots: { customRender: 'appraisalOpinion' }
      },
      {
        title: '获奖情况',
        dataIndex: 'awards',
        width: '10%',
        slots: { customRender: 'awards' }
      },
      {
        title: '佐证材料',
        dataIndex: 'supportingMaterials',
        width: '10%',
        slots: { customRender: 'supportingMaterials' }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '10%',
        slots: { customRender: 'operation' }
      }
    ]
    const researchInputColumns = ['projectName', 'source', 'appraisalOpinion', 'awards'] // 主要科研和教研工作简历表格input控件列选项
    const researchOption = { min: 1, max: 5 } // 教研和科研工作简历记录配置 TODO: 等待管理员配置最大值
    const state = reactive({
      researchEditingKey: '', // 教研和科研工作简历表中当前正在编辑的记录号
      researchData: props.researchTableData, // 教研和科研简历数据
      cacheResearchData: [], // 教研和科研简历缓存数据
      researchCount: 2, // 教研和科研工作简历数量
      teacherProjectInfo: store.state.teacherProjectInfo // 当前登录教师的项目信息
    })

    /**
     * 立项时间更改（主要教学和科研工作简历表）
     * @method establishmentTimeHandleChange
     * @param {Object} time moment对象
     * @param {Object} record 当前行的数据
     */
    const establishmentTimeHandleChange = (time, record) => {
      // TODO: 这里会报错，因为时间参数非moment对象
      const newData = [...state.researchData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        if (time) {
          target.establishmentTime = moment(time).format('YYYY-MM-DD')
        } else {
          target.establishmentTime = ''
        }
      }
    }
    /**
     * 表值改变（主要教研和教学工作简历表）
     * @method researchHandleChange
     * @param {String} text 当前输入内容
     * @param {Object} record 当前行的数据
     * @param {String} col 正在编辑的列
     */
    const researchHandleChange = (text, record, col) => {
      const newData = [...state.researchData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target[col] = text
      }
    }
    /**
     * 删除佐证材料
     * @method handleRemoveSupportingMaterials
     * @param {} e TODO: 待删除
     * @param {Object} record 当前行的数据
     */
    const handleRemoveSupportingMaterials = (e, record) => {
      console.log(789123)
      console.log(e)
      console.log(789123)
      const newData = [...state.researchData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target.supportingMaterials = []
      }
    }
    /**
     * 佐证材料限制
     * @method beforeUploadSupportingMaterials
     * @param {File} file 需要上传的文件
     * @param {Object} record 当前行的数据
     */
    const beforeUploadSupportingMaterials = (file, record) => {
      console.log(file)
      const newData = [...state.researchData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target.supportingMaterials[0] = file
        console.log(target)
      }
      return false
    }
    /**
     * 触发保存状态（主要教学和教研工作简历表）
     * @method researchSave
     * @param {Object} record 当前行的数据
     */
    const researchSave = (record) => {
      const newData = [...state.researchData]
      const newCacheData = [...state.cacheResearchData]
      const target = newData.filter((item) => record.key === item.key)[0]
      const targetCache = newCacheData.filter((item) => record.key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        state.researchData = newData
        Object.assign(targetCache, target)
        state.cacheResearchData = newCacheData
      }
      state.researchEditingKey = ''
      emit('update:researchTableData', state.researchData)
    }
    /**
     * 触发编辑状态（主要教学和教研工作简历表）
     * @method researchEdit
     * @param {Object} record 当前行的数据
     */
    const researchEdit = (record) => {
      const newData = [...state.researchData]
      const target = newData.filter((item) => record.key === item.key)[0]
      state.researchEditingKey = record.key
      if (target) {
        target.editable = true
      }
    }
    /**
     * 删除主要教学和教研工作简历
     * @method deleteResearch
     * @param {Object} record 当前行的记录
     */
    const deleteResearch = (record) => {
      state.researchData = state.researchData.filter((item) => item.key !== record.key)
      state.researchCount -= 1
    }

    /**
     * 默认教研和科研工作简历数据格式
     * @method defaultResearchData
     * @param {Number} key 编号标记
     */
    const defaultResearchData = (key) => {
      return {
        key: key.toString(),
        establishmentTime: '',
        projectName: '',
        source: '',
        appraisalOpinion: '',
        awards: '',
        supportingMaterials: []
      }
    }
    /**
     * 添加主要教学和教研工作简历
     * @method addResearch
     */
    const addResearch = () => {
      if (state.researchCount < researchOption.max) {
        const newData = defaultResearchData(state.researchCount)
        state.researchData = [...state.researchData, newData]
        state.researchCount += 1
        emit('update:researchTableData', state.researchData)
      }
    }

    for (let i = 0; i < state.researchCount; i++) {
      state.researchData.push(defaultResearchData(i))
    }
    state.cacheResearchData = state.researchData.map((item) => ({ ...item }))
    watch(
      () => state.researchData,
      (newVal, oldVal) => {
        state.cacheResearchData = newVal
      }
    )

    return {
      state,
      researchTable,
      researchInputColumns,
      researchOption,
      establishmentTimeHandleChange,
      handleRemoveSupportingMaterials,
      beforeUploadSupportingMaterials,
      researchSave,
      researchEdit,
      deleteResearch,
      researchHandleChange,
      addResearch
    }
  }
}
</script>

<style lang="less" scoped></style>
