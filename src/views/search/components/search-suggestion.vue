<template>
  <div class="search-suggestion">
    <van-cell
      :title="text"
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 当 searchText 发生变化的时候会调用 handler 函数（固定的）
      /* handler(value) {
        this.loadSearchSuggestions(value)
      }, */
      handler: debounce(function(value) {
        this.loadSearchSuggestions(value)
      }, 200),
      // 第一次的时候也触发 handler
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
