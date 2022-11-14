<template>
  <van-nav-bar fixed title="商品分类" left-text="返回" left-arrow @click-left="goHome" />
  商品分类
  <div class="categories">
    <!-- <van-sidebar v-model="active" @change="onChange">
      <van-sidebar-item v-for="item in Categories" :title="item.categoryName" :key="item.categoryId"></van-sidebar-item>
    </van-sidebar> -->
    <div class="search-wrap" ref="searchWrap">
      <list-scroll :scroll-data="state.categoryData" class="nav-side-wrapper">
        <ul class="nav-side">
          <li v-for="item in state.categoryData" :key="item.categoryId" v-text="item.categoryName"
            :class="{ 'active': state.currentIndex == item.categoryId }" @click="selectMenu(item.categoryId)"></li>
        </ul>
      </list-scroll>
      <div class="search-content">
        <list-scroll :scroll-data="state.categoryData">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <template v-for="(category, index) in state.categoryData">
                <div class="swiper-slide" v-if="state.currentIndex == category.categoryId" :key="index">
                  <!-- <img class="category-main-img" :src="category.mainImgUrl" v-if="category.mainImgUrl"/> -->
                  <div class="category-list" v-for="(products, index) in category.children" :key="index">
                    <p class="catogory-title">{{ products.categoryName }}</p>
                    <div class="product-item" v-for="(product, index) in products.children" :key="index"
                      @click="selectProduct(product)">
                      <img src="@/assets/img/标签.png" class="product-img" />
                      <p v-text="product.categoryName" class="product-title"></p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Toast } from 'vant';
import { getCategries } from '@/service/categries'
import router from '../../router';
const goHome = () => {
  router.push({ path: '/' })
}
type Category = {
  categoryId: number,
  categoryName: string,
  categoryLevel: number,
  children: Array<Category>
}
const searchWrap = ref(null)
const state = reactive({
  categoryData: [] as Array<Category>,
  currentIndex: 15
})
onMounted(async () => {
  const { data } = await getCategries()
  state.categoryData = data
  console.log(state.categoryData);
})
const selectProduct = (item: Category) => {
  console.log('item', item.categoryId)
  router.push({ path: '/search', query: { categoryId: item.categoryId } })
}
const selectMenu = (index: number) => {
  state.currentIndex = index
}
// const onChange = (index: number) => Toast(`标签名 ${index + 1}`);
</script>

<style scoped lang="scss">
.categories {
  // margin: .25rem 0 0;
  height: 100%;

  .search-wrap {
    width: 100%;
    background: #F8F8F8;
    margin-top: .24rem;
    display: flex;
    // overflow: hidden;

    .nav-side-wrapper {
      width: 28%;
      height: 100%;
      overflow: hidden;
      position: fixed;
      background: #F8F8F8;

      .nav-side {
        width: 100%;
        box-sizing: border-box;

        li {
          width: 100%;
          height: 56px;
          text-align: center;
          line-height: 56px;
          font-size: 14px;

          &.active {
            background: #fff;
          }
        }
      }
    }

    .search-content {
      width: 72%;
      // height: 100%;
      margin-left: 28%;
      padding: 0 10px;
      background: #fff;
      overflow-y: scroll;
      box-sizing: border-box;

      * {
        touch-action: pan-y;
      }

      .swiper-container {
        width: 100%;

        .swiper-slide {
          width: 100%;

          .category-main-img {
            width: 100%;
          }

          .category-list {
            display: flex;
            flex-wrap: wrap;
            flex-shrink: 0;
            width: 100%;

            .catogory-title {
              width: 100%;
              font-size: .16rem;
              font-weight: 500;
              padding: 20px 0;
            }

            .product-item {
              width: 33.3333%;
              margin-bottom: .15rem;
              text-align: center;
              font-size: .12rem;

              .product-img {
                width: .25rem;
                height: .25rem;
                padding-bottom: .05rem;
              }
            }
          }
        }
      }
    }
  }

}
</style>