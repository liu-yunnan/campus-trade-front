<template>
  <van-nav-bar fixed title="发布商品" left-text="返回" left-arrow @click-left="onClickLeft" />

  <div class="main">
    <van-form @submit="onSubmit">
      <!-- 发布商品 -->
      <van-cell-group inset>
        <van-field v-model="state.goodsName" label="商品名称" name="goodsName" placeholder="请输入商品名称" />
        <van-field v-model="state.price" type="number" label="商品价格" name="price" placeholder="请输入商品价格" />
        <van-field name="uploader" label="图片上传">
          <template #input>
            <van-uploader v-model="state.images" :after-read="afterRead" @delete="onDeleteImg" />
          </template>
        </van-field>

        <!-- <van-field v-model="state.categoryId"  label="商品详情" name="category"  >
          <van-action-sheet v-model:show="show" title="选择商品分类">
            <div class="content">
              <van-picker title="选择商品分类" :columns="category" :columns-field-names="columnsFieldName" />
            </div>
          </van-action-sheet>
        </van-field> -->

        <van-field v-model="state.categoryName" is-link readonly name="picker" label="商品分类" placeholder="点击选择商品分类"
          @click="onShowPicker" />
        <van-popup v-model:show="showPicker" position="bottom">
          <div class="content">
            <van-picker title="选择商品分类" @confirm="onConfirm" @cancel="showPicker = false" :columns="category"
              :columns-field-names="columnsFieldName" />
          </div>
        </van-popup>
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
import { postImg } from '@/service/image'
import { pubGoods } from '@/service/goods'
import { getCategries } from '@/service/categries';
import { Toast } from 'vant';
import router from '@/router';
const state = reactive({
  goodsName: '',
  detail: '',
  price: '',
  images: new Array<any>(),
  uploadImg: new Array<any>(),
  categoryId: -1,
  categoryName: '',
})
const onSubmit = async (content: any) => {
  // console.log('state', state);
  // console.log('content', content);
  const getImgIds = (arr: Array<any>) => {
    return arr.map(item => item = item.id)
  }
  await pubGoods({
    data: {
      categoriesId: state.categoryId,
      detail: state.detail,
      images: getImgIds(state.uploadImg),
      price: Number(state.price).toFixed(2),
      title: state.goodsName
    }
  }).then((res: any) => {
    // console.log("price", Number(state.price).toFixed(2));
    if (res.code === 200) {
      Toast(res.msg)
      router.push({ path: '/' })
    }
  })

}


// 选择器相关
const showPicker = ref(false);
const category = ref<Array<any>>();
const columnsFieldName = {
  text: 'categoryName',
  values: 'categoryId',
  children: 'children'
}
const onConfirm = (value: any) => {
  // console.log('onConfirm ', value[2].categoryId);
  state.categoryId = value[2].categoryId;
  state.categoryName = value[2].categoryName
  showPicker.value = false;
};
const onShowPicker = async () => {
  showPicker.value = true
  const { data } = await getCategries()
  category.value = data
  // console.log(category);
}

// 图片上传
const afterRead = async (file: any) => {
  let img = new FormData();
  img.append('file', file.file)

  postImg({ data: { img } }, "multipart/form-data").then((res: any) => {
    // console.log('res', res);
    if (res.code === 200) {
      state.uploadImg.push({
        id: res.data.id,
        url: res.data.url,
        name: file.file.name,
        size: file.file.size,
        lastModified: file.file.lastModified,
      })
      // console.log('upload', state.uploadImg);
      // console.log('images', state.images);
    }
  })
  // console.log(file);
};
// 删除图片
const onDeleteImg = (file: any) => {
  // console.log(file.file);
  for (let i = 0; i < state.uploadImg.length; i++) {
    if (file.file.name === state.uploadImg[i].name
      && file.file.size === state.uploadImg[i].size
      && file.file.lastModified === state.uploadImg[i].lastModified) {
      state.uploadImg.splice(i, 1)
      break
    }
  }
  // console.log('upload', state.uploadImg);
  // console.log('images', state.images);
}
// 返回上层
const onClickLeft = () => history.back();
</script>

<style scoped lang="scss">
.content {
  padding: 16px 16px 0px;
}

.main {
  margin-top: .5rem;
}
</style>