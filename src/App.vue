<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'

const text = ref('1234')
const router = useRouter();
// console.log('router =>', router);
const goPage = () => {
    router.push(`/nest/${text.value}`)
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <input type="text" v-model="text">
    <button @click="goPage">goPage</button>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>|
        <RouterLink to="/about">About</RouterLink>|
        <!-- <RouterLink to="/sample">Sample</RouterLink>|
        <RouterLink to="/sample2">Sample2</RouterLink>|
        <RouterLink to="/nest">Nest</RouterLink>|
        <RouterLink to="/nest/child">Nest Child</RouterLink>|
        <RouterLink :to="`/nest/${text}`">Dyna Link</RouterLink>| -->
        <RouterLink to="/order">Order</RouterLink>
      </nav>
    </div>
  </header>
   <RouterView />
</template>
<style scoped>

</style>
