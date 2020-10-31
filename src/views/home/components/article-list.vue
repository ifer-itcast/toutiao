<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态，默认不 loading
      finished: false // 数据是否加载完成
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 ID
          // 请求数据的页码，请求第 1 页数据，用当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求的返回值中给出
          timestamp: Date.now(),
          with_top: 1 // 是否包含置顶
        })
        console.log(data)
        // 2. 把请求结果数据放到 list 数组中
        // 3. 本次数据加载完毕后要把 loading 设置为 false，loading 关闭后才能触发下一次的加载更多
        // this.loading = false
        // 4. 数据加载完毕后，要把 finished 设置为 true，不再触发加载更多了
      } catch (err) {}
    }
  }
}
</script>

<style lang="less" scoped></style>
