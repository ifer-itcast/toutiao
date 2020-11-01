<template>
  <div class="channel-edit">
    <!-- 我的频道标题 -->
    <van-cell :border="false">
      <div slot="title">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini"
        >编辑</van-button
      >
    </van-cell>
    <!-- 我的频道内容 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in 8"
        :key="index"
        text="文字"
      >
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐标题 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <!-- 频道推荐内容 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in 8"
        :key="index"
        text="文字"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit'
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
}
</style>
