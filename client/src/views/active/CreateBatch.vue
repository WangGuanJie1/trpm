<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title">
    <template #content>
      <a-form :model="state" :label-col="labelCol" :wrapperCol="wrapperCol" :rules="rules" style="width: 100%">
        <a-form-item label="批次名称" name="name">
          <a-input v-model:value="state.name"></a-input>
        </a-form-item>
        <a-form-item label="批次级别" name="level">
          <a-radio-group v-model:value="state.level">
            <a-radio value="smiple">一般项目</a-radio>
            <a-radio value="major">重点项目</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="项目申报时间范围" name="de">
          <a-range-picker
            :format="format"
            v-model:value="state.deTimeRange"
            :disabled-date="deDisabledDate"
            @change="(dates, dateStrings) => changeTime(dates, dateStrings, 'de')"
          ></a-range-picker>
        </a-form-item>
        <a-form-item label="学院评审时间范围" name="co">
          <a-range-picker
            :disabled="state.deTimeRange.length === 0"
            :format="format"
            v-model:value="state.coTimeRange"
            @change="(dates, dateStrings) => changeTime(dates, dateStrings, 'co')"
          ></a-range-picker>
        </a-form-item>
        <a-form-item label="学校评审时间范围" name="sc">
          <a-range-picker
            :disabled="state.coTimeRange.length === 0"
            :format="format"
            v-model:value="state.scTimeRange"
            @change="(dates, dateStrings) => changeTime(dates, dateStrings, 'sc')"
          ></a-range-picker>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="create">确认</a-button>
            <a-button @click="quit">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </template>
  </BaseContentLayout>
</template>

<script>
import { Form, Input, Radio, DatePicker, Space, Button } from 'ant-design-vue'
import BaseContentLayout from '@/views/layouts/BaseContentLayout'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  components: {
    BaseContentLayout,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ARangePicker: DatePicker.RangePicker,
    ASpace: Space,
    AButton: Button
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      name: '',
      level: '', // enum:['simple','major']
      deInTi: '', // 项目申报起始时间(Y-M-D)
      deClTi: '', // 项目申报结束时间(Y-M-D)
      coAuInTi: '', // 学院评审开始时间(Y-M-D)
      coAuClTi: '', // 学院评审结束时间(Y-M-D)
      scAuInTi: '', // 学校评审开始时间(Y-M-D)
      scAuClTi: '', // 学校评审结束时间(Y-M-D)
      handler: store.state.currentTeacherInfo.teacherInfo.jobCode, // 当前操作教师
      deTimeRange: [], // 项目申报时间范围（moment）
      coTimeRange: [], // 学院评审时间范围（moment）
      scTimeRange: [] // 学校评审时间范围（moment）
    })
    const labelCol = { span: 4 }
    const wrapperCol = { span: 6 }
    const format = 'YYYY-MM-DD'
    // 项目申报时间自定义验证规则
    const deValidatePass = async () => {
      return state.deTimeRange.length === 0 ? Promise.reject(new Error('请设置项目申报时间范围')) : Promise.resolve()
    }
    // 项目申报时间自定义验证规则
    const coValidatePass = async () => {
      return state.coTimeRange.length === 0 ? Promise.reject(new Error('请设置学院评审时间范围')) : Promise.resolve()
    }
    // 项目申报时间自定义验证规则
    const scValidatePass = async () => {
      return state.scTimeRange.length === 0 ? Promise.reject(new Error('请设置学校评审时间范围')) : Promise.resolve()
    }
    const rules = {
      name: [{ required: true, message: '请输入批次名称 ', trigger: 'blur' }],
      level: [{ required: true, message: '请选择批次级别 ', trigger: 'change' }],
      de: [{ validator: deValidatePass, trigger: 'blur' }],
      co: [{ validator: coValidatePass, trigger: 'blur' }],
      sc: [{ validator: scValidatePass, trigger: 'blur' }]
    }

    /**
     * 项目申报时间禁用时间范围（当日之前全部禁止）
     * @method deDisabledDate
     */
    const deDisabledDate = (current) => {
      return current && current < moment().endOf('day')
    }

    /**
     * 时间面板变更事件
     * @method changeTime
     * @param {String[]} dates 时间数组（moment形式）
     * @param {String[]} dateStrings 时间数组（Y-M-D）
     * @param {String} timeName 操作的时间范围名称
     */
    const changeTime = (dates, dateStrings, timeName) => {
      console.log(dates, dateStrings)
      console.log(typeof moment().locale('zh-cn').format('YYYY-MM-DD'))
      console.log(moment())
      // const iniationTime = dateStrings[0] // 初始时间
      // const closeTime = dateStrings[1] // 关闭时间
      const minMillisecond = 24 * 60 * 1000 // 始末时间最小的毫秒数，用于检测时间范围是否符合时间设定标准

      // 将单个日期转换为毫秒数
      const changeMillisecond = (dateString) => Date.parse(new Date(dateString))
      console.log(minMillisecond, changeMillisecond)
      // 改变项目申报时间的事件
      const deChangeEvent = () => {
        // 清空学院评审和学校评审的时间范围，让管理员重新设置
        state.coTimeRange = []
        state.scTimeRange = []
      }
      // 改变学院评审时间的事件
      const coChangeEvent = () => {
        // 清空学校评审的时间范围，让管理员重新设置
        state.scTimeRange = []
      }
      // 改变学校评审时间的
      const scChangeEvent = () => {}

      const actions = {
        de: deChangeEvent,
        co: coChangeEvent,
        sc: scChangeEvent
      }
      actions[timeName]()
    }

    /**
     * 创建批次
     * @method create
     */
    const create = () => {
      store.dispatch('createBatch', state).then((doc, err) => {
        console.log(doc)
      })
    }

    /**
     * 退出批次创建
     */
    const quit = () => {
      router.push({ name: 'home' })
    }
    return {
      state,
      labelCol,
      wrapperCol,
      create,
      quit,
      changeTime,
      format,
      deDisabledDate,
      rules
    }
  }
}
</script>

<style lang="less" scropd></style>
