<template>
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/">
      <van-icon class="iconfont" class-prefix='icon'>&#xe62e;</van-icon>
      <span>猜你喜欢</span>
    </van-tabbar-item>
    <van-tabbar-item to="/categories">
      <van-icon class="iconfont" class-prefix='icon'>&#xe652;</van-icon>
      <span>分类</span>
    </van-tabbar-item>
    <van-tabbar-item to="/cart">
      <van-icon class="iconfont" class-prefix='icon'>&#xe61b;</van-icon>
      <span>购物车</span>
    </van-tabbar-item>
    <van-tabbar-item to="/userCenter">
      <van-icon class="iconfont" class-prefix='icon'>&#xe615;</van-icon>
      <span>个人中心</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Toast } from 'vant';
const active = ref(0);
// const onChange = (index: any) => Toast(`标签 ${index}`);
</script>

<style scoped lang="scss">
::v-deep .van-tabbar {

  &-item {
    padding-bottom: 10px;

    // display: flex;
    &__text {
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;

      .iconfont {
        font-size: 0.20rem;
        margin: .05rem 0 .025rem 0;
      }

      span {
        font-size: .1rem;
      }

      span:active {
        font-weight: 600;
      }
    }

    &--active {
      color: #ffdb46;
    }
  }
}
</style>