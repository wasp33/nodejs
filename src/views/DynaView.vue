<template>
    <div class="view">
        <h1>動態路由 (id: {{ id }})</h1>
        {{ person }}
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
const route = useRoute();
//console.log(route)
const { id }= route.params;
const person = ref({})
console.log(id);
onMounted( async() =>{
    const data = await axios.get(`https://randomuser.me/api/?seed=${id}`);
    person.value = data.data.results[0];
});

</script>