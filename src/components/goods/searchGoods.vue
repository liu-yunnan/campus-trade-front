<template>
  <div>
    <!-- 搜索页 -->
    <!-- <van-nav-bar fixed title="" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <div class="header_saerchbox">
      <van-button color="#ffdb46" icon="arrow-left" @click="onClickLeft"></van-button>
      <van-search shape="round" background="#ffdb46" placeholder="请输入搜索关键词" v-model="state.keyword"
        @click="getSearch" />
    </div>
    <div class="select_box">
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item v-model="state.value1" :options="option1" />
        <van-dropdown-item v-model="state.value2" :options="option2" />
      </van-dropdown-menu>
    </div>
    <GoodsList></GoodsList>
  </div>
</template>

<script setup lang="ts">
import GoodsList from "@/components/goods/goodsList.vue"
import { selectGoodsList } from '@/service/goods'
import { LocationQueryValue } from 'vue-router';
import router from "../../router";
let route = useRoute();
const categoryId = parseInt(route.query.id as string)
const onClickLeft = () => history.back();
const state = reactive({
  keyword: '',
  categoryId: categoryId || -1,
  list: [],
  pageNum: 1,
  pageSize: 20,
  // priceOrder: 
  value1: 0,
  value2: 'a'
})
const option1 = [
  { text: '全部商品', value: 0 },
  // { text: '已上架', value: 1 },
  // { text: '已下架', value: 2 },
  // { text: '已售出', value: 3 },
];

const option2 = [
  { text: '价格升序', value: 'a' },
  { text: '价格降序', value: 'b' },
];
// 组件传值，不该在这里
const getSearch = async () => {
  const { data } = await selectGoodsList(state.categoryId, state.keyword, state.pageNum, state.pageSize, "", -1)
}
onMounted(async () => {
  const { data } = await selectGoodsList(state.categoryId, state.keyword, state.pageNum, state.pageSize, "", -1)
  state.list = data
  console.log(state.list);
})
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