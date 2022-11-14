<template>
  <!-- 这是商品列表 -->
  <!-- <div class="goodslist"> -->
  <van-pull-refresh v-model="state.isLoading" @refresh="onRefresh">
    <van-list class="goodslist" v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了"
      @load="onLoad">
      <van-cell class="goodslist_item" v-for="good in state.list" :key="good.id" @click="showGoods(good.id)">
        <van-image width="1.8rem" height="1.5rem" fit="cover" :src="getImageUrl(good.images[0])" />
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
</template>

<script setup lang="ts">
import { Toast } from 'vant';
import router from '../../router';
let event: Event | undefined
type Good = {
  id: string
  images: Array<string>,
  name: string,
  detail: string
  price: number
}
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
const state = reactive({
  //传递给后端的参数
  incomePayData: {
    pageNumber: 1, //请求第几页
    pageSize: 10, //每页请求的数量
  },
  list: goodsList,
  listTwo: [], //用于上拉加载时将数据合并
  total: 0, //总页数
  isLoading: false, //下拉刷新
  loading: false, //上拉加载
  finished: false, //加载与不加载的状态
})
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href;
};

const addGood = (goodsId: string) => {
  console.log(goodsId);
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
const getPassAnalysisList = function () {
  // getPassAnalysisList(this.incomePayData).then(res => {
  //   if (res.code == '10000') {
  //     this.list = res.data.records; //将接口返回赋值data定义的数组
  //     this.total = res.data.total; //将接口返回的总数据条数赋值data中定义的total
  //     if (this.list.length >= this.total) { //将返回数据长度与总条数进行比较控制加载不加载的状态
  //       this.finished = true;
  //     }
  //   }
  // })
}
// 下拉刷新
const onRefresh = () => {
  state.incomePayData.pageNumber = 1; //起始为第一页
  state.finished = false; //加载与不加载的状态
  setTimeout(() => {
    state.isLoading = false; //下拉刷新状态
    getPassAnalysisList() //刷新成功调用列表方法
    Toast('刷新成功'); //轻提示信息
  }, 700);
};
// 上拉加载
const onLoad = () => {
  // setTimeout(() => {
  //   if (refreshing.value) {
  //     goodsList = [];
  //     refreshing.value = false;
  //   }

  //   for (let i = 0; i < 10; i++) {
  //     goodsList.push(goodsList[0]);
  //   }
  //   loading.value = false;

  //   if (goodsList.length >= 30) {
  //     finished.value = true;
  //   }
  // }, 1000);
  state.incomePayData.pageNumber++; //加载时页码递增
  // getPassAnalysisList(state.incomePayData).then((res: any) => {
  //   if (res.code == '10000') {
  //     state.listTwo = res.data.records; //将接口返回赋值data定义的数组
  //     state.total = res.data.total; //将接口返回的总数据条数赋值data中定义的total
  //     state.listTwo.forEach(item => { //循环返回的数据并将数据添加到list中
  //       state.list.push(item)
  //     })
  //     // 加载状态结束 状态更新为false
  //     state.loading = false;
  //     if (state.list.length >= state.total) { //将返回数据长度与总条数进行比较控制加载不加载的状态
  //       state.finished = true;
  //     }
  //   }
  // })

};
onMounted(() => {
  getPassAnalysisList()
})
</script>

<style scoped lang="scss">
.goodslist {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: #f6f6f6;
  margin-bottom: .4rem;
  padding-top: .08rem;

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
        font-size: 0.14rem;
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