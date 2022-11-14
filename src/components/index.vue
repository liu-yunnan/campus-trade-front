<template>
  <!-- <header>header</header>
  Home
  <p>猜你喜欢 <span class="iconfont">&#xe62e;</span></p>
  <GoodsList></GoodsList> -->
  <div class="wrap">
    <div class="header">
      <div class="header_top">
        <div class="header_top_iconbox" @click="goTo('/categories')">
          <span class="iconfont">&#xe62f;</span>
          <!-- <span class="txt">分类</span> -->
        </div>
        <!-- <img class="header_top_img" src="@/assets/img/headerbanner.png" alt=""> -->
        <div class="header_top_img">Campus Trade</div>
        <div class="header_top_iconbox" @click="goUserCenter()">
          <span class="iconfont">&#xe62b;</span>
          <!-- <span class="txt">个人中心</span> -->
        </div>
      </div>
      <div class="header_saerchbox">
        <van-search shape="round" background="rgb(0, 0, 0, 0)" placeholder="请输入搜索关键词" @click="goTo('/search')" />
      </div>
    </div>

    <div class="swiper_wrap">
      <van-swipe :autoplay="5000" lazy-render>
        <van-swipe-item v-for="image in images" :key="image">
          <!-- <img class="swipe_img" src="../assets/img/swiper2.gif" /> -->
          <img class="swipe_img" :src="getImageUrl(image)" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main">
      <!-- <div class="banner">
        <img src="@/assets/img/swiper2.gif" alt="">
      </div> -->
      <div class="iconlist">
        <div class="iconlist_item" @click="selectProduct(86)">
          <img src="@/assets/img/化妆护肤.png">
          <span>生活日用</span>
        </div>
        <div class="iconlist_item" @click="selectProduct(98)">
          <img src="@/assets/img/服装饰品.png">
          <span>服装饰品</span>
        </div>
        <div class="iconlist_item" @click="selectProduct(80)">
          <img src="@/assets/img/电子产品.png">
          <span>电子产品</span>
        </div>
        <div class="iconlist_item">
          <img src="@/assets/img/其他.png" @click="selectProduct()">
          <span>其他分类</span>
        </div>
        <div class="iconlist_item" @click="goToPublish">
          <img src="@/assets/img/发布商品.png">
          <span>发布商品</span>
        </div>
      </div>
      <p class="guessUlike">
        <img src="@/assets/img/猜你喜欢.webp" alt="">
      </p>
      <GoodsList></GoodsList>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import GoodsList from "./goods/goodsList.vue"
import router from "../router"
export default defineComponent({
  name: "Home",
  setup() {
    const getImageUrl = (name: string) => {
      return new URL(`../assets/img/${name}`, import.meta.url).href;
    };
    const images = [
      "swiper2.gif",
      "swiper1.png"
    ];
    const goCategories = () => {
      router.push({
        name: "Categories",
      })
    }
    const goUserCenter = () => {
      // 需要先判断用户的登录状态,如果没登录需要跳转到登录页
      // router.push({
      //   name: "UserCenter",
      // })
      router.push({
        name: "Login",
      })
    }
    const selectProduct = (id?: number) => {
      // 鉴权
      router.push({ path: '/search', query: { categoryId: id } })
    }
    const goToPublish = () => {
      router.push({ path: '/publishGoods' })
    }
    // async function testL() {
    //   let data = { 'data': 'xxxx' }
    //   const response = await test(data)
    //   console.log('response:', response);
    // }
    const goTo = (r: any, query?: any) => router.push({ path: r, query: query || {} })
    return {
      images,
      getImageUrl,
      goCategories,
      goUserCenter,
      goTo,
      selectProduct,
      goToPublish,
      // testL
    };
  },
  mounted: function () {
    // this.testL()
  },
  components: { GoodsList }
})
</script>

<style lang="scss" scoped>
.header {
  height: .9rem;
  background: #ffdb46;


  &_top {
    height: .45rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .04rem .14rem 0 .1rem;

    &_iconbox {
      display: flex;
      flex-direction: column;
      text-align: center;
      color: white;


      .iconfont {
        font-size: .21rem;
        font-weight: 600;
      }

      .txt {
        font-size: .11rem;
      }
    }

    &_img {
      // width: 1.5rem;
      // height: .5rem;
      text-align: center;
      color: white;
      font-size: .18rem;
      font-weight: 600;
    }
  }

  &_searchbox {
    height: .31rem;
  }
}

// van-search样式修改
::v-deep .van-search {
  padding-top: .04rem;

  &__content {
    background: white;
  }
}

// 轮播图区域
.swiper_wrap {
  background: url(../assets/img/swiperbgd.png);
  height: 1.5rem;
  background-size: 100% 100%;
  padding: auto;
}

::v-deep .van-swipe {
  // height: 1rem;
  width: 3.52rem;
  height: 1.53rem;
  margin: 0 .1rem;

  // .van-swipe-item {}

  .swipe_img {
    width: 3.52rem;
    height: 1.5rem;
    border-radius: .1rem;
  }
}

.main {
  background: #f6f6f6;

  .iconlist {
    width: 3.6rem;
    height: .8rem;
    margin: 0 auto;
    display: flex;
    padding: .05rem 0;

    &_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 20%;

      img {
        width: .475rem;
      }

      span {
        // width: ;
        font-size: .12rem;
        color: #555;
      }
    }
  }

  .guessUlike {
    // height: .475rem;
    padding: .1rem 0;
    background: rgba(255, 255, 255, 0.443);

    img {
      width: 100%;
    }
  }
}
</style>