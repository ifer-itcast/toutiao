<template>
  <div class="article-list">
    文章
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
