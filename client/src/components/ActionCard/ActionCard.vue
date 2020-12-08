<template>
  <a-row :gutter="24">
    <a-col :span="6">
      <a-card :bordered="true" hoverable>
        <template v-slot:cover>
          <div class="entry-title-wrapper">
            <h1 class="title">{{ title }}</h1>
            <img class="picture" src="@/assets/bg_introduction_card.png" alt="action_card_img" />
          </div>
        </template>
        <template v-slot:actions v-if="true">
          <a-tooltip title="编辑">
            <edit-outlined />
          </a-tooltip>
          <a-tooltip title="删除">
            <delete-outlined />
          </a-tooltip>
          <a-tooltip title="发布">
            <send-outlined />
          </a-tooltip>
        </template>
        <template v-slot:actions v-else>
          <a-tooltip title="设置">
            <setting-outlined />
          </a-tooltip>
          <a-tooltip title="更多">
            <ellipsis-outlined />
          </a-tooltip>
        </template>
        <a-descriptions>
          <a-descriptions-item span="{3}" label="项目批次"> 2020年第二批次 </a-descriptions-item>
          <a-descriptions-item span="{3}" label="起止时间"> 2020.10.29 - 2020.11.29 </a-descriptions-item>
          <a-descriptions-item span="{3}" label="负责人电话"> 1810000000 </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { Card, Row, Col, Descriptions, Tooltip } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, SettingOutlined, EllipsisOutlined, SendOutlined } from '@ant-design/icons-vue'

export default {
  data() {
    return {
      title: '教研项目申报活动入口'
    }
  },
  components: {
    ACard: Card,
    ADescriptions: Descriptions,
    ADescriptionsItem: Descriptions.Item,
    ARow: Row,
    ACol: Col,
    ATooltip: Tooltip,
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
    SendOutlined,
    EllipsisOutlined
  },
  methods: {}
}
</script>

<style lang="less" scroed>
.entry-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    position: absolute;
    z-index: 20;
    font-size: 20px;
    font-weight: 600;
  }

  .picture {
    width: inherit;
    opacity: 0.5;
  }
}
</style>
