<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页条数
          q: this.searchText // 查询关键词
        })
        if (Math.random() > 0.5) {
          JSON.parse('xxx')
        }
        // 2
        const { results } = data.data
        this.list.push(...results)
        // 3
        this.loading = false
        // 4
        if (results.length) {
          // 4.1
          this.page++
        } else {
          // 4.2
          this.finished = true
        }
      } catch (err) {
        this.error = true // 展示加载失败
        this.loading = false // 关闭 loading
        // this.$toast('数据获取失败，请稍后重试')
      }
      // 1. 请求数据
      // 2. 将数据添加到数组列表中
      // 3. 将本次加载中的 loading 关闭
      // 4. 判断是否还有数据
      // 4.1 如果有，则更新获取下一个数据的页码
      // 4.2 如果无，则将加载状态 finished 设置为结束
    }
  }
}
</script>

<style lang="less" scoped></style>
