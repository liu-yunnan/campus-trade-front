<template>
  <van-nav-bar fixed title="商品分类" left-text="返回" left-arrow @click-left="onClickLeft" />
  商品分类
  <van-sidebar v-model="active" @change="onChange">
    <van-sidebar-item title="生活日用"></van-sidebar-item>
    <van-sidebar-item title="标签名 2"></van-sidebar-item>
    <van-sidebar-item title="标签名 3"></van-sidebar-item>
  </van-sidebar>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Toast } from 'vant';
import router from '../../router';
const onClickLeft = () => router.push({ path: '/' });
const active = ref(0);
const Categories = reactive<Array<string>>(['生活日用', '服装饰品', '电子产品', '其他分类'])
const onChange = (index: number) => Toast(`标签名 ${index + 1}`);
</script>

<style scoped lang="scss">

</style>