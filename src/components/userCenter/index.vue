<template>
  <van-nav-bar fixed title="个人中心" left-text="返回" left-arrow @click-left="onClickLeft" />
  个人中心
  <div class="userCenter_box">
    <van-skeleton title :avatar="true" :row="3" :loading="loading">
      <div class="user-info">
        <div class="info">
          <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          <div class="user-desc">
            <span>用户名：{{ user.userName }}</span>
            <span>QQ：{{ user.QQ }} </span>
            <span>tel：{{ user.tel }}</span>
            <span class="name">个性签名：{{ user.introduceSign }}</span>
          </div>
        </div>
      </div>
    </van-skeleton>
    <ul class="user-list">
      <li class="van-hairline--bottom" @click="goTo('/myOrder')">
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('/myPublish')">
        <span>我发布的商品</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('/setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('/changePwd')">
        <span>修改密码</span>
        <van-icon name="arrow" />
      </li>
      <!-- <li @click="goTo('/about')">
      <span>关于我们</span>
      <van-icon name="arrow" />
    </li> -->
    </ul>
  </div>
</template>

<script setup lang="ts">
import router from '../../router';
const user = reactive({
  userName: 'DoKiDoKi',
  QQ: '1792147770',
  tel: '12345678977',
  introduceSign: '这个人很懒，什么都没留下',
})
let loading = ref<boolean>(true)

onMounted(async () => {
  // const { data } = await getUserInfo()
  // state.user = data
  loading.value = false
})

const onClickLeft = () => router.push({ path: '/' });
const goTo = (r: any, query?: any) => router.push({ path: r, query: query || {} })
</script>

<style scoped lang="scss">
.userCenter_box {
  padding-top: .4rem;
  padding-bottom: .4rem;

  .user-info {
    width: 94%;
    margin: 10px;
    height: 120px;
    background: #ffda46f0;
    box-shadow: 0 2px 5px #ffdb46;
    border-radius: 6px;

    .info {
      position: relative;
      display: flex;
      // width: 100%;
      // height: 100%;
      padding: 10px 20px;

      img {
        width: .3rem;
        height: .3rem;
        border-radius: 50%;
        margin-top: 4px;
        margin-right: .075rem;
      }

      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 18px;
        color: #fff;

        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }

      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;

        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }

  .user-list {
    padding: 0 20px;
    margin-top: 20px;

    li {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
</style>