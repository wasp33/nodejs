<script setup>
import TheWelcome from '../components/TheWelcome.vue'

</script>

<template>
  <main>
     <div class="Home">
      <h1>Please go to Order</h1>
      <H1><router-link to="/order">Go to Order</router-link></H1>
    </div>
    <TheWelcome />
  </main>
</template>
