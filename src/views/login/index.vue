<template>
  <div class="login-container">
    <!-- 头部 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <!-- 手机号 -->
      <van-field
        type="number"
        name="手机号"
        placeholder="请输入手机号"
        v-model="user.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <!-- 验证码 -->
      <van-field
        type="number"
        name="验证码"
        placeholder="请输入验证码"
        v-model="user.code"
      >
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
import { login } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证
      // 3. 提交表单请求登录
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await login(user)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 4. 根据响应结果做出对应操作
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
