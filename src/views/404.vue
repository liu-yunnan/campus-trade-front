<template>
  <div class="main">
    <img src="@/assets/img/404error.png" alt="" srcset="">
    <h1>404 not found</h1>
    <van-button color="#ffdb46" type="primary" to="/">返回首页</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "404",
  setup() {
    return {
      // msg: "hello World ",
    }
  }
})
</script>
<style scoped lang="scss">
img {
  width: 60%;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;

  h1 {
    padding-bottom: .15rem;
  }
}
</style>