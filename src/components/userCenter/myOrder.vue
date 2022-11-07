<template>
  <van-nav-bar fixed title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />

  <div>
    我的订单
  </div>
</template>

<script setup lang="ts">
const onClickLeft = () => history.back();
</script>

<style scoped lang="scss">

</style>