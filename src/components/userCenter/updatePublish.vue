<template>
  <van-nav-bar fixed title="编辑商品" left-text="返回" left-arrow @click-left="onClickLeft" />

  <div class="main">
    <van-form @submit="onSubmit">
      <!-- 发布商品 -->
      <van-cell-group inset>
        <van-field v-model="state.goodsName" label="商品名称" name="goodsName" placeholder="请输入商品名称" />
        <van-field v-model="state.price" type="number" label="商品价格" name="price" placeholder="请输入商品价格" />
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="state.images" :after-read="afterRead" />
          </template>
        </van-field>
        <van-field v-model="state.detail" rows="2" autosize label="商品详情" name="detail" type="textarea" maxlength="100"
          placeholder="请输入商品详情" show-word-limit />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" color="#ffdb46">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
let route = useRoute();
const goodsId = route.query.id
const state = reactive({
  id: goodsId,
  goodsName: '宝宝面霜',
  detail: '宝宝面霜润肤保湿滋润婴童润肤霜 \n全新',
  price: '20',
  images: [
    { url: 'https://imgservice.suning.cn/uimg1/b2c/image/Zr_Fg0gAWDwIeJ7oya7qeA.jpg_800w_800h_4e_80Q_is' },
  ]
})
const onSubmit = (content: any) => {
  console.log(state);
  console.log(content);
  console.log('xx');
}
const afterRead = (file: object) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};
const onClickLeft = () => history.back();
</script>

<style scoped lang="scss">
.main {
  margin-top: .5rem;
}
</style>