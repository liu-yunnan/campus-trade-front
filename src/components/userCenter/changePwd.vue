<template>
  <div class="seting-box">
    <van-nav-bar fixed title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft" />
    个人中心
    <van-form @submit="onSubmit" method=“post”>
      <div class="input-item">
        <van-field v-model="state.password" type="password" name="password" label="原密码"
          :rules="[{ required: true, validator, message: '密码必须包含数字、大写或小写字母' }]" />
        <van-field v-model="state.newPassword" type="password" name="password" label="新密码"
          :rules="[{ required: true, validator, message: '密码必须包含数字、大写或小写字母' }]" />
        <van-field v-model="state.confirmNewPassword" type="password" name="password" label="确认密码"
          :rules="[{ required: true, validator, message: '密码必须包含数字、大写或小写字母' }]" />
      </div>
      <van-button round class="save-btn" color="#ffdb46" native-type="submit" type="primary" block>保存
      </van-button>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { getUserInfo, psdUpdate } from '@/service/user';
import { Toast } from 'vant';
const user = reactive({
  userId: 1,
  password: '',
})
const state = reactive({
  password: '',
  newPassword: '',
  confirmNewPassword: '',
})
const pattern = /^.*(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])\w{6,16}/
const validator = (val: string) => pattern.test(val);
const onClickLeft = () => history.back();

onMounted(async () => {
  const { data } = await getUserInfo()
  user.userId = data.id
  user.password = data.password
})

const onSubmit = async () => {
  if (state.newPassword === state.password) {
    Toast('不能与原密码相同!');
    state.password = '';
    state.newPassword = '';
    state.confirmNewPassword = '';
    return false;
  }
  let len = state.newPassword.length
  if (len > 16 || len < 6 && len > 0) {
    Toast('密码长度为6~16，请重新输入');
    // state.password = '';
    state.newPassword = '';
    state.confirmNewPassword = '';
    return false
  }
  if (state.password === '') {
    Toast('原密码不能为空');
    return false
  }
  if (state.newPassword === '') {
    Toast('新密码不能为空');
    return false
  }
  if (state.confirmNewPassword === '') {
    Toast('请确认密码');
    return false
  }
  if (state.newPassword !== state.confirmNewPassword) {
    Toast('与新密码不一致，请重新输入');
    state.newPassword = '';
    state.confirmNewPassword = '';
    return false;
  }
  const data = await psdUpdate({
    data: {
      newPassword: state.newPassword,
      originPassword: user.password
    }
  })
  if (data.code === 200) {
    Toast.success(data.msg);//成功信息
    router.push({ name: 'Login' })
  } else {
    Toast.fail(data.msg);//失败信息
  }
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