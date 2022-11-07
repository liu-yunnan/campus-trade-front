<template>
  <!-- 这是商品列表 -->
  <!-- <div class="goodslist"> -->
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

    <van-list class="goodslist" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="goodslist_item" v-for="good in goodsList" :key="good.id" @click="showGood(good.id)">
        <van-image width="1.7rem" height="1.5rem" fit="cover" :src="getImageUrl(good.images[0])" />
        <p>{{ good.name }}</p>
        <div class="money">
          <span>￥{{ good.price }}</span>
          <van-button icon="plus" size="mini" color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click.stop="addGood(good.id)">
            加购
          </van-button>
        </div>
      </van-cell>

    </van-list>
  </van-pull-refresh>


  <!-- <div class="goodslist_item" v-for="(good, id) in goodsList" :key="id" @click="showGood(good.id)">
      <img :src="getImageUrl(good.images[0])" alt="" srcset="">
      <van-image width="1.7rem" height="1.5rem" fit="cover" :src="getImageUrl(good.images[0])" />
      <p>{{ good.name }}</p>
      <div class="money">
        <span>￥{{ good.price }}</span>
        <van-button icon="plus" size="mini" color="linear-gradient(to right, #ff6034, #ee0a24)"
          @click.stop="addGood(good.id)">
          加购
        </van-button>
      </div>
    </div> -->

  <!-- <div class="goodslist_item">
      <img src="@/assets/img/面霜.png" alt="" srcset="">
      <p>宝宝面霜润肤保湿滋润婴童润肤霜</p>
      <div class="money">
        <span>￥{{ 2000 }}</span>
        <van-button icon="plus" size="mini" color="linear-gradient(to right, #ff6034, #ee0a24)">加购</van-button>
      </div>
    </div> -->

  <!-- <div class="goodslist_item">
      <img src="@/assets/img/ipad.jpeg" alt="" srcset="">
      <p>ipad 2020 99新 小天鹅(LittleSwan)本色系列 蓝氧特渍净 10KG滚筒洗衣机全自动洗烘一体 纤薄自由嵌TD100MS9ILZ</p>
      <div class="money">
        <span>￥{{ 2000 }}</span>
        <van-button icon="plus" size="mini" color="linear-gradient(to right, #ff6034, #ee0a24)">加购</van-button>
      </div>
    </div>

    <div class="goodslist_item">
      <img src="@/assets/img/ipad.jpeg" alt="" srcset="">
      <p>ipad 2020 99新 小天鹅(LittleSwan)本色系列 蓝氧特渍净 10KG滚筒洗衣机全自动洗烘一体 纤薄自由嵌TD100MS9ILZ</p>
      <div class="money">
        <span>￥{{ 2000 }}</span>
        <van-button icon="plus" size="mini" color="linear-gradient(to right, #ff6034, #ee0a24)">加购</van-button>
      </div>
    </div> -->

  <!-- </div> -->
</template>

<script setup lang="ts">
import router from '../../router';
let event: Event | undefined
type Good = {
  id: string
  images: Array<string>,
  name: string,
  detail: string
  price: number
}
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href;
};
let goodsList = reactive<Array<Good>>([
  {
    id: '001',
    images: ['ipad.jpeg'],
    name: 'ipad 2020 ',
    detail: '99新',
    price: 2000
  },
  {
    id: '002',
    images: ['面霜.png', '面霜.png', '面霜.png'],
    name: '宝宝面霜',
    detail: '宝宝面霜润肤保湿滋润婴童润肤霜',
    price: 20
  },
  {
    id: '003',
    images: ['ipad.jpeg'],
    name: 'ipad 2020 ',
    detail: '99新',
    price: 2000
  },
  {
    id: '004',
    images: ['面霜.png', '面霜.png', '面霜.png'],
    name: '宝宝面霜',
    detail: '宝宝面霜润肤保湿滋润婴童润肤霜',
    price: 20
  }
])
const addGood = (goodId: string) => {
  console.log(goodId);
}
const showGood = (goodId: string) => {
  // console.log(goodId);
  router.push({
    name: "GoodItem",
    query: {
      id: goodId
    }
  })
}

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      goodsList = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      goodsList.push(goodsList[0]);
    }
    loading.value = false;

    if (goodsList.length >= 30) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<style scoped lang="scss">
.goodslist {
  // margin-top: .08rem;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 3.7rem;
  background: #f6f6f6;
  margin-bottom: .4rem;

  &_item {
    width: 46%;
    height: 2.1rem;
    background: white;
    border-radius: .1rem;
    overflow: hidden;
    margin-bottom: .1rem;
    padding: 0;

    p {
      padding: 0 .05rem;
      font-size: .14rem;
      line-height: .175rem;
      font-weight: 600;
      color: #333;
      width: 100%;
      // 多出隐藏
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      box-sizing: border-box;
    }

    .money {
      // line-height: .3rem
      padding: .075rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: .075rem;

      span {
        font-size: .18rem;
        color: #FF4422;
        font-weight: bold;
      }
    }
  }
}

::v-deep .van-list__loading,
::v-deep .van-list__finished-text {
  margin: 0 auto;
  margin-top: -0.15rem;
}
</style>