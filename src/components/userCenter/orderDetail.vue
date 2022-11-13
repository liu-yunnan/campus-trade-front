<template>
  <div>
    <!-- 订单详情 -->
    <van-nav-bar fixed title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="main">
      <van-divider :style="{ color: '#ffdb46', borderColor: '#ffdb46', padding: '0 16px' }">
        订单地址
      </van-divider>
      <div class="user">
        <div class="user_name">姓名：{{ state.order.userName }}</div>
        <div class="user_tel">电话：{{ state.order.tel }}</div>
        <div class="user_address">收件地址：{{ state.order.address }}</div>
      </div>
      <van-divider :style="{ color: '#ffdb46', borderColor: '#ffdb46', padding: '0 16px' }">
        订单详情
      </van-divider>
      <div class="order_cart">
        <div class="header">
          <div class="header_tag">
            <van-tag plain type="danger" size="medium">{{ state.order.tag === 0 ? '未支付' : state.order.tag === 1 ? '已支付'
                : state.order.tag
                  === 2 ? '已取消' :
                  '已售出'
            }}
            </van-tag>
          </div>
          <div class="header_time">
            {{ state.order.date }}
          </div>
        </div>
        <van-card v-for="item in state.order.goodsList" :key="item.id" :price="item.price" :desc="item.detail"
          :title="item.name" :thumb="getImageUrl(item.images[0])" @click="showGoods(item.id)">
          <template #price-top>
            <div>{{ item.date }}</div>
          </template>
        </van-card>
        <div class="footer">
          <div class="footer_price">
            ￥{{ state.order.totalPrice }}
          </div>
          <div class="footer_btn">
            <!-- 支付 -->
            <van-button :disabled="getTag(state.order.tag)" color="#ffdb46" type="primary" size="mini"
              @click="dialog(state.order.orderId)">
              支付
            </van-button>
            <!-- 取消订单 -->
            <van-button :disabled="getTag(state.order.tag)" plain size="mini">取消订单
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dialog } from 'vant';
import router from '../../router';

const onClickLeft = () => history.back();

const state = reactive({
  order: {
    userName: 'DoKi',
    tel: '13000000000',
    address: '山西省太原市太原理工大学明向校区山西省太原市太原理工大学明向校区山西省太原市太原理工大学明向校区山西省太原市太原理工大学明向校区山西省太原市太原理工大学明向校区山西省太原市太原理工大学明向校区',
    orderId: '0001',
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
    }, {
      id: '002',
      images: ['ipad.jpeg'],
      name: 'ipad 2020 ',
      detail: '99新',
      price: 2000,
      tag: 1,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }, {
      id: '003',
      images: ['ipad.jpeg'],
      name: 'ipad 2020 ',
      detail: '99新',
      price: 2000,
      tag: 1,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }],
    totalPrice: 4000,
  }
})
const getOrder = () => {
  let route = useRoute();
  const orderId = route.query.id
  console.log(orderId);
}
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href;
};
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
const getTag = (tag: number) => {
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
const showGoods = (goodsId: string) => {
  // console.log(goodId);
  router.push({
    name: "GoodsItem",
    query: {
      id: goodsId
    }
  })
}
</script>

<style scoped lang="scss">
.main {
  margin: .5rem .1rem;
  // box-shadow: 4px 4px 6px #f4f4f4, -2px -2px 2px #f4f4f4;
  // border-radius: .1rem;
  padding-top: .1rem;

  .user {
    margin: .1rem .1rem;
    padding: .18rem .18rem;
    box-shadow: 4px 4px 6px #f4f4f4, -2px -2px 2px #f4f4f4;
    border-radius: .1rem;
    line-height: .2rem;
    font-size: .14rem;

    &_address {
      padding-top: .075rem;
      line-height: .2rem;
      width: 100%;
    }
  }

  .order_cart {
    box-shadow: 4px 4px 6px #f4f4f4, -2px -2px 2px #f4f4f4;
    border-radius: .1rem;
    background: white;
    padding: .075rem .12rem;
    margin-top: .125rem;
    margin: 0 .1rem;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .075rem;
      padding-right: .13rem;

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