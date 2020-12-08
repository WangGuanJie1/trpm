<template>
  <BaseContent id="projectApplication" class="project-application-wrapper" :headerPageTitle="this.$route.meta.title">
    <template #content>
      <a-tabs :tabBarStyle="tabBarStyle">
        <template #tabBarExtraContent style="background-color: skyblue">
          <a-row>
            <a-col>
              <a-button type="primary" @click="onSubmit">提交</a-button>
              <a-button type="default" @click="temporaryStorage" class="ml-10">暂存</a-button>
            </a-col>
          </a-row>
        </template>
        <a-tab-pane key="1" tab="项目基本信息">
          <a-form :model="baseProjectData" :label-col="formOption.labelCol" :wrapper-col="formOption.wrapperCol">
            <a-form-item label="项目名称">
              <a-input v-model:value="baseProjectData.projectName" />
            </a-form-item>
            <a-form-item label="项目所属类别">
              <a-select v-model:value="baseProjectData._researchCategoryId" placeholder="请选择项目类别">
                <a-select-option v-for="item in researchCategoryArray" :key="item._id" :value="item._id">
                  {{ item.categoryName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="所在单位">
              <a-input v-model:value="baseProjectData.departmentName" />
            </a-form-item>
            <a-form-item label="办公电话">
              <a-input v-model:value="baseProjectData.landline" />
            </a-form-item>
            <a-form-item label="手机号码">
              <a-input v-model:value="baseProjectData.telphone" />
            </a-form-item>
            <a-form-item label="电子邮箱">
              <a-input v-model:value="baseProjectData.email" />
            </a-form-item>
            <a-form-item label="填表日期" v-show="false">
              <a-date-picker type="date" :disabled="dateWrittenDisable" :default-value="momentTime" />
            </a-form-item>
            <a-form-item label="研究年限">
              <a-input-number v-model:value="baseProjectData.researchPeriod" defaultValue="1" :min="1" :max="3" />
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="主要教学工作简历">
          <a-table
            :columns="teachingTable"
            :data-source="teachingTableData"
            bordered
            :pagination="tablePaginationOption"
          >
            <template #termName="{ text, record }">
              <div>
                <a-select
                  style="width: 100%"
                  v-if="record.editable"
                  :value="text"
                  placeholder="请选择授课时间"
                  @change="(val) => termHandleChange(val, record)"
                >
                  <a-select-option v-for="item in termArray" :key="item._id" :value="item.termName">
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
                  <a v-bind="teachingEditingKey !== '' ? { disabled: 'disabled' } : {}" @click="teachingEdit(record)">
                    编辑
                  </a>
                  <a-popconfirm
                    title="确定要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="deleteTeaching(record)"
                  >
                    <a
                      v-bind="teachingEditingKey !== '' ? { disabled: 'disabled' } : {}"
                      class="operation-button-interval"
                      :class="teachingEditingKey !== '' ? 'disabled-delete' : 'delete'"
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
            v-bind="teachingCount == teachingOption.max ? { disabled: 'disabled' } : {}"
            >添加简历
          </a-button>
        </a-tab-pane>
        <a-tab-pane key="3" tab="主要科学研究和教学研究工作简历">
          <a-table
            :columns="researchTable"
            :data-source="researchTableData"
            bordered
            :pagination="tablePaginationOption"
          >
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
                  <a v-bind="researchEditingKey !== '' ? { disabled: 'disabled' } : {}" @click="researchEdit(record)">
                    编辑
                  </a>
                  <a-popconfirm
                    title="确定要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="deleteResearch(record)"
                  >
                    <a
                      v-bind="researchEditingKey !== '' ? { disabled: 'disabled' } : {}"
                      class="operation-button-interval"
                      :class="researchEditingKey !== '' ? 'disabled-delete' : 'delete'"
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
            v-bind="researchCount == researchOption.max ? { disabled: 'disabled' } : {}"
            >添加简历</a-button
          >
        </a-tab-pane>
        <a-tab-pane key="4" tab="项目组主要成员">
          <a-table :columns="memberTable" :data-source="memberTableData" bordered :pagination="tablePaginationOption">
            <template v-for="col in memberInputColumns" #[col]="{ text, record }" :key="col">
              <div>
                <div v-if="record.editable">
                  <a-tooltip v-if="isJobCode(col)" title="请填写本校教师工号">
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
                  <a v-bind="memberEditingKey !== '' ? { disabled: 'disabled' } : {}" @click="memberEdit(record)">
                    编辑
                  </a>
                  <a-popconfirm
                    title="确定要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="deleteMember(record)"
                  >
                    <a
                      v-bind="memberEditingKey !== '' ? { disabled: 'disabled' } : {}"
                      class="operation-button-interval"
                      :class="memberEditingKey !== '' ? 'disabled-delete' : 'delete'"
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
            v-bind="memberCount == memberRankOption.max ? { disabled: 'disabled' } : {}"
            >添加成员</a-button
          >
        </a-tab-pane>
        <a-tab-pane key="5" tab="立项依据和目标">
          <a-form layout="vertical" :model="baseProjectData">
            <a-form-item label="本项目的现状与存在问题分析">
              <editor :value="baseProjectData.currentSituationAndProblemAnalysis" @input="csapa"></editor>
            </a-form-item>
            <a-form-item label="本项目的改革研究内容、主要特色和要解决的关键问题">
              <editor :value="baseProjectData.researchContentAndMainFeaturesAndKeyIssues" @input="rcamfaki"></editor>
            </a-form-item>
            <a-form-item label="本项目改革研究的预期成果">
              <editor :value="baseProjectData.expectedResults" @input="er"></editor>
            </a-form-item>
            <a-form-item label="本项目的改革研究的总体安排及进度">
              <editor :value="baseProjectData.arrangementAndProgress" @input="aap"></editor>
            </a-form-item>
            <a-form-item label="已有的工作基础、条件及前期已有工作成果">
              <editor :value="baseProjectData.workExperienceAndAchievements" @input="weaa"></editor>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </template>
  </BaseContent>
</template>
<script>
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  InputNumber,
  Tabs,
  Table,
  Tooltip,
  Popconfirm,
  Upload
} from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import Editor from '@/components/TinymceEditor/TinymceEditor'
import BaseContent from '@/views/layouts/BaseContent'

// 基本项目信息
const baseProjectData = {
  projectName: '',
  _researchCategoryId: '',
  departmentName: '',
  landline: '',
  telphone: '',
  email: '',
  dateWritten: '',
  researchPeriod: 1,
  currentSituationAndProblemAnalysis: '',
  researchContentAndMainFeaturesAndKeyIssues: '',
  expectedResults: '',
  arrangementAndProgress: '',
  workExperienceAndAchievements: ''
}

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
  { title: '佐证材料', dataIndex: 'supportingMaterials', width: '10%', slots: { customRender: 'supportingMaterials' } },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%',
    slots: { customRender: 'operation' }
  }
]
// 主要教学工作简历表格字段定义
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
    dataIndex: 'currentlyEmployedProfessionalTitle',
    width: '10%',
    slots: { customRender: 'currentlyEmployedProfessionalTitle' }
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

