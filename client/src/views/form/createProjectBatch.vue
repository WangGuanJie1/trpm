<template>
  <a-row>
    <a-col>
      <a-form :model="projectBatchData" :label-col="formOption.labelCol" :wrapper-col="formOption.wrapperCol">
        <a-form-item label="批次名称">
          <a-input v-model:value="projectBatchData.projectBatchName"></a-input>
        </a-form-item>
        <a-form-item label="申报始末时间">
          <a-date-picker
            v-model:value="projectBatchData.apInTi"
            :disabled-date="(startTime) => disabledStartDate(startTime, 'application')"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="申报开始时间"
            @change="(time, timeString) => timeHandleChange(time, timeString, 'apInTi')"
          />
          <a-date-picker
            v-model:value="projectBatchData.apClTi"
            :disabled-date="(endTime) => disabledEndDate(endTime, 'application')"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="申报结束时间"
            @change="(time, timeString) => timeHandleChange(time, timeString, 'apClTi')"
          />
        </a-form-item>
        <a-form-item label="中期检查始末时间">
          <a-date-picker
            v-model:value="projectBatchData.meTeInInTi"
            :disabled-date="(startTime) => disabledStartDate(startTime, 'medium')"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="中期检查开始时间"
            @change="(time, timeString) => timeHandleChange(time, timeString, 'meTeInInTi')"
          />
          <a-date-picker
            v-model:value="projectBatchData.meTeInClTi"
            :disabled-date="(endTime) => disabledEndDate(endTime, 'medium')"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="中期检查结束时间"
            @change="(time, timeString) => timeHandleChange(time, timeString, 'meTeInClTi')"
          />
        </a-form-item>
        <a-form-item label="结题始末时间">
          <a-date-picker
            v-model:value="projectBatchData.fiInTi"
            :disabled-date="(startTime) => disabledStartDate(startTime, 'finalize')"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="结题开始时间"
            @change="(time, timeString) => timeHandleChange(time, timeString, 'fiInTi')"
          />
          <a-date-picker
            v-model:value="projectBatchData.fiClTi"
            :disabled-date="(endTime) => disabledEndDate(endTime, 'finalize')"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="结题结束时间"
            @change="(time, timeString) => timeHandleChange(time, timeString, 'fiClTi')"
          />
        </a-form-item>
        <a-form-item label="允许主持人主持最多项目数量">
          <a-input-number
            v-model:value="projectBatchData.hoMaNuOfHoPr"
            :min="inputNumberOption.min"
            @blur="inputNumberVerify('hmnohp')"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="允许主持人参与最多项目数量">
          <a-input-number
            v-model:value="projectBatchData.hoMaNuOfPaPr"
            :min="inputNumberOption.min"
            @blur="inputNumberVerify('hmnopp')"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="允许参与者主持最多项目数量">
          <a-input-number
            v-model:value="projectBatchData.paMaNuOfHoPr"
            :min="inputNumberOption.min"
            @blur="inputNumberVerify('pmnohp')"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="允许参与者参与最多项目数量">
          <a-input-number
            v-model:value="projectBatchData.paMaNuOfPaPr"
            :min="inputNumberOption.min"
            @blur="inputNumberVerify('pmnopp')"
          ></a-input-number>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="create">确认</a-button>
          <a-button>取消</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col, Form, Input, DatePicker, InputNumber, Button } from 'ant-design-vue'
import moment from 'moment'
import { mapActions } from 'vuex'

const projectBatchData = {
  projectBatchName: '',
  apInTi: null,
  apClTi: null,
  meTeInInTi: null,
  meTeInClTi: null,
  fiInTi: null,
  fiClTi: null,
  hoMaNuOfHoPr: 1,
  hoMaNuOfPaPr: 1,
  paMaNuOfHoPr: 1,
  paMaNuOfPaPr: 1
}

