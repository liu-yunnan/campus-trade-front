<template>
  <div class="seting-box">
    <van-nav-bar fixed title="账号管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    个人中心
    <div class="input-item">
      <van-field v-model="state.userName" label="用户名" />
      <van-field v-model="state.QQ" label="QQ" />
      <van-field v-model="state.introduceSign" label="个性签名" />
    </div>
    <van-button round class="save-btn" color="#ffdb46" type="primary" @click="save" block>保存</van-button>
    <van-button round class="save-btn" color="#ffdb46" type="primary" @click="handleLogout" block>退出登录</van-button>
  </div>
</template>

<script setup lang="ts">
import { logout } from '@/service/loginRegister'
import { setLocal } from '@/common/common';
import { editUserInfo, getUserInfo } from '@/service/user'
import { Toast } from 'vant';
import router from '@/router';
const state = reactive({
  userName: '',
  QQ: '',
  tel: '',
  introduceSign: '',
})
const onClickLeft = () => history.back();

onMounted(async () => {
  await getUserInfo().then((res: any) => {
    state.userName = res.data.username
    state.QQ = res.data.qq
    state.introduceSign = res.data.personSignature === null ? '这个人很懒，什么都没留下' : res.data.personSignature
  }).catch((err: any) => {
    // console.log(err.response);
    return err.response
  })
})

const save = async () => {
  const params = {
    username: state.userName,
    qq: state.QQ,
    personSignature: state.introduceSign
  }
  await editUserInfo({ data: params })
  Toast.success('保存成功')
}

const handleLogout = async () => {
  await logout()
  setLocal('token', '')
  router.push({ path: '/' })
}
</script>

<style scoped lang="scss">
.seting-box {
  .input-item {
    padding-top: .4rem;
    padding-bottom: .4rem;
  }

  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>