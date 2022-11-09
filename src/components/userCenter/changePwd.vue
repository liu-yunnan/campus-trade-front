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
import { Toast } from 'vant';
import router from '../../router';
const state = reactive({
  userId: '001',
  password: '',
  newPassword: '',
  confirmNewPassword: '',
})
const pattern = /^.*(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])\w{6,16}/
const validator = (val: string) => pattern.test(val);
const onClickLeft = () => history.back();

onMounted(async () => {
  // const { data } = await getUserInfo()
  // state.userId = data.userId
  // state.passward = data.password
  // state.newPassword = data.newPassword
  // state.confirmNewPassword = data.confirmNewPassword
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
  Toast.success('修改成功，请重新登录')
  // http.post('/login/resetpwd', this.form).then(res => {
  //   if (res.state) {
  //     vant.Toast.success(res.msg);//成功信息
  //     window.location = "${rootpath}/mobile/home/index";
  //   } else {
  //     vant.Toast.fail(res.msg);//失败信息
  //   }
  // }).catch(res => {
  //   vant.Toast.clear();
  //   console.log(res);

  // });
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