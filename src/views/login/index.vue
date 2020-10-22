<template>
  <div class="login-container">
    <!-- 头部 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <!-- 手机号 -->
      <van-field name="手机号" placeholder="请输入手机号">
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <!-- 验证码 -->
      <van-field type="password" name="验证码" placeholder="请输入验证码">
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-button
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    padding: 0;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
