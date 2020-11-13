<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell title="昵称" value="内容" is-link />
    <van-cell title="性别" value="内容" is-link />
    <van-cell title="生日" value="内容" is-link />
    <!-- /个人信息 -->
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
