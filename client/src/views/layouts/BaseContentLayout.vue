<template>
  <a-row type="flex" class="base-content-wrapper">
    <a-col flex="1">
      <a-row v-if="headerPageShow === true" class="global-page-header">
        <a-col>
          <GlobalPageHeader :title="headerPageTitle" :subTitle="headerPageSubTitle">
            <template #headerPageExtra>
              <slot name="headerPageExtra"></slot>
            </template>
            <template #headerPageFooter>
              <slot name="headerPageFooter"></slot>
            </template>
            <template #headerPageContent>
              <slot name="headerPageContent"></slot>
            </template>
          </GlobalPageHeader>
        </a-col>
      </a-row>
      <a-row :style="contentStyle">
        <a-col class="content">
          <a-row type="flex" justify="center" class="space-mt">
            <a-col :span="23">
              <slot name="content"></slot>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col } from 'ant-design-vue'
import GlobalPageHeader from '@/components/PageHeader/GlobalPageHeader'

export default {
  components: {
    ARow: Row,
    ACol: Col,
    GlobalPageHeader
  },
  props: {
    headerPageShow: {
      type: Boolean,
      default: true,
      required: true
    },
    headerPageTitle: {
      type: String,
      default: '',
      required: true
    },
    headerPageSubTitle: {
      type: String,
      default: ''
    },
    contentStyle: {
      type: Object,
      default: function () {
        return {
          margin: '24px',
          backgroundColor: '#fff'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.base-content-wrapper {
  .global-page-header {
  }

  .content {
    text-align: left;
    min-height: 100vh;
    .space-mt {
      margin-top: 2.5vw;
    }
  }
}
</style>
