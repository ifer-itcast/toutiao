<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <!-- 获取焦点时，显示联想建议或搜索历史（取决于有没有 searchText） -->
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" />
    <!-- 搜索历史 -->
    <search-history v-else />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果的展示
    }
  },
  methods: {
    onSearch(val) {
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
