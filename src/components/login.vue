<template>
  <div>
    <van-nav-bar fixed :title="state.type === 'login' ? '登录' : '注册'" />

    <img class="logo" src="@/assets/img/登录@1x.png" alt="">
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
    <div v-else class="login-body">
      <van-form @submit="onSubmit">
        <van-field v-model="state.username1" name="username1" label="手机号" placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]" />
        <van-field v-model="state.password1" type="password" name="password1" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
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

const verifyRef = ref(null)
const state = reactive({
  username: '',
  password: '',
  username1: '',
  password1: '',
  type: 'login',
})

// 切换登录和注册两种模式
const toggle = (v: string) => {
  state.type = v
}

// 提交登录或注册表单
const onSubmit = async (values: { username1: any; password1: any; }) => {
  if (state.type == 'login') {
    // const { data } = await login({
    //   "loginName": values.username,
    //   "passwordMd5": values.password
    // })
    // setLocal('token', data)
    console.log('登录');
    // 需要刷新页面，否则 axios.js 文件里的 token 不会被重置
    window.location.href = '/'
  } else {
    // await register({
    //   "loginName": values.username1,
    //   "password": values.password1
    // })
    // Toast.success('注册成功')
    state.type = 'login'
  }
}
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
  margin: .2rem .1rem;
  display: flex;
  align-items: center;

  .link-register,
  .link-login {
    font-size: 14px;
    width: 2rem;
    color: #1989fa;
    display: inline-block;
  }
}
</style>