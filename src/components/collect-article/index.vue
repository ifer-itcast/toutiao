<template>
  <!-- :color="value ? '#ffa500' : ''" -->
  <van-icon
    :name="value ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
  />
</template>

<script>
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  color: #ffa500 !important;
}
</style>
