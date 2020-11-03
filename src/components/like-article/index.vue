<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
export default {
  name: 'LikeArticle',
  data() {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    onCollect() {}
  }
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
