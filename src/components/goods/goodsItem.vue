<template>
  <div>
    <van-nav-bar fixed title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="goodsitem">
      <!-- 用户 -->
      <div class="goodsitem_user">
        <div class="goodsitem_user_head">
          <van-image round width=".4rem" height=".4rem" fit="cover" :src="good.user.head" />
        </div>
        <div class="goodsitem_user_detail">
          <p class="goodsitem_user_detail_name">{{ good.user.name }}</p>
          <p class="goodsitem_user_detail_QQ">QQ: {{ good.user.tel }}</p>
        </div>
      </div>
      <!-- 分割线 -->
      <van-divider :style="{ color: '#ffdb46', borderColor: '#ffdb46', padding: '0 0px', margin: '10px 0' }">
        商品详情
      </van-divider>
      <!-- 商品详情 -->
      <div class="goodsitem_money">
        <span>￥{{ good.price }}</span>
      </div>

      <div class="goodsitem_n">
        <pre class="goodsitem_n_name">{{ good.name }}</pre>
        <pre class="goodsitem_n_detail">{{ good.detail }}</pre>
      </div>

      <div class="goodsitem_image">
        <img v-for="image in good.images" :src="image" :key="image" alt="" srcset="">
      </div>



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
import { areaList } from '@vant/area-data';
import { Toast } from 'vant';
import { LocationQueryValue } from 'vue-router';
import router from '../../router';
let route = useRoute();
let id = route.query.id as LocationQueryValue
type User = {
  id: string,
  name: string,
  head: string,
  tel: number
}
type Good = {
  id: string
  images: Array<string>,
  name: string,
  detail: string
  price: number,
  user: User,
}
const show = ref(false);
const onSave = (content: any) => {
  Toast('save');
  console.log(id);
  console.log(content);
  show.value = !show.value; //如果成功，则关闭弹窗
}
const showPopup = () => {
  show.value = true;
};
const addGoods = () => {
  console.log(id);
}
const submit = () => {
  console.log(id);
  showPopup()
}
const goToCart = () => {
  router.push({ name: 'Cart' })
}
const getGoods = (id: LocationQueryValue) => {
  let good: Good = {
    id: '002',
    images: ['https://imgservice.suning.cn/uimg1/b2c/image/Qk4Wz2xVcIM3lNkEjjUiRQ.jpg_800w_800h_4e_80Q_is', 'https://imgservice.suning.cn/uimg1/b2c/image/V3VOqtKUO7XYdzD5T7pd3g.jpg_800w_800h_4e_80Q_is', 'https://imgservice.suning.cn/uimg1/b2c/image/Zr_Fg0gAWDwIeJ7oya7qeA.jpg_800w_800h_4e_80Q_is'],
    name: '宝宝面霜',
    detail: '宝宝面霜润肤保湿滋润婴童润肤霜 \n全新',
    price: 20,
    user: {
      id: '5568',
      name: 'Beauty',
      head: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
      tel: 123456789
    }
  }
  console.log(id);
  return good
}
let good: Good = getGoods(id)
console.log(id);
const onClickLeft = () => history.back();
</script>

<style scoped lang="scss">
.goodsitem {
  margin-top: .5rem;

  &_user {
    padding: .09rem;
    display: flex;
    justify-content: left;

    &_head {
      padding-right: .1rem;
    }

    &_detail {
      font-size: .15rem;
      color: #333;
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
    // line-height: .3rem
    padding: 0rem .1rem;
    // padding-bottom: .05rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: .075rem;

    span {
      font-size: .2rem;
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

    &_name {
      font-size: .16rem;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB, Microsoft Yahei, sans-serif;
    }

    &_detail {
      margin-top: .08rem;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB, Microsoft Yahei, sans-serif;
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

}

::v-deep .van-action-bar {
  bottom: .45rem;
}
</style>