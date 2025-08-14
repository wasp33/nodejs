<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import indexedDB from '../utils/indexedDB'
const airbnbDB = new indexedDB('airbnb')
airbnbDB.openStore()
</script>

<template>
  <main>
     <div class="Home">
      <H1><router-link to="/order">Go to Order</router-link></H1>
    </div>
    <TheWelcome />
  </main>
</template>
