<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title"> </BaseContentLayout>
</template>

<script>
import {} from 'ant-design-vue'
import BaseContentLayout from '@/views/layouts/BaseContentLayout'
import { reactive } from 'vue'
export default {
  components: {
    BaseContentLayout
  },
  setup() {
    const state = reactive({})

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped></style>
