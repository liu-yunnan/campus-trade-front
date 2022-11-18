<script setup lang="ts">

const key = computed(() => {
  let route = useRoute()
  // console.log('路由key', route.path + Math.random());
  return route.path + Math.random()
})
</script>

<template>
  <router-view :key="key" />
  <Footer></Footer>
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
