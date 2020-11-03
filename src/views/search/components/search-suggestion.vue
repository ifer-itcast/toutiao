<template>
  <div class="search-suggestion">
    <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell title="黑马程序员" icon="search"></van-cell>
    <van-cell title="黑马程序员" icon="search"></van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 当 searchText 发生变化的时候会调用 handler 函数（固定的）
      handler (value) {
        console.log(value)
      },
      // 第一次的时候也触发 handler
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
