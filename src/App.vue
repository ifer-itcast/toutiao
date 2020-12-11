<template>
  <div id="app">
    <!-- 指定 include 代表只缓存这些，保证能显示文章详情 -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>
