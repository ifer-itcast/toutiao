<template>
  <div id="app">
    <!-- 一级路由出口 -->
    <!-- 只想缓存 LayoutIndex，解决了不加载新的文章详情的问题 -->
    <!-- 解决登录之后还是原来用户的问题 -->
    <!-- 登录成功之后把 LayoutIndex 从缓存当中抹掉 -->
    <!-- 当 LayoutIndex 组件加载完毕后，再加上 LayoutIndex 缓存 -->
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

<style lang="less"></style>