// 主要科研和教研工作简历表格input控件列选项
const researchInputColumns = ['projectName', 'source', 'appraisalOpinion', 'awards']
// 主要教学工作简历表格input控件列选项
const teachingInputColumns = ['courseName', 'teachingObject', 'period', 'department']
// 项目组主要成员表格input控件列选项
const memberInputColumns = [
  'jobCode',
  'name',
  'currentlyEmployedProfessionalTitle',
  'specificPositions',
  'department',
  'mainResearchArea',
  'responsibility'
]

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
    currentlyEmployedProfessionalTitle: '',
    specificPositions: '',
    department: '',
    mainResearchArea: '',
    responsibility: '',
    memberRank: key + 1
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

const memberTableData = [] // 项目组主要成员数据
const teachingTableData = [] // 主要教学工作简历数据
const researchTableData = [] // 主要科学研究和教学研究工作简历数据

export default {
  components: {
    editor: Editor,
    ARow: Row,
    ACol: Col,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputNumber: InputNumber,
    ASelect: Select,
    ASelectOption: Select.Option,
    ADatePicker: DatePicker,
    AButton: Button,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    ATable: Table,
    ATooltip: Tooltip,
    APopconfirm: Popconfirm,
    AInputSearch: Input.Search,
    AUpload: Upload,
    UploadOutlined,
    BaseContent
  },
  data() {
    return {
      projectId: null, // 项目编号，需要在created周期中从route.params获取
      dateWrittenDisable: false, // 填表日期控件是否可编辑
      tabBarStyle: {
        // textAlign: 'left'
      },
      // 表单配置
      formOption: {
        labelCol: { span: 2 },
        wrapperCol: { span: 6, offset: 0 }
      },
      memberTableData, // 成员数据
      cacheMemberTableData: [], // 成员缓存数据
      teachingTableData, // 教学工作简历数据
      cacheTeachingTableData: [], // 教学工作简历缓存数据
      researchTableData, // 教研和科研简历数据
      cacheResearchTableData: [], // 教研和科研简历缓存数据
      baseProjectData, // 基本项目数据
      memberTable, // 成员表字段
      teachingTable, // 教学工作简历表字段
      researchTable, // 教研和科研工作简历表字段
      memberInputColumns, // 成员表输入控件的字段
      teachingInputColumns, // 教学工作简历表输入控件的字段
      researchInputColumns, // 教研和科研工作简历表输入控件的字段
      memberEditingKey: '', // 成员表中当前正在编辑的记录号
      teachingEditingKey: '', // 教学工作简历表中当前正在编辑的记录号
      researchEditingKey: '', // 教研和科研工作简历表中当前正在编辑的记录号
      // 表格分页配置
      tablePaginationOption: {
        defaultPageSize: 10,
        hideOnSinglePage: true
      },
      memberCount: 2, // 成员数量
      teachingCount: 2, // 教学工作简历数量
      researchCount: 2, // 教研和科研工作简历数量
      // 成员排名控件配置 TODO：等待管理员配置最大值
      memberRankOption: {
        min: 1,
        max: 5
      },
      // 教学工作简历记录配置 TODO: 等待管理员配置最大值
      teachingOption: {
        min: 1,
        max: 5
      },
      // 教研和科研工作简历记录配置 TODO: 等待管理员配置最大值
      researchOption: {
        min: 1,
        max: 5
      }
    }
  },
  computed: {
    ...mapState({
      researchCategoryArray: (state) => state.dictionaryResearchCategoryInfo,
      termArray: (state) => state.dictionaryTermInfo
    }),
    momentTime: () => moment(new Date(), 'YYYY-MM-DD')
  },
  watch: {
    memberTableData(val, oldVal) {
      this.cacheMemberTableData = oldVal.map((item) => ({ ...item }))
    },
    teachingTableData(val, oldVal) {
      this.cacheTeachingTableData = oldVal.map((item) => ({ ...item }))
    },
    researchTableData(val, oldVal) {
      this.cacheResearchTableData = oldVal.map((item) => ({ ...item }))
    }
  },
  created() {
    this.projectId = this.$route.params.projectId
    for (let i = 0; i < this.memberCount; i++) {
      memberTableData.push(defaultMemberData(i))
    }
    for (let i = 0; i < this.teachingCount; i++) {
      teachingTableData.push(defaultTeachingData(i))
    }
    for (let i = 0; i < this.researchCount; i++) {
      researchTableData.push(defaultResearchData(i))
    }
    this.cacheMemberTableData = memberTableData.map((item) => ({ ...item }))
    this.cacheTeachingTableData = teachingTableData.map((item) => ({ ...item }))
    this.cacheResearchTableData = researchTableData.map((item) => ({ ...item }))
    this.baseProjectData.departmentName = this.$store.state.currentTeacherInfo.teacherInfo.department
  },
  methods: {
    ...mapActions(['findTeacherByJobcode']),
    /**
     * 提交项目
     * @method onSubmit
     */
    onSubmit() {
      console.log(this.baseProjectData)
    },
    /**
     * 暂存项目
     * @method temporaryStorage
     */
    temporaryStorage() {
      console.log(this.$store.state.dictionaryResearchCategoryInfo)
      console.log(this.$store.state.teacherInfo)
    },
    /**
     * 表值改变（成员表）
     * @method memberHandleChange
     * @param {String} text 当前输入内容
     * @param {Object} record 当前行的数据
     * @param {String} col 正在编辑的列
     */
    memberHandleChange(text, record, col) {
      // console.log('当前输入内容：' + text, '当前行数据：', record, '正在编辑的列：' + col)
      const newData = [...this.memberTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target[col] = text
      }
    },
    /**
     * 表值改变（教学工作简历表）
     * @method teachingHandleChange
     * @param {String} text 当前输入内容
     * @param {Object} record 当前行的数据
     * @param {String} col 正在编辑的列
     */
    teachingHandleChange(text, record, col) {
      const newData = [...this.teachingTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target[col] = text
      }
    },
    /**
     * 表值改变（主要教研和教学工作简历表）
     * @method researchHandleChange
     * @param {String} text 当前输入内容
     * @param {Object} record 当前行的数据
     * @param {String} col 正在编辑的列
     */
    researchHandleChange(text, record, col) {
      const newData = [...this.researchTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target[col] = text
      }
    },
    /**
     * 触发编辑状态（成员表）
     * @method memberEdit
     * @param {Object} record 当前行的数据
     */
    memberEdit(record) {
      const newData = [...this.memberTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      this.memberEditingKey = record.key
      if (target) {
        target.editable = true
      }
    },
    /**
     * 触发编辑状态（教学工作简历表）
     * @method teachingEdit
     * @param {Object} record 当前行的数据
     */
    teachingEdit(record) {
      const newData = [...this.teachingTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      this.teachingEditingKey = record.key
      if (target) {
        target.editable = true
      }
    },
    /**
     * 触发编辑状态（主要教学和教研工作简历表）
     * @method researchEdit
     * @param {Object} record 当前行的数据
     */
    researchEdit(record) {
      const newData = [...this.researchTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      this.researchEditingKey = record.key
      if (target) {
        target.editable = true
      }
    },
    /**
     * 触发保存状态（成员表）
     * @method memberSave
     * @param {Object} record 当前行的数据
     */
    memberSave(record) {
      const newData = [...this.memberTableData]
      const newCacheData = [...this.cacheMemberTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      const targetCache = newCacheData.filter((item) => record.key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        this.memberTableData = newData
        Object.assign(targetCache, target)
        this.cacheMemberTableData = newCacheData
      }
      this.memberEditingKey = ''
    },
    /**
     * 触发保存状态（教学工作简历表）
     * @method teachingSave
     * @param {Object} record 当前行的数据
     */
    teachingSave(record) {
      const newData = [...this.teachingTableData]
      const newCacheData = [...this.cacheTeachingTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      const targetCache = newCacheData.filter((item) => record.key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        this.teachingTableData = newData
        Object.assign(targetCache, target)
        this.cacheTeachingTableData = newCacheData
      }
      this.teachingEditingKey = ''
    },
    /**
     * 触发保存状态（主要教学和教研工作简历表）
     * @method researchSave
     * @param {Object} record 当前行的数据
     */
    researchSave(record) {
      const newData = [...this.researchTableData]
      const newCacheData = [...this.cacheResearchTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      const targetCache = newCacheData.filter((item) => record.key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        this.researchTableData = newData
        Object.assign(targetCache, target)
        this.cacheResearchTableData = newCacheData
      }
      this.researchEditingKey = ''
    },
    /**
     * 触发取消状态（成员表） TODO: 目前取消功能已禁用，原因是当在编辑状态时，改变成员排名会直接保存，在这种情况下触发取消会产生排名重复
     * @method memberCancel
     */
    memberCancel(record) {
      const newData = [...this.memberTableData]
      // const newCacheData = [...this.cacheMemberTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      this.memberEditingKey = ''
      if (target) {
        Object.assign(target, this.cacheMemberTableData.filter((item) => record.key === item.key)[0])
        delete target.editable
      }
    },
    /**
     * 生日时间更改（成员表）
     * @method birthdayHandleChange
     * @param {Object} time moment对象
     * @param {Object} record 当前行的数据
     */
    birthdayHandleChange(time, record) {
      // TODO: 这里会报错，因为时间参数非moment对象
      const newData = [...this.memberTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        if (time) {
          target.birthday = moment(time).format('YYYY-MM-DD')
        } else {
          target.birthday = ''
        }
      }
    },
    /**
     * 立项时间更改（主要教学和科研工作简历表）
     * @method establishmentTimeHandleChange
     * @param {Object} time moment对象
     * @param {Object} record 当前行的数据
     */
    establishmentTimeHandleChange(time, record) {
      // TODO: 这里会报错，因为时间参数非moment对象
      const newData = [...this.researchTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        if (time) {
          target.establishmentTime = moment(time).format('YYYY-MM-DD')
        } else {
          target.establishmentTime = ''
        }
      }
    },
    /**
     * 授课时间改变（教学工作简历表）
     * @method termHandleChange
     * @param {String} val 选中的值
     * @param {Object} record 当前行的数据
     */
    termHandleChange(val, record) {
      const newData = [...this.teachingTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target.termName = val
      }
    },
    /**
     * 成员排名更改（成员表） TODO: 该方法可能使排名混乱，逻辑待优化
     * @method memberRankHandleChange
     * @param {Number} number 新的数值
     * @param {Number} text 旧的数值
     * @param {Object} record 当前行的数据
     */
    memberRankHandleChange(number, text, record) {
      const newData = [...this.memberTableData]
      const sameMemberRank = newData.find((item) => number === item.memberRank)
      const target = newData.filter((item) => record.key === item.key)[0]
      if (number <= this.memberCount) {
        if (sameMemberRank) sameMemberRank.memberRank = text
        if (target) target.memberRank = number
      }
    },
    /**
     * 本项目的现状与存在问题分析（内容更改）
     * @method csapa
     * @param {String} e 改变后的内容
     */
    csapa(e) {
      this.baseProjectData.currentSituationAndProblemAnalysis = e
    },
    /**
     * 本项目的改革研究内容、主要特色和要解决的关键问题（内容更改）
     * @method csapa
     * @param {String} e 改变后的内容
     */
    rcamfaki(e) {
      this.baseProjectData.researchContentAndMainFeaturesAndKeyIssues = e
    },
    /**
     * 本项目改革研究的预期成果（内容更改）
     * @method csapa
     * @param {String} e 改变后的内容
     */
    er(e) {
      this.baseProjectData.expectedResults = e
    },
    /**
     * 本项目的改革研究的总体安排及进度（内容更改）
     * @method csapa
     * @param {String} e 改变后的内容
     */
    aap(e) {
      this.baseProjectData.arrangementAndProgress = e
    },
    /**
     * 已有的工作基础、条件及前期已有工作成果（内容更改）
     * @method csapa
     * @param {String} e 改变后的内容
     */
    weaa(e) {
      this.baseProjectData.workExperienceAndAchievements = e
    },
    /**
     * 是否为教师工号字段
     * @method isJobCode
     * @param {String} key 字段名称
     */
    isJobCode: (key) => {
      return key === 'jobCode' ? 1 : 0
    },
    /**
     * 添加成员
     * @method addMember
     */
    addMember() {
      const { memberCount, memberTableData } = this
      if (memberCount < this.memberRankOption.max) {
        const newData = defaultMemberData(memberCount)
        this.memberTableData = [...memberTableData, newData]
        this.memberCount = memberCount + 1
      }
    },
    /**
     * 添加教学工作简历
     * @method addTeaching
     */
    addTeaching() {
      const { teachingCount, teachingTableData } = this
      if (teachingCount < this.teachingOption.max) {
        const newData = defaultTeachingData(teachingCount)
        this.teachingTableData = [...teachingTableData, newData]
        this.teachingCount = teachingCount + 1
      }
    },
    /**
     * 添加主要教学和教研工作简历
     * @method addResearch
     */
    addResearch() {
      const { researchCount, researchTableData } = this
      if (researchCount < this.researchOption.max) {
        const newData = defaultResearchData(researchCount)
        this.researchTableData = [...researchTableData, newData]
        this.researchCount = researchCount + 1
      }
    },
    /**
     * 删除成员
     * @method deleteMember
     * @param record 当前行的记录
     */
    deleteMember(record) {
      const { memberCount, memberTableData } = this
      this.memberTableData = memberTableData.filter((item) => {
        const itemKey = item.key
        if (record.memberRank < item.memberRank) {
          item.key = (item.key - 1).toString()
          --item.memberRank
        }
        return itemKey !== record.key
      })
      this.memberCount = memberCount - 1
    },
    /**
     * 删除教学工作简历
     * @method deleteTeaching
     * @param {Object} record 当前行的记录
     */
    deleteTeaching(record) {
      const { teachingCount, teachingTableData } = this
      this.teachingTableData = teachingTableData.filter((item) => item.key !== record.key)
      this.teachingCount = teachingCount - 1
    },
    /**
     * 删除主要教学和教研工作简历
     * @method deleteResearch
     * @param {Object} record 当前行的记录
     */
    deleteResearch(record) {
      const { researchCount, researchTableData } = this
      this.researchTableData = researchTableData.filter((item) => item.key !== record.key)
      this.researchCount = researchCount - 1
    },
    /**
     * 根据工号查找教师信息 TODO: 没有排重功能
     * @method searchTeacherInfo
     * @param {String} jobCode 工号
     * @param {Object} record 当前行的数据
     */
    searchTeacherInfo(jobCode, record) {
      const newData = [...this.memberTableData]
      // const cacheData = [...this.cacheMemberTableData]
      // const findInCacheData = cacheData.filter((item) => jobCode === item.jobCode)[0]

      // if (findInCacheData) {
      //   return
      // }
      this.findTeacherByJobcode({ jobCode: jobCode }).then((res, err) => {
        if (res.code === 200) {
          const teacherInfo = res.data.teacherInfo
          const target = newData.filter((item) => record.key === item.key)[0]
          if (target) {
            const { name, birthday, currentlyEmployedProfessionalTitle, specificPositions, department } = teacherInfo
            target.name = name
            target.birthday = birthday
            target.currentlyEmployedProfessionalTitle = currentlyEmployedProfessionalTitle
            target.specificPositions = specificPositions
            target.department = department
          }
        }
      })
    },
    handleRemoveSupportingMaterials(e, record) {
      console.log(789123)
      console.log(e)
      console.log(789123)
      const newData = [...this.researchTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target.supportingMaterials = []
      }
    },

    beforeUploadSupportingMaterials(file, record) {
      console.log(file)
      const newData = [...this.researchTableData]
      const target = newData.filter((item) => record.key === item.key)[0]
      if (target) {
        target.supportingMaterials[0] = file
        console.log(target)
      }
      return false
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
