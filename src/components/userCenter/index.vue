<template>
  <van-nav-bar fixed title="个人中心" left-text="返回" left-arrow @click-left="onClickLeft" />
  个人中心

</template>

<script setup lang="ts">
import router from '../../router';

const onClickLeft = () => router.push({ path: '/' });
</script>

<style scoped>

</style>