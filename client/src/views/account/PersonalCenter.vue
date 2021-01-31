<template>
  <BaseContentLayout :headerPageTitle="this.$route.meta.title">
    <template #content> {{ state.teacherInfo }} </template>
  </BaseContentLayout>
</template>

<script>
import {} from 'ant-design-vue'
import BaseContentLayout from '@/views/layouts/BaseContentLayout'
import { reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    BaseContentLayout
  },
  setup() {
    const store = useStore()
    const state = reactive({
      teacherInfo: store.state.currentTeacherInfo.teacherInfo
    })

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped></style>
