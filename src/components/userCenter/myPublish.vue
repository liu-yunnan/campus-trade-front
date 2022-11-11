<template>
  <van-nav-bar fixed title="我发布的商品" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="select_box">
    <van-cell title="选择日期区间" :value="state.timeArr" @click="state.show = true" />
    <van-calendar v-model:show="state.show" type="range" @confirm="onConfirm" color="#ffdb46"
      :min-date="new Date(2021, 1, 1)" />
  </div>
  <div class="main">
    <!-- 我发布的商品 -->
    <van-card v-for="item in state.goodsList" :key="item.id" :price="item.price" :desc="item.detail" :title="item.name"
      :thumb="getImageUrl(item.images[0])" @click-thumb="showGoods(item.id)">
      <template #tags>
        <van-tag plain type="danger">{{ item.tag === 0 ? '新发布' : item.tag === 1 ? '已上架' : item.tag === 2 ? '已下架' : '已售出'
        }}
        </van-tag>
      </template>
      <template #price-top>
        <div>{{ item.date }}</div>
      </template>
      <template #footer>
        <van-button :disabled="getTag(item.tag, 1)" size="mini" @click="upGoods(item.id)">上架
        </van-button>
        <van-button :disabled="getTag(item.tag, 2)" size="mini" @click="downGoods(item.id)">下架
        </van-button>
        <van-button :disabled="getTag(item.tag, 3)" size="mini" @click="updateGoods(item.id)">编辑
        </van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import router from '../../router';

type Good = {
  id: string
  images: Array<string>,
  name: string,
  detail: string,
  price: number,
  tag: 0 | 1 | 2 | 3, // 0：新发布 1：上架 2：下架 3：已售出 
  date: string
}
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href;
};
const state = reactive({
  goodsList: new Array<Good>(),
  timeArr: '',
  show: false,
})
const formatDate = (date: any) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (values: [any, any]) => {
  const [start, end] = values;
  state.show = false;
  state.timeArr = `${formatDate(start)} - ${formatDate(end)}`;
  // 获取日期区间的订单
};

state.goodsList = reactive<Array<Good>>([
  {
    id: '001',
    images: ['ipad.jpeg'],
    name: 'ipad 2020 ',
    detail: '99新',
    price: 2000,
    tag: 1,
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  },
  {
    id: '002',
    images: ['面霜.png', '面霜.png', '面霜.png'],
    name: '宝宝面霜',
    detail: '宝宝面霜润肤保湿滋润婴童润肤霜',
    price: 20,
    tag: 0,
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  },
  {
    id: '003',
    images: ['ipad.jpeg'],
    name: 'ipad 2020 ',
    detail: '99新',
    price: 2000,
    tag: 2,
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  },
  {
    id: '004',
    images: ['面霜.png', '面霜.png', '面霜.png'],
    name: '宝宝面霜',
    detail: '宝宝面霜润肤保湿滋润婴童润肤霜',
    price: 20,
    tag: 3,
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  }
])
const showGoods = (goodId: string) => {
  // console.log(goodId);
  router.push({
    name: "GoodsItem",
    query: {
      id: goodId
    }
  })
}
const updateGoods = (goodsId: string) => {
  console.log('修改商品信息', goodsId);
  router.push({
    path: '/update',
    query: {
      goodsId: goodsId
    }
  })
}
const downGoods = (goodsId: string) => {
  console.log('下架',);
}
const upGoods = (goodsId: string) => {
  console.log('上架', goodsId);
}
const getTag = (tag: number, btn: 1 | 2 | 3) => {
  if (tag === 0) { //新发布
    if (btn === 1 || btn === 3) {
      return false
    }
    return true
  }
  if (tag === 1) { //已上架
    if (btn === 2) {
      return false
    }
    return true
  }
  if (tag === 2) { //已下架
    if (btn === 1 || btn === 3) {
      return false
    }
    return true
  }
  if (tag === 3) { //已售出
    return true
  }
}
const onClickLeft = () => history.back();
</script>
 
<style scoped lang="scss">
.select_box {
  margin-top: 46px;
}

.main {
  padding: 0 .1rem .5rem;
  // background: #f6f6f6;
  // height: 100%;

  ::v-deep .van-card {
    background: white;
    border-radius: .1rem;
    box-shadow: 4px 4px 6px #f4f4f4, -2px -2px 2px #f4f4f4;
    margin-top: .15rem;
    padding: .16rem;

    &__footer {
      flex: none;
      text-align: right;
      margin-top: -0.2rem;
    }
  }
}
</style>