export default {
  components: {
    ARow: Row,
    ACol: Col,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ADatePicker: DatePicker,
    AInputNumber: InputNumber,
    AButton: Button
  },
  data() {
    return {
      // 表单配置
      formOption: {
        labelCol: { span: 2 },
        wrapperCol: { span: 6, offset: 0 }
      },
      // 数字输入框配置
      inputNumberOption: {
        min: 1
      },
      projectBatchData
    }
  },
  methods: {
    ...mapActions(['createDictionaryProjectBatch']),
    /**
     * 时间改变事件
     * @method timeHandleChange
     * @param {Object} time 选择的时间（moment对象）
     * @param {String} timeString 选择的时间（字符串格式 'YYYY-MM-DD HH:mm:ss'）
     * @param {String} valName 需要变更的数据名称
     */
    timeHandleChange(time, timeString, valName) {
      switch (valName) {
        case 'apInTi': {
          this.projectBatchData.apInTi = time
          break
        }
        case 'apClTi': {
          this.projectBatchData.apClTi = time
          break
        }
        case 'meTeInInTi': {
          this.projectBatchData.meTeInInTi = time
          break
        }
        case 'meTeInClTi': {
          this.projectBatchData.meTeInClTi = time
          break
        }
        case 'fiInTi': {
          this.projectBatchData.fiInTi = time
          break
        }
        case 'fiClTi': {
          this.projectBatchData.fiClTi = time
          break
        }
      }
    },
    /**
     * 开始时间验证
     * @method disabledStartDate
     * @param {Object} startTime 开始时间（moment对象）
     * @param {String} stage 阶段名称
     * @returns {Boolean} 验证结果逻辑值
     */
    disabledStartDate(startTime, stage) {
      let endTime = null
      switch (stage) {
        case 'application': {
          endTime = this.projectBatchData.apClTi
          break
        }
        case 'medium': {
          endTime = this.projectBatchData.meTeInClTi
          break
        }
        case 'finalize': {
          endTime = this.projectBatchData.fiClTi
          break
        }
      }
      if (!startTime || !endTime) {
        return false
      }
      return startTime.valueOf() > endTime.valueOf()
    },
    /**
     * 结束时间验证
     * @method disabledEndDate
     * @param {Object} endTime 结束时间（moment对象）
     * @param {String} stage 阶段名称
     * @returns {Boolean} 验证结果逻辑值
     */
    disabledEndDate(endTime, stage) {
      let startTime = null
      switch (stage) {
        case 'application': {
          startTime = this.projectBatchData.apInTi
          break
        }
        case 'medium': {
          startTime = this.projectBatchData.meTeInInTi
          break
        }
        case 'finalize': {
          startTime = this.projectBatchData.fiInTi
          break
        }
      }
      if (!endTime || !startTime) {
        return false
      }
      return startTime.valueOf() > endTime.valueOf()
    },
    /**
     * 创建批次字典信息及批次详情信息
     * @method create
     */
    create() {
      const copyData = JSON.parse(JSON.stringify({ ...projectBatchData }))
      copyData.apInTi = copyData.apInTi ? moment(copyData.apInTi).format('YYYY-MM-DD hh:mm:ss') : null
      copyData.apClTi = copyData.apClTi ? moment(copyData.apClTi).format('YYYY-MM-DD hh:mm:ss') : null
      copyData.meTeInInTi = copyData.meTeInInTi ? moment(copyData.meTeInInTi).format('YYYY-MM-DD hh:mm:ss') : null
      copyData.meTeInClTi = copyData.meTeInClTi ? moment(copyData.meTeInClTi).format('YYYY-MM-DD hh:mm:ss') : null
      copyData.fiInTi = copyData.fiInTi ? moment(copyData.fiInTi).format('YYYY-MM-DD hh:mm:ss') : null
      copyData.fiClTi = copyData.fiClTi ? moment(copyData.fiClTi).format('YYYY-MM-DD hh:mm:ss') : null
      this.createDictionaryProjectBatch(copyData).then((res, err) => {
        console.log(res)
      })
    },
    /**
     * 数字输入框数值校验
     * @method inputNumberVerify
     */
    inputNumberVerify(valName) {
      const number = this.projectBatchData.paMaNuOfPaPr
      this.projectBatchData.paMaNuOfPaPr = number
      switch (valName) {
        case 'hmnohp': {
          const number = this.projectBatchData.hoMaNuOfHoPr
          this.projectBatchData.hoMaNuOfHoPr = number === null ? this.inputNumberOption.min : number
          break
        }
        case 'hmnopp': {
          const number = this.projectBatchData.hoMaNuOfPaPr
          this.projectBatchData.hoMaNuOfPaPr = number === null ? this.inputNumberOption.min : number
          break
        }
        case 'pmnohp': {
          const number = this.projectBatchData.paMaNuOfHoPr
          this.projectBatchData.paMaNuOfHoPr = number === null ? this.inputNumberOption.min : number
          break
        }
        case 'pmnopp': {
          const number = this.projectBatchData.paMaNuOfPaPr
          this.projectBatchData.paMaNuOfPaPr = number === null ? this.inputNumberOption.min : number
          break
        }
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
