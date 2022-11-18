<template>
  <van-nav-bar fixed title="我发布的商品" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="select_box">
    <van-cell title="选择日期区间" :value="state.timeArr" @click="state.show = true" />
    <van-calendar v-model:show="state.show" type="range" @confirm="onConfirm" color="#ffdb46"
      :min-date="new Date(2021, 1, 1)" />
  </div>
  <div class="main">
    <!-- 我发布的商品 -->
    <van-card v-for="(item) in state.goodsList" :key="item.id" :price="item.price.toFixed(2)" :desc="item.detail"
      :title="item.name" :thumb="item.image" @click-thumb="showGoods(item.id)">
      <template #tags>
        <van-tag plain type="danger">{{ item.tag === 1 ? '新发布' : item.tag === 2 ? '已上架' : item.tag === 4 ? '已下架' :
            '已售出'
        }}
        </van-tag>
      </template>
      <template #price-top>
        <div>{{ item.date }}</div>
      </template>
      <template #footer>
        <van-button :disabled="getTag(item.tag, 1)" size="mini" @click="onUpGoods(item)">上架
        </van-button>
        <van-button :disabled="getTag(item.tag, 2)" size="mini" @click="onDownGoods(item)">下架
        </van-button>
        <van-button :disabled="getTag(item.tag, 3)" size="mini" @click="onUpdateGoods(item.id)">编辑
        </van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import router from '../../router';
import { getPubGoods, upGoods, downGoods } from '@/service/goods'
import { Toast } from 'vant';
import { getLocal, computePrice } from '@/common/common';
type Goods = {
  id: string,
  image: string,
  name: string,
  detail: string,
  price: number,
  tag: 1 | 2 | 4 | 8, // 1：新发布 2：上架 4：下架 8：已售出 
  date: string
}
const state = reactive({
  goodsList: new Array<Goods>(),
  timeArr: '',
  show: false,
})
//   {
//     id: '001',
//     images: ['ipad.jpeg'],
//     name: 'ipad 2020 ',
//     detail: '99新',
//     price: 2000,
//     tag: 1,
//     date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
//   },
//   {
//     id: '002',
//     images: ['面霜.png', '面霜.png', '面霜.png'],
//     name: '宝宝面霜',
//     detail: '宝宝面霜润肤保湿滋润婴童润肤霜',
//     price: 20,
//     tag: 2,
//     date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
//   },
//   {
//     id: '003',
//     images: ['ipad.jpeg'],
//     name: 'ipad 2020 ',
//     detail: '99新',
//     price: 2000,
//     tag: 4,
//     date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
//   },
//   {
//     id: '004',
//     images: ['面霜.png', '面霜.png', '面霜.png'],
//     name: '宝宝面霜',
//     detail: '宝宝面霜润肤保湿滋润婴童润肤霜',
//     price: 20,
//     tag: 8,
//     date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
//   }
// ])

// 获取日期
onMounted(async () => {
  const { data } = await getPubGoods()
  state.goodsList = data.map((item: any) => item = {
    id: item.goodsId + '',
    image: item.cover,
    name: item.title,
    detail: item.detail,
    tag: item.state,
    date: item.publishDate,
    price: item.price
  })
})

const formatDate = (date: any) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
// 获取日期区间的订单
const onConfirm = async (values: [any, any]) => {
  const [start, end] = values;
  state.show = false;
  state.timeArr = `${formatDate(start)} - ${formatDate(end)}`;
  const { data } = await getPubGoods(Date.parse(formatDate(start)), Date.parse(formatDate(end)))
  state.goodsList = data
};

const showGoods = async (goodsId: string) => {
  router.push({
    name: "GoodsItem",
    query: {
      id: goodsId
    }
  })
}
const onUpGoods = async (goods: Goods) => {
  await upGoods(goods.id).then((res: any) => {
    if (res.code === 200) {
      Toast(res.msg)
      goods.tag = 2
    }
  })
}
const onDownGoods = async (goods: Goods) => {
  await downGoods(goods.id).then((res: any) => {
    if (res.code === 200) {
      Toast(res.msg)
      goods.tag = 4
    }
  })
}
const onUpdateGoods = (goodsId: string) => {
  if (getLocal('token') !== '') {
    router.push({
      path: '/update',
      query: {
        goodsId: goodsId
      }
    })
  }

}


const getTag = (tag: number, btn: 1 | 2 | 3) => {
  if (tag === 1) { //新发布
    if (btn === 1 || btn === 3) {
      return false
    }
    return true
  }
  if (tag === 2) { //已上架
    if (btn === 2) {
      return false
    }
    return true
  }
  if (tag === 4) { //已下架
    if (btn === 1 || btn === 3) {
      return false
    }
    return true
  }
  if (tag === 8) { //已售出
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