<template>
  <a-config-provider :getPopupContainer="getPopupContainer" :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    AConfigProvider: ConfigProvider
  },
  setup() {
    const store = useStore()
    // 国际化配置（具体看官网示例）
    const getPopupContainer = (el, dialogContext) => {
      if (dialogContext) {
        return dialogContext.getDialogWrap()
      } else {
        return document.body
      }
    }

    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })

    return {
      getPopupContainer,
      zhCN
    }
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .w-100 {
    width: 100%;
  }
}

.content-box {
  padding: 2vw;
}
</style>
