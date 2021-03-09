<template>
  <div class="login-container">
    <!-- 头部 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <!-- 手机号 -->
      <van-field
        type="number"
        maxlength="11"
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <!-- 验证码 -->
      <van-field
        type="number"
        maxlength="6"
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
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
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111', // 13911111111
        code: '246810' // 246810
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3578]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false // 是否展示倒计时
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
        const { data } = await login(user)
        // 设置数据到 Vuex
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 跳转回原来的页面
        // this.$router.back()
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 4. 根据响应结果做出对应操作
    },
    async onSendSms() {
      try {
        // 1. 校验手机号，'mobile' 对应的是 name 属性值
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true // 显示倒计时
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false // 发送失败，关闭倒计时
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
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
