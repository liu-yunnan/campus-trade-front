<template>
  <van-nav-bar fixed title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="select_box">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="state.value1" :options="option1" />
      <van-dropdown-item v-model="state.value2" :options="option2" />
    </van-dropdown-menu>
  </div>
  <div class="main">
    <div class="order_cart" v-for="order in state.orderList" :key="order.orderId">
      <div class="header">
        <div class="header_tag">
          <van-tag plain type="danger" size="medium">{{ order.tag === 0 ? '未支付' : order.tag === 1 ? '已支付' : order.tag
              === 2 ? '已取消' :
              '已售出'
          }}
          </van-tag>
        </div>
        <div class="header_time">
          {{ order.date }}
        </div>
      </div>
      <van-card v-for="item in order.goodsList" :key="item.id" :price="item.price" :desc="item.detail"
        :title="item.name" :thumb="getImageUrl(item.images[0])" @click-thumb="showGoods(item.id)">
        <template #price-top>
          <div>{{ item.date }}</div>
        </template>
      </van-card>
      <div class="footer">
        <div class="footer_price">
          ￥{{ order.totalPrice }}
        </div>
        <div class="footer_btn">
          <van-button :disabled="getTag(order.tag, 1)" color="#ffdb46" type="primary" size="mini"
            @click="dialog(order.orderId)">
            支付
          </van-button>
          <van-button :disabled="getTag(order.tag, 2)" plain size="mini">取消订单
          </van-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import router from '../../router';
import { Dialog } from 'vant';
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href;
};
const state = reactive({
  orderList: [{
    orderId: '0001',
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    tag: 2, //未支付0 已支付1 已取消2
    goodsList: [{
      id: '001',
      images: ['ipad.jpeg'],
      name: 'ipad 2020 ',
      detail: '99新',
      price: 2000,
      tag: 1,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }],
    totalPrice: 4000,
  },
  {
    orderId: '0002',
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    tag: 1, //未支付0 已支付1 已取消2
    goodsList: [{
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
    }],
    totalPrice: 200,
  },
  {
    orderId: '0003',
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    tag: 0, //未支付0 已支付1 已取消2
    goodsList: [{
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
    },],
    totalPrice: 40,
  },
  ],
  value1: 0,
  value2: 'a'
})
const option1 = [
  { text: '全部订单', value: 0 },
  { text: '未支付', value: 1 },
  { text: '已支付', value: 2 },
  { text: '已取消', value: 3 },
];
const option2 = [
  { text: '时间降序', value: 'a' },
  { text: '时间升序', value: 'b' },
];
const dialog = (id: string) => {
  Dialog.confirm({
    message:
      '支付之后不可取消，确认支付订单吗？',
  })
    .then(() => {
      console.log('已支付', id);
    })
    .catch(() => {
      // on cancel
    });
}
const getTag = (tag: number, btn: 1 | 2) => {
  // btn 1：支付 2:取消订单
  if (tag === 0) { //未支付
    return false
  }
  if (tag === 1) { //已支付
    // if (btn === 2) {
    //   return false
    // }
    return true
  }
  if (tag === 2) { //已取消
    return true
  }
}
const showGoods = (goodId: string) => {
  // console.log(goodId);
  router.push({
    name: "GoodsItem",
    query: {
      id: goodId
    }
  })
}

const onClickLeft = () => history.back();
</script>
 
<style scoped lang="scss">
.select_box {
  margin-top: 46px;
}

.main {
  padding: .01rem .1rem .54rem;

  background: #f6f6f6;
  // height: 100%;

  .order_cart {
    box-shadow: 4px 4px 6px #f4f4f4, -2px -2px 2px #f4f4f4;
    border-radius: .1rem;
    background: white;
    padding: .075rem;
    margin-top: .1rem;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .1rem;

      &_tag {
        margin: .05rem .1rem;
      }
    }

    .footer {
      padding: .1rem .1rem;
      font-size: .16rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // color: #FF4422;

      &_btn {
        margin-top: -10px;
      }
    }

  }

  ::v-deep .van-card {
    background: rgba(250, 250, 250, 0.652);
    border-radius: .1rem;

    // box-shadow: 4px 4px 6px #f4f4f4, -2px -2px 2px #f4f4f4;
    // margin-top: .1rem;
    // font-size: 15px;
    &__title {
      font-size: .12rem;
      // line-height: 0;
      // padding: .2rem 0;
      margin-bottom: 6px;
    }

    &__desc {
      margin-top: 6px;
    }

    &__price {
      margin-top: .06rem;
    }

    &__footer {
      flex: none;
      text-align: right;
      margin-top: -0.2rem;
    }
  }
}
</style>