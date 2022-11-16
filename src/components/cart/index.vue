<template>
  <van-nav-bar fixed title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="empty" v-if="!state.list.length">
    <img class="empty-cart" src="https://s.yezgea02.com/1604028375097/empty-car.png" alt="空购物车">
    <div class="title">购物车空空如也</div>
    <van-button class="button" round color="#ffdb46" type="primary" @click="goTo" block>前往选购</van-button>
  </div>

  <div class="goods" v-if="state.list.length > 0">
    <van-checkbox-group @change="groupChange" v-model="state.selected" ref="checkboxGroup">
      <van-swipe-cell :right-width="50" v-for="goods in state.list" :key="goods.id">
        <div class="goods_item">
          <van-checkbox :name="goods.id" />
          <van-card @click="showGoods(goods.id)" :price="goods.price.toFixed(2)" :desc="goods.detail"
            :title="goods.name" :thumb="goods.images[0]" />
        </div>
        <template #right>
          <van-button icon="delete" type="danger" class="delete-button" @click="deleteGoods(goods.id)" />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
    <div class="finally_text">已经到底啦~</div>
  </div>
  <van-submit-bar v-if="state.list.length > 0" class="submit" :price="total * 100" button-text="提交订单" @click="onSubmit">
    <van-checkbox @click.stop="allCheck" v-model:checked="state.checkAll">全选</van-checkbox>
  </van-submit-bar>

  <!-- 弹出层：地址编辑 -->
  <van-popup v-model:show="show" position="bottom" closeable round :style="{ height: '60%' }">
    <van-address-edit :style="{ padding: '52px 20px' }" :area-list="areaList" save-button-text="提交"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
  </van-popup>
  <Footer></Footer>
</template>

<script setup lang="ts">
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { reactive, ref } from 'vue';
import router from '../../router';
const onClickLeft = () => router.push({ path: '/' });
const show = ref(false);
let goodsList = reactive<Array<Good>>([
  {
    id: '001',
    images: ['https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg', 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'],
    name: 'ipad 2020 ',
    detail: '99新',
    price: 2000
  },
  {
    id: '002',
    images: ['https://imgservice.suning.cn/uimg1/b2c/image/Qk4Wz2xVcIM3lNkEjjUiRQ.jpg_800w_800h_4e_80Q_is', 'https://imgservice.suning.cn/uimg1/b2c/image/V3VOqtKUO7XYdzD5T7pd3g.jpg_800w_800h_4e_80Q_is', 'https://imgservice.suning.cn/uimg1/b2c/image/Zr_Fg0gAWDwIeJ7oya7qeA.jpg_800w_800h_4e_80Q_is'],
    name: '宝宝面霜',
    detail: '宝宝面霜润肤保湿滋润婴童润肤霜',
    price: 20
  },
  {
    id: '003',
    images: ['https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg', 'https://imgservice.suning.cn/uimg1/b2c/image/V3VOqtKUO7XYdzD5T7pd3g.jpg_800w_800h_4e_80Q_is', 'https://imgservice.suning.cn/uimg1/b2c/image/Zr_Fg0gAWDwIeJ7oya7qeA.jpg_800w_800h_4e_80Q_is'],
    name: 'ipad 2020 ',
    detail: '99新,这是一串无用的填充字符……这是一串无用的填充字符……这是一串无用的填充字符……这是一串无用的填充字符……这是一串无用的填充字符……这是一串无用的填充字符……这是一串无用的填充字符……这是一串无用的填充字符……',
    price: 2000
  },
  {
    id: '004',
    images: ['https://imgservice.suning.cn/uimg1/b2c/image/Qk4Wz2xVcIM3lNkEjjUiRQ.jpg_800w_800h_4e_80Q_is', 'https://imgservice.suning.cn/uimg1/b2c/image/V3VOqtKUO7XYdzD5T7pd3g.jpg_800w_800h_4e_80Q_is', 'https://imgservice.suning.cn/uimg1/b2c/image/Zr_Fg0gAWDwIeJ7oya7qeA.jpg_800w_800h_4e_80Q_is'],
    name: '宝宝面霜',
    detail: '宝宝面霜润肤保湿滋润婴童润肤霜',
    price: 20
  }
])
const state = reactive({
  checked: false,
  // list: new Array<Good>(),
  list: goodsList,
  all: false,
  selected: new Array<string>(),
  checkAll: false
})
const onSave = (content: any) => {
  Toast('save');
  // console.log(state.selected);
  console.log(content);
  show.value = !show.value; //如果成功，则关闭弹窗
}

const showPopup = () => {
  show.value = true;
};
const onSubmit = () => {
  if (state.selected.length > 0) {
    console.log('提交');
    console.log(state.selected);
    showPopup()
  } else {
    Toast('未选中任何商品')
    console.log('未选中商品');
  }
}
const goTo = () => router.push({ path: '/' })

type Good = {
  id: string
  images: Array<string>,
  name: string,
  detail: string
  price: number
}




const total = computed(() => {
  let sum = 0
  let _list: Array<Good> = state.list.filter(item => state.selected.includes(item.id))
  _list.forEach(item => {
    sum += item.price
  })
  return sum
})

onMounted(() => {
  init()
})

const init = async () => {
  Toast.loading({ message: '加载中...', forbidClick: true })
  // const { data } = await getCart({ pageNumber: 1 })
  // state.list = data
  // state.result = data.map(item => item.cartItemId)
  Toast.clear()
}
const showGoods = (goodsId: string) => {
  // console.log(goodsId);
  router.push({
    name: "GoodsItem",
    query: {
      id: goodsId
    }
  })
}
const deleteGoods = async (id: string) => {
  // await deleteCartItem(id)
  // store.dispatch('updateCart')
  console.log("删除");
  init()
}

const groupChange = (selected: []) => {
  console.log(1)
  if (selected.length == state.list.length) {
    console.log(2)
    state.checkAll = true
  } else {
    console.log(3)
    state.checkAll = false
  }
  state.selected = selected
}
const allCheck = () => {
  if (!state.checkAll) {
    state.selected = state.list.map(item => item.id)
  } else {
    state.selected = []
  }
}
</script>

<style scoped lang="scss">
.goods {
  padding-top: .5rem;
  background: #f6f6f6;
  height: 100%;
  padding-bottom: 1rem;

  &_item {
    margin: .04rem .1rem;
    border-radius: .1rem;
    overflow: hidden;
    background: white;
    padding: 0 .1rem;
    display: flex;
    // justify-content: space-between;

    ::v-deep .van-card {

      background: white;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 3rem;

      &__title {
        padding: .05rem 0;
        font-size: .12rem;
        font-weight: 500;
      }

      &__price {
        padding: .075rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: .075rem;

        &-currency {
          margin-right: .02rem;
        }

        span {
          font-size: .16rem;
          color: #FF4422;
          font-weight: 500;
        }
      }
    }
  }

  .finally_text {
    color: #666;
    text-align: center;
  }
}

::v-deep .van-swipe-cell__right {
  .van-button--danger {
    height: 100%;
    border-radius: 0.1rem;
    margin-left: -0px;
  }
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

.submit {
  margin-bottom: .45rem;
}

::v-deep .van-popup {

  .van-form,
  .van-address-edit {
    padding: 52px 20px;
  }
}
</style>