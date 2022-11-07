<template>
  <van-nav-bar fixed title="我发布的商品" left-text="返回" left-arrow @click-left="onClickLeft" />

  <div>
    我发布的商品
  </div>
</template>

<script setup lang="ts">
const onClickLeft = () => history.back();
</script>

<style scoped lang="scss">

</style>