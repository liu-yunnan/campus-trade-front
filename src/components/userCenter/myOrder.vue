<template>
  <van-nav-bar fixed title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="select_box">
    <van-cell title="选择日期区间" :value="state.timeArr" @click="state.show = true" />
    <van-calendar v-model:show="state.show" lazy-render :show-confirm="false" type="range" @confirm="onConfirm"
      color="#ffdb46" :min-date="new Date(2021, 1, 1)" />
  </div>
  <div class="empty" v-if="!state.orderList.length">
    <img class="empty-cart" src="@/assets/img/您还没有收到任何订单哦_.png" alt="空购物车">
    <div class="title">您在此期间没有订单~</div>
    <van-button class="button" round color="#ffdb46" type="primary" @click="goTo" block>前往选购</van-button>
  </div>
  <div class="main" v-if="state.orderList.length > 0">
    <div class="order_cart" v-for="order in state.orderList" :key="order.orderId" @click="showOrder(order.orderId)">
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
      <van-card v-for="item in order.goodsList" :key="item.id" :price="(item.price / 100).toFixed(2)"
        :desc="item.detail" :title="item.name" :thumb="item.images">
        <template #price-top>
          <div>{{ item.date }}</div>
        </template>
      </van-card>
      <div class="footer">
        <div class="footer_price">
          <span class="footer_price_integer">￥{{ computePrice(order.totalPrice / 100, 1) }}</span>
          <span class="footer_price_decimal">.{{ computePrice(order.totalPrice / 100, 2) }}</span>
        </div>
        <div class="footer_btn">
          <van-button :disabled="getTag(order.tag)" color="#ffdb46" type="primary" size="mini"
            @click.stop="dialog(order.orderId)">
            支付
          </van-button>
          <van-button :disabled="getTag(order.tag)" plain size="mini" @click.stop="onCancelOrder(order.orderId)">取消订单
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../../router';
import { Dialog, Toast } from 'vant';
import { computePrice } from '@/common/common'
import { getOrderList, payOrder, cancelOrder } from '@/service/order'

const state = reactive({
  // orderList: [{
  //   orderId: '0001',
  //   date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
  //   tag: 2, //未支付0 已支付1 已取消2
  //   goodsList: [{
  //     id: '001',
  //     images: ['ipad.jpeg'],
  //     name: 'ipad 2020 ',
  //     detail: '99新',
  //     price: 2000,
  //     tag: 1,
  //     date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  //   }],
  //   totalPrice: 4000,
  // },
  // {
  //   orderId: '0002',
  //   date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
  //   tag: 1, //未支付0 已支付1 已取消2
  //   goodsList: [{
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
  //     tag: 0,
  //     date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  //   },
  //   {
  //     id: '003',
  //     images: ['ipad.jpeg'],
  //     name: 'ipad 2020 ',
  //     detail: '99新',
  //     price: 2000,
  //     tag: 2,
  //     date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  //   },
  //   {
  //     id: '004',
  //     images: ['面霜.png', '面霜.png', '面霜.png'],
  //     name: '宝宝面霜',
  //     detail: '宝宝面霜润肤保湿滋润婴童润肤霜',
  //     price: 20,
  //     tag: 3,
  //     date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  //   }],
  //   totalPrice: 200,
  // },
  // {
  //   orderId: '0003',
  //   date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
  //   tag: 0, //未支付0 已支付1 已取消2
  //   goodsList: [{
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
  //     tag: 0,
  //     date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  //   },],
  //   totalPrice: 40,
  // },
  // ],
  orderList: [{
    orderId: '',
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    tag: 2, //未支付0 已支付1 已取消2
    goodsList: [{
      id: '',
      images: '',
      name: '',
      detail: '',
      price: 0,
      tag: 1,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }],
    totalPrice: 0,
  },],
  timeArr: '',
  show: false,
})
const formatDate = (date: any) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (values: [any, any]) => {
  const [start, end] = values;
  state.show = false;
  state.timeArr = `${formatDate(start)} - ${formatDate(end)}`;
  init(Date.parse(formatDate(start)), Date.parse(formatDate(end)))
};
// 支付确认
const dialog = (id: string) => {
  Dialog.confirm({
    message:
      '支付之后不可取消，确认支付订单吗？',
  }).then(async () => {
    const data = await payOrder(id, 3)
    init()
    Toast(data.msg)
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
const showOrder = (id: string) => {
  router.push({
    name: "OrderDetail",
    query: {
      id: id
    }
  })
}
const onCancelOrder = async (id: string) => {
  const data = await cancelOrder(id)
  Toast(data.msg)
}
const init = async (startTime?: number, endTime?: number) => {
  let data: any;
  if (startTime === undefined && endTime === undefined) {
    data = await getOrderList({
      data: {
        pageNo: 1,
        pageSize: 100,
      }
    })

  } else {
    data = await getOrderList({
      data: {
        beginDate: startTime,
        endDate: endTime,
        pageNo: 1,
        pageSize: 100,
      }
    })
  }
  console.log(data.data);
  state.orderList = data.data.result.map((item: any) => item = {
    orderId: item.id + '',
    date: formatDate(new Date(item.createTime)) + ' ' + new Date(item.createTime).getHours() + ':' + new Date(item.createTime).getMinutes() + ':' + new Date(item.createTime).getSeconds(),
    tag: item.orderStatus, //未支付0 已支付1 已取消2
    totalPrice: item.orderAmount,
    goodsList: item.goodsSnapshotDTO.map((goods: any) => goods = {
      id: goods.id,
      images: goods.picture,
      name: goods.title,
      detail: goods.detail,
      price: goods.amount,
      tag: goods.goodsStatus,
      date: goods.publishDate
    }),
  })

}
onMounted(() => {
  init()
})
const goTo = () => router.push({ path: '/' })
const onClickLeft = () => history.back();
</script>
 
<style scoped lang="scss">
.select_box {
  margin-top: 46px;
}

.empty {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 200px;

  .empty-cart {
    width: 150px;
    margin-bottom: 20px;
  }

  .van-icon-smile-o {
    font-size: 50px;
  }

  .title {
    font-size: 16px;
    margin-bottom: 20px;
  }
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

      &_price {
        &_integer {
          font-size: 0.16rem;
          font-weight: bold;
        }

        &_decimal {
          font-size: 0.1rem;
        }
      }

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