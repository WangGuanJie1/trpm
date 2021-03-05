<template>
  <div class="logo-wrapper">
    <img src="@/assets/logo.png" alt="logo" class="logo-img" />
    <router-link :to="{ name: 'home' }">
      <h1 class="system-title" :class="[!showTitle ? 'show' : 'hidden']">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  props: ['showTitle'],
  setup() {
    const store = useStore()
    const title = store.state.themeSetting.title
    const state = reactive({})

    return {
      state,
      title
    }
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
    margin: auto 0;
  }

  .system-title {
    margin: auto 0;
    margin-left: 12px;
    color: white;
    font-size: 20px;
    font-weight: 600;
  }

  .show {
    opacity: 1;
    transition: 0.7s all;
  }

  .hidden {
    opacity: 0;
  }
}
</style>
