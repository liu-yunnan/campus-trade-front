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
import router from '../../router';
import { type } from 'os';
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
  // const {data } = await getCategories()
  state.categoryData = JSON.parse('[{"children":[{"children":[{"categoryLevel":3,"categoryName":"生活电器","categoryId":20},{"categoryLevel":3,"categoryName":"wer","categoryId":110},{"categoryLevel":3,"categoryName":"厨房电器","categoryId":21},{"categoryLevel":3,"categoryName":"扫地机器人","categoryId":22},{"categoryLevel":3,"categoryName":"吸尘器","categoryId":23},{"categoryLevel":3,"categoryName":"取暖器","categoryId":24},{"categoryLevel":3,"categoryName":"豆浆机","categoryId":25},{"categoryLevel":3,"categoryName":"暖风机","categoryId":26},{"categoryLevel":3,"categoryName":"加湿器","categoryId":27},{"categoryLevel":3,"categoryName":"蓝牙音箱","categoryId":28},{"categoryLevel":3,"categoryName":"烤箱","categoryId":29},{"categoryLevel":3,"categoryName":"卷发器","categoryId":30},{"categoryLevel":3,"categoryName":"空气净化器","categoryId":31}],"categoryLevel":2,"categoryName":"家电","categoryId":17},{"children":[{"categoryLevel":3,"categoryName":"游戏主机","categoryId":32},{"categoryLevel":3,"categoryName":"二手手机","categoryId":43},{"categoryLevel":3,"categoryName":"数码精选","categoryId":33},{"categoryLevel":3,"categoryName":"平板电脑","categoryId":34},{"categoryLevel":3,"categoryName":"苹果 Apple","categoryId":35},{"categoryLevel":3,"categoryName":"电脑主机","categoryId":36},{"categoryLevel":3,"categoryName":"数码相机","categoryId":37},{"categoryLevel":3,"categoryName":"电玩动漫","categoryId":38},{"categoryLevel":3,"categoryName":"单反相机","categoryId":39},{"categoryLevel":3,"categoryName":"键盘鼠标","categoryId":40},{"categoryLevel":3,"categoryName":"无人机","categoryId":41},{"categoryLevel":3,"categoryName":"二手电脑","categoryId":42}],"categoryLevel":2,"categoryName":"数码","categoryId":18},{"children":[{"categoryLevel":3,"categoryName":"荣耀手机","categoryId":45},{"categoryLevel":3,"categoryName":"华为手机","categoryId":46},{"categoryLevel":3,"categoryName":"华为 P30","categoryId":49},{"categoryLevel":3,"categoryName":"iPhone 11","categoryId":44},{"categoryLevel":3,"categoryName":"苹果 iPhone","categoryId":47},{"categoryLevel":3,"categoryName":"华为 Mate 20","categoryId":48},{"categoryLevel":3,"categoryName":"小米手机","categoryId":51},{"categoryLevel":3,"categoryName":"OPPO","categoryId":53},{"categoryLevel":3,"categoryName":"一加","categoryId":54},{"categoryLevel":3,"categoryName":"小米 MIX","categoryId":55},{"categoryLevel":3,"categoryName":"Reno","categoryId":56},{"categoryLevel":3,"categoryName":"vivo","categoryId":57},{"categoryLevel":3,"categoryName":"手机以旧换新","categoryId":58}],"categoryLevel":2,"categoryName":"手机","categoryId":19}],"categoryLevel":1,"categoryName":"家电 数码 手机","categoryId":15},{"children":[{"children":[{"categoryLevel":3,"categoryName":"外套","categoryId":76}],"categoryLevel":2,"categoryName":"女装","categoryId":67}],"categoryLevel":1,"categoryName":"女装 男装 穿搭","categoryId":16},{"children":[{"children":[{"categoryLevel":3,"categoryName":"沙发","categoryId":77}],"categoryLevel":2,"categoryName":"家具","categoryId":70}],"categoryLevel":1,"categoryName":"家具 家饰 家纺","categoryId":61},{"children":[{"children":[{"categoryLevel":3,"categoryName":"跑鞋","categoryId":78}],"categoryLevel":2,"categoryName":"运动","categoryId":73}],"categoryLevel":1,"categoryName":"运动 户外 乐器","categoryId":59},{"children":[{"children":[{"categoryLevel":3,"categoryName":"LOL","categoryId":82}],"categoryLevel":2,"categoryName":"游戏","categoryId":79}],"categoryLevel":1,"categoryName":"游戏 动漫 影视","categoryId":60},{"children":[{"children":[{"categoryLevel":3,"categoryName":"口红","categoryId":86},{"categoryLevel":3,"categoryName":"睫毛膏","categoryId":104},{"categoryLevel":3,"categoryName":"腮红","categoryId":103},{"categoryLevel":3,"categoryName":"粉底","categoryId":102},{"categoryLevel":3,"categoryName":"隔离霜","categoryId":101},{"categoryLevel":3,"categoryName":"美白","categoryId":100},{"categoryLevel":3,"categoryName":"气垫","categoryId":99}],"categoryLevel":2,"categoryName":"美妆","categoryId":83}],"categoryLevel":1,"categoryName":"美妆 清洁 宠物","categoryId":62},{"children":[{"children":[{"categoryLevel":3,"categoryName":"转换器","categoryId":90}],"categoryLevel":2,"categoryName":"工具","categoryId":87}],"categoryLevel":1,"categoryName":"工具 装修 建材","categoryId":63},{"children":[{"children":[{"categoryLevel":3,"categoryName":"休闲鞋","categoryId":98}],"categoryLevel":2,"categoryName":"鞋靴","categoryId":95}],"categoryLevel":1,"categoryName":"鞋靴 箱包 配件","categoryId":66},{"children":[{"children":[{"categoryLevel":3,"categoryName":"机器人","categoryId":116}],"categoryLevel":2,"categoryName":"玩具","categoryId":115}],"categoryLevel":1,"categoryName":"玩具 孕产 用品","categoryId":65}]')
  console.log(state.categoryData);
})
const selectProduct = (item: Category) => {
  // console.log('item', item.categoryId)
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