<template>
  <h1>404 not found</h1>
  <van-button plain type="primary" to="/">返回首页</van-button>
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