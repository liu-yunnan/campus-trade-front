<template>
  <!-- 这是商品列表 -->
  <!-- <div class="goodslist"> -->
  <van-pull-refresh v-model="state.isLoading" @refresh="onRefresh">
    <van-list class="goodslist" v-model:loading="state.loading" :immediate-check="false" :finished="state.finished"
      finished-text="没有更多了" @load="onLoad">
      <van-cell class="goodslist_item" v-for="goods in state.list" :key="goods.id" @click="showGoods(goods.id)">
        <van-image width="1.8rem" height="1.5rem" fit="cover" :src="goods.images" />
        <div class="goodslist_item_introduciton">
          <p>{{ goods.name }}</p>
          <div class="detail">{{ goods.detail }}</div>
          <div class="money">
            <div class="money_price">
              <span class="money_price_integer">￥{{ computePrice(goods.price, 1) }}</span>
              <span class="money_price_decimal">.{{ computePrice(goods.price, 2) }}</span>
            </div>
            <van-button icon="plus" size="mini" color="linear-gradient(to right, #ff6034, #ee0a24)"
              @click.stop="addGood(goods.id)">
              加购
            </van-button>
          </div>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { Toast } from 'vant';
import router from '../../router';
import { selectGoodsList } from '@/service/goods'
import { addGoodsToCart } from '@/service/cart'
import { computePrice } from '@/common/common'
type Goods = {
  id: string,
  images: string,
  name: string,
  detail: string,
  price: number,
}
/* 对外暴露方法 */
function onSearch(keyword: string, categoryId: number = -1) {
  state.keyword = keyword
  state.categoryId = categoryId

  // 初始化参数
  state.pageData.pageNumber = 0
  state.list = new Array<Goods>()

  getGoodsList()
}
defineExpose({
  onSearch
})

const state = reactive({
  //传递给后端的参数
  pageData: {
    pageNumber: 0, //请求第几页
    pageSize: 20, //每页请求的数量
  },
  keyword: '',
  categoryId: -1,
  list: new Array<Goods>(),
  total: 0, //总页数
  isLoading: false, //下拉刷新
  loading: false, //上拉加载
  finished: false, //加载与不加载的状态
})

const addGood = async (goodsId: string) => {
  await addGoodsToCart(goodsId).then((res: any) => {
    if (res.data === true) {
      Toast(res.msg)
    } else {
      Toast('商品已加购，不能重复加购')
    }
  }).catch((err: any) => {
    Toast(err.msg)
  })
}
const showGoods = (goodsId: string) => {
  router.push({
    name: "GoodsItem",
    query: {
      id: goodsId
    }
  })
}
const getGoodsList = async () => {
  state.pageData.pageNumber++; //加载时页码递增
  await selectGoodsList(state.categoryId, state.keyword, state.pageData.pageNumber, state.pageData.pageSize, '').then((res: any) => {
    if (res.code == 200) {
      let newList: Array<Goods> = res.data.result.map((item: any) => item = {
        id: item.id + '',
        detail: item.detail,
        price: item.price,
        images: item.cover,
        name: item.title,
      }); //将接口返回赋值data定义的数组
      state.total = res.data.totalCount; //将接口返回的总数据条数赋值data中定义的total
      newList.forEach(item => { //循环返回的数据并将数据添加到list中
        state.list.push(item)
      })
      // 加载状态结束 状态更新为false
      state.loading = false;
      if (state.list.length >= state.total) { //将返回数据长度与总条数进行比较控制加载不加载的状态
        state.finished = true;
      }
    }
  })
}
// 下拉刷新
const onRefresh = () => {

  state.pageData.pageNumber = 0 //起始为第一页
  state.finished = false; //加载与不加载的状态
  state.list = new Array<Goods>()
  // console.log("refresh", state.pageData.pageNumber);
  setTimeout(() => {
    state.isLoading = false; //下拉刷新状态
    getGoodsList() //刷新成功调用列表方法
    Toast('刷新成功'); //轻提示信息
  }, 700);
};
// 上拉加载
const onLoad = async () => {
  // console.log("load", state.pageData.pageNumber);
  setTimeout(() => {
    getGoodsList()
  }, 700)
};
</script>

<style scoped lang="scss">
.goodslist {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  background: #f6f6f6;
  padding-bottom: .4rem;
  padding-top: .08rem;
  min-height: 4.5rem;

  &_item {
    width: 46%;
    height: 2.6rem;
    background: white;
    border-radius: .1rem;
    overflow: hidden;
    margin-bottom: .1rem;
    padding: 0;
    box-sizing: border-box;
    margin-left: .1rem;

    &_introduciton {
      padding: .05rem .05rem;

      p {
        font-size: .14rem;
        font-weight: 600;
        // color: #333;
      }

      .detail {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .12rem;
        // color: #333;
      }

      .money {
        // line-height: .3rem
        padding: .07rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: .075rem;

        &_price {
          &_integer {
            font-size: 0.16rem;
            color: #FF4422;
            font-weight: bold;
          }

          &_decimal {
            font-size: 0.1rem;
            color: #FF4422;
            font-weight: bold;
          }
        }

      }
    }

  }
}

// .goodslist:last-child .goodslist_item:last-child {
//   background-color: #FF4422;
// }

::v-deep .van-list__loading,
::v-deep .van-list__finished-text {
  width: 100%;
  margin: 0 auto;
}
</style>