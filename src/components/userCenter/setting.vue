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
import router from '../../router';
const state = reactive({
  userName: 'DoKiDoKi',
  QQ: '1792147770',
  tel: '12345678977',
  introduceSign: '这个人很懒，什么都没留下',
})
const onClickLeft = () => history.back();

onMounted(async () => {
  // const { data } = await getUserInfo()
  // state.userName = data.userName
  // state.QQ = data.QQ
  // state.tel = data.tel
  // state.introduceSign = data.introduceSign
})

const save = async () => {
  const params = {
    userName: state.userName,
    tel: state.tel,
    QQ: state.QQ,
    introduceSign: state.introduceSign
  }
  // await EditUserInfo(params)
  // Toast.success('保存成功')
  console.log('保存');
}

const handleLogout = async () => {
  // const { resultCode } = await logout()
  // if (resultCode == 200) {
  //   setLocal('token', '')
  window.location.href = '/'
  // }
  console.log('退出登录');
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