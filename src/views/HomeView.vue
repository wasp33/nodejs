<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <div class="Home">
      <h1><router-link to="/order">Go to Order</router-link></h1>
    </div>
    <TheWelcome />
  </main>
</template>
