<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title">
    <template #content>
      <a-form :model="state" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" style="width: 100%">
        <a-form-item label="批次名称" name="name" v-bind="validateInfos.name">
          <a-input v-model:value="state.name"></a-input>
        </a-form-item>
        <a-form-item label="批次级别" name="level" v-bind="validateInfos.level">
          <a-radio-group v-model:value="state.level">
            <a-radio value="simple">一般项目</a-radio>
            <a-radio value="major">重点项目</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="项目申报时间范围" name="de" v-bind="validateInfos.de">
          <a-range-picker
            :format="format"
            v-model:value="state.deTimeRange"
            :disabled-date="deDisabledDate"
            @change="(dates, dateStrings) => changeTime(dates, dateStrings, 'de')"
          ></a-range-picker>
        </a-form-item>
        <a-form-item label="学院评审时间范围" name="co" v-bind="validateInfos.co">
          <a-range-picker
            :disabled="state.deTimeRange.length === 0"
            :format="format"
            v-model:value="state.coTimeRange"
            :disabled-date="coDisabledDate"
            @change="(dates, dateStrings) => changeTime(dates, dateStrings, 'co')"
          ></a-range-picker>
        </a-form-item>
        <a-form-item label="学校评审时间范围" name="sc" v-bind="validateInfos.sc">
          <a-range-picker
            :disabled="state.coTimeRange.length === 0"
            :format="format"
            v-model:value="state.scTimeRange"
            :disabled-date="scDisabledDate"
            @change="(dates, dateStrings) => changeTime(dates, dateStrings, 'sc')"
          ></a-range-picker>
        </a-form-item>
        <a-form-item :wrapper-col="btnWrapperCol">
          <a-space>
            <a-button type="primary" @click="create">确认</a-button>
            <a-button @click="resetFields">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </template>
  </BaseContentLayout>
</template>

<script>
import { Form, Input, Radio, DatePicker, Space, Button } from 'ant-design-vue'
import { useForm } from '@ant-design-vue/use'
import BaseContentLayout from '@/views/layouts/BaseContentLayout'
import { reactive, toRaw } from 'vue'
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
    // form/form-item 布局
    const labelCol = { span: 4 }
    const wrapperCol = { span: 6 }
    const btnWrapperCol = {
      span: wrapperCol.span,
      offset: labelCol.span
    }
    const format = 'YYYY-MM-DD' // 时间控件格式
    // 项目申报时间自定义验证规则
    const deValidatePass = async () => {
      return state.deTimeRange.length === 0 ? Promise.reject(new Error('请设置项目申报时间范围')) : Promise.resolve()
    }
    // 项目申报时间自定义验证规则
    const coValidatePass = async () => {
      if (state.deTimeRange.length === 0) {
        return Promise.resolve()
      } else {
        return state.coTimeRange.length === 0 ? Promise.reject(new Error('请设置学院评审时间范围')) : Promise.resolve()
      }
    }
    // 项目申报时间自定义验证规则
    const scValidatePass = async () => {
      if (state.coTimeRange.length === 0) {
        return Promise.resolve()
      } else {
        return state.scTimeRange.length === 0 ? Promise.reject(new Error('请设置学校评审时间范围')) : Promise.resolve()
      }
    }
    const rules = reactive({
      name: [{ required: true, message: '请输入批次名称', trigger: 'change' }],
      level: [{ required: true, message: '请选择批次级别', trigger: 'change' }],
      de: [{ required: true, validator: deValidatePass, trigger: 'change' }],
      co: [{ required: true, validator: coValidatePass, trigger: 'change' }],
      sc: [{ required: true, validator: scValidatePass, trigger: 'change' }]
    })
    const { resetFields, validate, validateInfos } = useForm(state, rules)
    /**
     * 项目申报时间禁用时间范围（当日之前全部禁止）
     * @method deDisabledDate
     */
    const deDisabledDate = (current) => {
      return current && current < moment().endOf('day')
    }
    /**
     * 学院评审禁用时间范围（起始时间需要在项目申报关闭时间之后）
     * @method coDisableDate
     */
    const coDisabledDate = (current) => {
      return current && current < state.deTimeRange[1].endOf('day')
    }
    /**
     * 学校评审禁用时间范围（起始时间需要在学院评审关闭时间之后）
     * @method scDisableDate
     */
    const scDisabledDate = (current) => {
      return current && current < state.coTimeRange[1].endOf('day')
    }

    /**
     * 时间面板变更事件
     * @method changeTime
     * @param {String[]} dates 时间数组（moment形式）
     * @param {String[]} dateStrings 时间数组（Y-M-D）
     * @param {String} timeName 操作的时间范围名称
     */
    const changeTime = (dates, dateStrings, timeName) => {
      // 重置起始时间为0:00，关闭时间为23:59
      const resetDates = (dates) => {
        if (dates.length !== 0) {
          dates[0] = dates[0].startOf('day')
          dates[1] = dates[1].endOf('day')
          return dates
        } else {
          return []
        }
      }
      // 改变项目申报时间的事件
      const deChangeEvent = () => {
        state.deTimeRange = resetDates(dates)
        // 清空学院评审和学校评审的时间范围，让管理员重新设置
        state.coTimeRange = []
        state.scTimeRange = []
      }
      // 改变学院评审时间的事件
      const coChangeEvent = () => {
        state.coTimeRange = resetDates(dates)
        // 清空学校评审的时间范围，让管理员重新设置
        state.scTimeRange = []
      }
      // 改变学校评审时间的
      const scChangeEvent = () => {
        state.scTimeRange = resetDates(dates)
      }

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
      // 表单判空校验
      validate()
        .then(() => {
          // 将moment格式时间转换为字符串格式
          const formatYearMonthDay = (momentTime) => {
            return momentTime.format()
          }
          state.deInTi = formatYearMonthDay(state.deTimeRange[0])
          state.deClTi = formatYearMonthDay(state.deTimeRange[1])
          state.coAuInTi = formatYearMonthDay(state.coTimeRange[0])
          state.coAuClTi = formatYearMonthDay(state.coTimeRange[1])
          state.scAuInTi = formatYearMonthDay(state.scTimeRange[0])
          state.scAuClTi = formatYearMonthDay(state.scTimeRange[1])
          console.log(toRaw(state))
          store.dispatch('createBatch', state).then((doc, err) => {
            console.log(doc)
          })
        })
        .catch(() => {})
    }

    return {
      state,
      labelCol,
      wrapperCol,
      btnWrapperCol,
      create,
      changeTime,
      format,
      deDisabledDate,
      coDisabledDate,
      scDisabledDate,
      rules,
      resetFields,
      validate,
      validateInfos
    }
  }
}
</script>

<style lang="less" scropd></style>
