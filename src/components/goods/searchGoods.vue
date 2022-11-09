<template>
  <div>
    <!-- 搜索页 -->
    <!-- <van-nav-bar fixed title="" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <div class="header_saerchbox">
      <van-button color="#ffdb46" icon="arrow-left" @click="onClickLeft"></van-button>
      <van-search shape="round" background="#ffdb46" placeholder="请输入搜索关键词" v-model="state.keyword"
        @click="getSearch" />
    </div>
    <GoodsList></GoodsList>
  </div>
</template>

<script setup lang="ts">
import GoodsList from "@/components/goods/goodsList.vue"
import { LocationQueryValue } from 'vue-router';
import router from "../../router";
let route = useRoute();
const onClickLeft = () => history.back();
const state = reactive({
  keyword: '',
  id: route.query.id || '',
  list: [],
})
const getSearch = () => {

}
</script>

<style scoped lang="scss">
.header_saerchbox {
  // margin-top: .4rem;
  background: #ffdb46;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep .van-search {
  padding-top: .1rem;
  margin: 0 30px;
  width: 100%;


  &__content {
    background: white;
  }
}
</style>