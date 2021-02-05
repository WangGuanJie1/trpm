<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title">
    <template #content>
      <a-descriptions title="账号安全" bordered :column="1">
        <a-descriptions-item v-for="item in securityType" :key="item.cnName" :label="item.cnName">
          <a-button type="primary" @click="changeShowDrawer(item)">修改</a-button>
        </a-descriptions-item>
      </a-descriptions>
      <SecurityInfoEdit />
    </template>
  </BaseContentLayout>
</template>

<script>
import { Descriptions, Button } from 'ant-design-vue'
import BaseContentLayout from '@/views/layouts/BaseContentLayout'
import SecurityInfoEdit from '@/views/account/SecurityInfoEdit'
import { reactive, ref, provide } from 'vue'
export default {
  components: {
    BaseContentLayout,
    SecurityInfoEdit,
    ADescriptions: Descriptions,
    ADescriptionsItem: Descriptions.Item,
    AButton: Button
  },
  setup() {
    const state = reactive({})
    const btnIsTrigger = ref(0) // 触发btn标记量
    const btnTriggerName = ref('') // 触发的btn名称
    // 安全类型名称
    const securityType = ref([
      {
        cnName: '密码',
        enName: 'password'
      },
      {
        cnName: '邮箱',
        enName: 'email'
      },
      {
        cnName: '密保问题',
        enName: 'question'
      }
    ])
    provide('btnIsTrigger', btnIsTrigger)
    provide('btnTriggerName', btnTriggerName)
    provide('securityType', securityType)

    /**
     * 触发btn事件
     * @method changeShowDrawer
     * @param {String} typeName 当前触发btn的enName
     */
    const changeShowDrawer = (typeName) => {
      btnTriggerName.value = typeName
      btnIsTrigger.value += 1
    }

    return {
      state,
      securityType,
      btnIsTrigger,
      btnTriggerName,
      changeShowDrawer
    }
  }
}
</script>

<style lang="less" scoped></style>
