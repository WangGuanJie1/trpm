<template>
  <div class="logo-wrapper">
    <img src="@/assets/logo.png" alt="logo" class="logo-img" />
    <h1 class="system-title">{{ title }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      title: (state) => state.themeSetting.title
    })
  }
}
</script>

<style lang="less" scoped>
.logo-wrapper {
  display: flex;
  align-items: center;
  height: 64px;
  padding-left: 24px;

  .logo-img {
    height: 32px;
  }

  .system-title {
    margin: 0 0 0 12px;
    color: white;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
