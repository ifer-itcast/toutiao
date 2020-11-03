<template>
  <div class="article-container">文章详情</div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
