<template>
  <div>
    <van-nav-bar fixed title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="goodsitem">
      <!-- 用户 -->
      <div class="goodsitem_user">
        <div class="goodsitem_user_head">
          <van-image round width=".4rem" height=".4rem" fit="cover" :src="goods.user.head" />
        </div>
        <div class="goodsitem_user_detail">
          <p class="goodsitem_user_detail_name">{{ goods.user.name }}</p>
          <p class="goodsitem_user_detail_QQ">QQ: {{ goods.user.qq }}</p>
          <p class="goodsitem_user_detail_QQ"> Tel: {{ goods.user.tel }}</p>
        </div>
      </div>
      <!-- 分割线 -->
      <van-divider :style="{ color: '#ffdb46', borderColor: '#ffdb46', padding: '0 0px', margin: '10px 0' }">
        商品详情
      </van-divider>
      <!-- 商品详情 -->
      <div class="goodsitem_money">
        <span class="goodsitem_money_integer">￥{{ computePrice(goods.price, 1) }}</span>
        <span class="goodsitem_money_decimal">.{{ computePrice(goods.price, 2) }}</span>
      </div>

      <div class="goodsitem_n">
        <pre class="goodsitem_n_name">{{ goods.name }}</pre>
        <pre class="goodsitem_n_detail">{{ goods.detail }}</pre>
      </div>

      <div class="goodsitem_image">
        <img v-for="image in goods.images" :src="image" :key="image" alt="" srcset="">
      </div>

      <!-- <div class="goodsitem_finally_text">没有更多了~</div> -->
    </div>
    <van-action-bar>
      <!-- <van-action-bar-icon icon="chat-o" text="聊一聊" /> -->
      <van-action-bar-icon icon="cart-o" text="购物车" @click="goToCart" />
      <van-action-bar-button @click="addGoods" type="warning" text="加入购物车" />
      <van-action-bar-button @click="submit" type="danger" text="立即购买" />
    </van-action-bar>
  </div>
  <!-- 弹出层：地址编辑 -->
  <van-popup v-model:show="show" position="bottom" closeable round :style="{ height: '60%' }">
    <van-address-edit :style="{ padding: '52px 20px' }" :area-list="areaList" save-button-text="提交"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
  </van-popup>
</template>

<script setup lang="ts">
import { getGoodsItem } from '@/service/goods';
import { areaList } from '@vant/area-data';
import { Toast } from 'vant';
import { computePrice, getLocal } from '@/common/common'
import router from '../../router';
import { addGoodsToCart } from '@/service/cart';
import { creatOrder } from '@/service/order';
let route = useRoute();
let id = route.query.id as string
type User = {
  // id: string,
  name: string,
  head: string,
  tel: string,
  qq: string
}
type Goods = {
  id: string
  images: Array<string>,
  name: string,
  detail: string
  price: number,
  user: User,
}
const goods = ref<Goods>({
  id: '',
  images: [],
  name: '',
  detail: '',
  price: 0,
  user: {
    // id: '5568',
    name: '',
    head: '',
    tel: '',
    qq: '',
  }
});
onMounted(
  async () => {
    // console.log('zzz')
    const { data } = await getGoodsItem(id)
    goods.value = {
      id: data.id,
      images: data.images.map((pic: any) => pic = pic.url),
      name: data.title,
      detail: data.detail,
      price: data.price,
      user: {
        name: data.username,
        head: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        tel: data.tel,
        qq: data.qq
      }
    }
    // console.log(data);
  }
)

const show = ref(false);
const onSave = async (content: any) => {
  // console.log("选中商品", state.selected);
  // console.log("下单人信息", content);
  await creatOrder({
    data: {
      addressDetail: content.addressDetail,
      city: content.city,
      district: content.county, //区
      goodsIds: [id],
      phone: content.tel,
      province: content.province,
    }
  })
  Toast('save');
  show.value = !show.value; //如果成功，则关闭弹窗
}
const showPopup = () => {
  show.value = true;
};
const addGoods = async () => {
  await addGoodsToCart(id).then((res: any) => {
    console.log('addGoods', res.data);
    if (res.data === true) {
      Toast(res.msg)
    } else {
      Toast('商品已加购，不能重复加购')
    }
  }).catch((err: any) => {
    Toast(err.msg)
  })
}
const submit = () => {
  // console.log(id);
  showPopup()
}
const goToCart = () => {
  if (getLocal('token') !== '') {
    router.push({ name: 'Cart' })
  } else {
    router.push({ name: 'Login' })
  }
}

// console.log(id);
const onClickLeft = () => history.back();
</script>

<style scoped lang="scss">
.goodsitem {
  margin-top: .5rem;
  margin-bottom: 1rem;

  &_user {
    padding: .09rem;
    display: flex;
    justify-content: left;

    &_head {
      padding-right: .1rem;
    }

    &_detail {
      width: 100%;
      font-size: .15rem;
      // color: #333;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &_QQ {
        padding-top: .05rem;
        font-size: .12rem;
      }
    }
  }

  &_money {
    padding: 0rem .1rem;
    padding-right: .075rem;

    &_integer {
      font-size: 0.2rem;
      color: #FF4422;
      font-weight: bold;
    }

    &_decimal {
      font-size: 0.12rem;
      color: #FF4422;
      font-weight: bold;
    }
  }

  &_n {

    display: flex;
    flex-direction: column;
    margin: .1rem;
    line-height: .18rem;
    font-size: .15rem;

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      line-height: 140%;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB, Microsoft Yahei, sans-serif;
    }

    &_name {
      font-size: .16rem;
      font-weight: 600;

    }

    &_detail {
      word-wrap: break-word;
      word-break: break-all;
      margin-top: .08rem;
    }
  }

  &_image {

    text-align: center;
    overflow: hidden;
    // border-radius: .1rem;

    img {
      width: 90%;
      margin: .1rem;
      // border: 1px solid #333;
      border-radius: .05rem;
    }
  }

  &_finally_text {
    color: #666;
    text-align: center;
  }

}

::v-deep .van-action-bar {
  bottom: .45rem;
}
</style>