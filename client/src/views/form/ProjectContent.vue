<template>
  <a-form layout="vertical" :model="state.contentData">
    <a-form-item label="本项目的现状与存在问题分析">
      <editor :value="state.contentData.cuSiAnPrAn" @input="cuSiAnPrAn"></editor>
    </a-form-item>
    <a-form-item label="本项目的改革研究内容、主要特色和要解决的关键问题">
      <editor :value="state.contentData.reCoAnMaFeAnKeIs" @input="reCoAnMaFeAnKeIs"></editor>
    </a-form-item>
    <a-form-item label="本项目改革研究的预期成果">
      <editor :value="state.contentData.expectedResults" @input="expectedResults"></editor>
    </a-form-item>
    <a-form-item label="本项目的改革研究的总体安排及进度">
      <editor :value="state.contentData.arAnPr" @input="arAnPr"></editor>
    </a-form-item>
    <a-form-item label="已有的工作基础、条件及前期已有工作成果">
      <editor :value="state.contentData.woExAnAc" @input="woExAnAc"></editor>
    </a-form-item>
  </a-form>
</template>

<script>
import { Form } from 'ant-design-vue'
import Editor from '@/components/TinymceEditor/TinymceEditor'
import { reactive } from 'vue'

export default {
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    editor: Editor
  },
  props: ['projectContentData'],
  setup(props, { emit }) {
    const state = reactive({
      contentData: props.projectContentData
    })

    /**
     * 组件通信，将项目文本内容信息返回
     * @method emitContent
     */
    const emitContent = () => {
      emit('update:projectContentData', state.contentData)
    }
    /**
     * 本项目的现状与存在问题分析（内容更改）
     * @method cuSiAnPrAn
     * @param {String} e 改变后的内容
     */
    const cuSiAnPrAn = (e) => {
      state.contentData.cuSiAnPrAn = e
      emitContent()
    }
    /**
     * 本项目的改革研究内容、主要特色和要解决的关键问题（内容更改）
     * @method reCoAnMaFeAnKeIs
     * @param {String} e 改变后的内容
     */
    const reCoAnMaFeAnKeIs = (e) => {
      state.contentData.reCoAnMaFeAnKeIs = e
      emitContent()
    }
    /**
     * 本项目改革研究的预期成果（内容更改）
     * @method expectedResults
     * @param {String} e 改变后的内容
     */
    const expectedResults = (e) => {
      state.contentData.expectedResults = e
      emitContent()
    }
    /**
     * 本项目的改革研究的总体安排及进度（内容更改）
     * @method arAnPr
     * @param {String} e 改变后的内容
     */
    const arAnPr = (e) => {
      state.contentData.arAnPr = e
      emitContent()
    }
    /**
     * 已有的工作基础、条件及前期已有工作成果（内容更改）
     * @method woExAnAc
     * @param {String} e 改变后的内容
     */
    const woExAnAc = (e) => {
      state.contentData.woExAnAc = e
      emitContent()
    }

    return {
      state,
      cuSiAnPrAn,
      reCoAnMaFeAnKeIs,
      expectedResults,
      arAnPr,
      woExAnAc
    }
  }
}
</script>

<style lang="less" scoped></style>
