<template>
  <div>
    <van-nav-bar fixed title="编辑商品" left-text="返回" left-arrow @click-left="onClickLeft" />

  </div>
</template>

<script setup lang="ts">
const onClickLeft = () => history.back();
</script>

<style scoped>

</style>