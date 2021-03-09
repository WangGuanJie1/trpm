<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title">
    <template #content>
      <a-form :label-col="labelCol" :wrapperCol="wrapperCol" style="width: 100%">
        <a-form-item label="批次名称">
          <a-input v-model:value="state.name"></a-input>
        </a-form-item>
        <a-form-item label="批次级别">
          <a-radio-group v-model:value="state.level">
            <a-radio value="smiple">一般项目</a-radio>
            <a-radio value="major">重点项目</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="项目申报时间范围">
          <a-range-picker v-model:value="state.declareTime" @change="changeTime"></a-range-picker>
        </a-form-item>
        <a-form-item label="学院评审时间范围">
          <a-range-picker v-model:value="state.collegeAuditTime"></a-range-picker>
        </a-form-item>
        <a-form-item label="学校评审时间范围">
          <a-range-picker v-model:value="state.schoolAuditTime"></a-range-picker>
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// import moment from 'moment'

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
    const router = useRouter()
    const state = reactive({
      name: '',
      level: '',
      declareTime: ref([]),
      collegeAuditTime: ref([]),
      schoolAuditTime: ref([])
    })
    const labelCol = { span: 4 }
    const wrapperCol = { span: 7 }

    /**
     * 创建批次
     * @method create
     */
    const create = () => {}

    /**
     * 退出批次创建
     */
    const quit = () => {
      router.push({ name: 'home' })
    }
    /**
     * 时间面板变更事件
     */
    const changeTime = (a, b) => {
      console.log('AAAAA', a[0], a[1])
      console.log('BBBBB', b)
    }

    return {
      state,
      labelCol,
      wrapperCol,
      create,
      quit,
      changeTime
    }
  }
}
</script>

<style lang="less" scropd></style>
