<template>
  <div>
    <van-nav-bar fixed left-text="返回" left-arrow @click-left="onClickLeft"
      :title="state.type === 'login' ? '登录' : '注册'" />

    <img class="logo" src="@/assets/img/登录@1x.png" alt="">
    <!-- 登录 -->
    <div v-if="state.type == 'login'" class="login-body">
      <van-form @submit="onSubmit">
        <van-field v-model="state.username" name="username" label="手机号" placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]" />
        <van-field v-model="state.password" type="password" name="password" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <div class="btn_box">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button round block color="#ffdb46" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>


    <!-- 注册 -->
    <div v-else class="login-body">
      <van-form @submit="onSubmit">
        <van-field v-model="state.username1" name="username1" label="手机号" placeholder="手机号"
          :rules="[{ validator: validator1, required: true, message: '手机号号格式不正确' }]" />
        <van-field v-model="state.password1" type="password" name="password1" label="密码" placeholder="密码"
          :rules="[{ validator: validator2, required: true, message: '密码必须包含数字、大写或小写字母' }]" />
        <van-field v-model="state.confirmPassword1" type="password" name="confirmPassword1" label="确认密码"
          placeholder="确认密码" :rules="[{ validator: validator2, required: true, message: '密码必须包含数字、大写或小写字母' }]" />
        <div class="btn_box">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button round block color="#ffdb46" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'vant';
import { setLocal } from '../common/common';
import router from '../router';
import { login, register } from '@/service/loginRegister'
const verifyRef = ref(null)
// 手机号校验
const validator1 = (val: string) => /1\d{10}/.test(val);
// 密码校验
const validator2 = (val: string) => /^.*(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])\w{6,16}/.test(val);
const state = reactive({
  // 登录
  username: '',
  password: '',
  // 注册
  username1: '',
  password1: '',
  confirmPassword1: '',
  type: 'login',
})

// 切换登录和注册两种模式
const toggle = (v: string) => {
  state.type = v
}

// 提交登录或注册表单
const onSubmit = async (values: { username: any; password: any; username1: any; password1: any; }) => {
  if (state.type == 'login') {
    const { data } = await login({
      data: {
        "tel": values.username,
        "password": values.password
      }
    })
    setLocal('token', data.token)
    // console.log('登录');
    // 需要刷新页面，否则 axios.js 文件里的 token 不会被重置
    router.push({ path: '/' })
  } else {
    if (state.username1 === '') {
      Toast('请输入手机号')
      return false
    }
    if (state.confirmPassword1 !== '' && state.password1 === '') {
      Toast('请输入密码')
      return false
    }
    if (state.confirmPassword1 === '' && state.password1 !== '') {
      Toast('请确认密码');
      return false
    }
    if (state.password1 !== state.confirmPassword1) {
      Toast('密码不一致，请重新输入');
      state.password1 = '';
      state.confirmPassword1 = '';
      return false;
    }
    let len = state.password1.length
    if (len > 16 || len < 6 && len > 0) {
      Toast('密码长度为6~16，请重新输入');
      // state.password = '';
      state.password = '';
      state.confirmPassword1 = '';
      return false
    }
    await register({
      data: {
        "tel": values.username1,
        "password": values.password1
      }
    })
    // console.log('用户名密码：', values.username1, values.password1);
    Toast.success('注册成功')
    state.type = 'login'
  }
}
const onClickLeft = () => router.push({ path: '/' });
</script>

<style scoped lang="scss">
.logo {
  width: .8rem;
  height: .8rem;
  display: block;
  margin: .8rem auto .4rem;
}

.login-body {
  padding: 0 20px;
}

.btn_box {
  margin: .2rem .14rem;
  // display: flex;
  // align-items: center;

  .link-register,
  .link-login {
    margin-bottom: .14rem;
    font-size: 14px;
    width: 2rem;
    color: #1989fa;
    display: inline-block;
  }
}
</style>