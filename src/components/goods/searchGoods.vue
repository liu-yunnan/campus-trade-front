<template>
  <div>
    <!-- 搜索页 -->
    <!-- <van-nav-bar fixed title="" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <div class="header_saerchbox">
      <van-button color="#ffdb46" icon="arrow-left" @click="onClickLeft"></van-button>
      <van-search shape="round" background="#ffdb46" placeholder="请输入搜索关键词" v-model="state.keyword"
        @search="getSearch" />
    </div>
    <div class="select_box">
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item v-model="state.value1" :options="option1" />
        <van-dropdown-item v-model="state.value2" :options="option2" />
      </van-dropdown-menu>
    </div>
    <GoodsList ref="goodsList"></GoodsList>
  </div>
</template>

<script setup lang="ts">
import GoodsList from "@/components/goods/goodsList.vue"

let route = useRoute();
const categoryId = parseInt(route.query.categoryId as string)
const onClickLeft = () => history.back();
const state = reactive({
  keyword: '',
  categoryId: categoryId || -1,
  list: [],
  // pageNum: 1,
  // pageSize: 20,
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

const goodsList = ref<any>(null)
const getSearch = () => {
  // console.log('categoryId', state.categoryId, 'keyword', state.keyword);
  goodsList.value.onSearch(state.keyword, state.categoryId)
}

/**
 * 页面加载前，发出搜索请求
 */
onMounted(() => {
  getSearch()
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