<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <!-- isDeleteShow 默认为 false，即默认显示 v-else 的删除按钮 -->
      <div v-if="isDeleteShow">
        <span>全部删除</span>&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
    >
      <!-- 每一行的删除按钮 -->
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false // 控制删除显示状态
    }
  }
}
</script>

<style lang="less" scoped></style>
