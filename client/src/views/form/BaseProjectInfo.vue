<template>
  <a-form :model:value="state.baseData" :label-col="formOption.labelCol" :wrapper-col="formOption.wrapperCol">
    <a-form-item label="项目名称">
      <a-input v-model:value="state.baseData.projectName" @input="updateBaseProjectData" />
    </a-form-item>
    <a-form-item label="项目所属类别">
      <a-select
        v-model:value="state.baseData._researchCategoryId"
        @change="updateBaseProjectData"
        placeholder="请选择项目类别"
      >
        <a-select-option v-for="item in state.researchCategoryArray" :key="item._id" :value="item._id">
          {{ item.categoryName }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="所在单位">
      <a-input v-model:value="state.baseData.department" @input="updateBaseProjectData" />
    </a-form-item>
    <a-form-item label="办公电话">
      <a-input v-model:value="state.baseData.landline" @input="updateBaseProjectData" />
    </a-form-item>
    <a-form-item label="手机号码">
      <a-input v-model:value="state.baseData.telphone" @input="updateBaseProjectData" />
    </a-form-item>
    <a-form-item label="电子邮箱">
      <a-input v-model:value="state.baseData.email" @input="(e) => updateBaseProjectData" />
    </a-form-item>
    <a-form-item label="填表日期" v-show="false">
      <a-date-picker type="date" :disabled="dateWrittenDisable" :default-value="state.momentTime" />
    </a-form-item>
    <a-form-item label="研究年限">
      <a-input-number
        v-model:value="state.baseData.researchPeriod"
        @change="(e) => updateBaseProjectData"
        defaultValue="1"
        :min="minYear"
        :max="maxYear"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive, ref } from 'vue'
import { Form, Input, InputNumber, Select } from 'ant-design-vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputNumber: InputNumber,
    ASelect: Select,
    ASelectOption: Select.Option
  },
  props: ['baseProjectData'],
  setup(props, { emit }) {
    const store = useStore()
    // 表单配置
    const formOption = {
      labelCol: { span: 2 },
      wrapperCol: { span: 6, offset: 0 }
    }
    const dateWrittenDisable = ref(false) // 填表日期控件是否可编辑
    const minYear = ref(1) // 最小研究年限
    const maxYear = ref(3) // 最大研究年限
    const state = reactive({
      // TODO: 这里不清楚如果改变store中的dictionaryResearchCategoryInfo，会不会是响应式
      researchCategoryArray: store.state.dictionaryResearchCategoryInfo,
      baseData: props.baseProjectData,
      momentTime: () => moment(new Date(), 'YYYY-MM-DD')
    })

    /**
     * 更新父组件中的dateBaseProjectData
     * @method updateBaseProjectData
     */
    const updateBaseProjectData = () => {
      emit('update:baseProjectData', state.baseData)
    }

    // TODO: 这里不清楚如果改变store中的currentTeacherInfo.teacherInfo，会不会是响应式
    state.baseData.department = store.state.currentTeacherInfo.teacherInfo.department

    return {
      state,
      formOption,
      updateBaseProjectData,
      dateWrittenDisable,
      minYear,
      maxYear
    }
  }
}
</script>

<style lang="less" scoped></style>
