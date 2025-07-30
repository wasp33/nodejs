<script setup>
import { ref, computed,onMounted, onUnmounted } from 'vue'
const newName=ref('')
const newNumber=ref(0)
const reviewList = ref([])
const customOrder = ref({
  no: 0,
  total: 0,
  orderList: [{
    id: 0,
    name: '',
    price: 0,
    count: 0,
  }]
})
const customOrderList = ref([])
const addProduct = () => {
  console.log(newName.value)
  reviewList.value.push({
    no: new Date().getTime(),
    name: newName.value,
    price: newNumber.value
  })
  newName.value = ''
  newNumber.value = 0
  console.log(reviewList.value)
}
//ajax 才加入
onMounted(()=>{
  console.log('onMounted')
  setTimeout(()=>{
    console.log('setTimeout')
    reviewList.value =[
      { id: 1, name: '珍珠奶茶', price: 50 },
      { id: 2, name: '冬瓜檸檬', price: 45 },
      { id: 3, name: '翡翠檸檬', price: 55 },
      { id: 4, name: '四季春茶', price: 45 },
      { id: 5, name: '阿薩姆奶茶', price: 50 },
      { id: 6, name: '芒果綠茶',  price: 55 },
      { id: 7, name: '抹茶拿鐵',  price: 60 },
    ]
  },1000)
})
let intervalId =0;
const deleteProduct = (id) => {
  reviewList.value = reviewList.value.filter(item => item.id !== id)
  console.log(reviewList.value)
  reviewList.value.splice(id, 1)
}
const sum = computed(()=>{
  // return reviewList.value.reduce((acc,item)=>acc+item.price,0)

  return customOrder.value.orderList.reduce((acc,item)=>acc+item.price*item.count,0)
})
const orderProduct = (item) => {
  if (customOrder.value.no === 0 ) {
    customOrder.value.no = new Date().getTime()
     customOrder.value.orderList.splice(0, 1)
  }
  let found = false
  for (let i = 0; i < customOrder.value.orderList.length; i++) {
    if (customOrder.value.orderList[i].id === item.id) {
      customOrder.value.orderList[i].count++
      found = true
      break
    }
  }
  if (!found) {
    customOrder.value.orderList.push({id:item.id,name:item.name,price: item.price,count:1})
  }
  console.log(customOrder.value)
}
const addCount = (item) => {
  item.count++
}
const deductCount = (item) => {
  if (item.count > 0) {
    item.count--
  }
}
const applyOrder = () => {
  customOrder.value.total = sum.value
  customOrderList.value.push(customOrder.value)
  customOrder.value = {
    no: 0,
    total: 0,
    orderList: [{
      id: 0,
      name: '',
      price: 0,
      count: 0,
    }]
  }
}
onUnmounted(()=>{
  clearInterval(intervalId)
})
</script>
<template>
  <div>
    <h1>Review Page</h1>
    <p>This is the review page where you can see your reviews.</p>
    <input type="text" v-model="newName" placeholder="Enter your name">{{ newName }}
    <input type="number" v-model="newNumber" placeholder="Enter your number">{{ newNumber }}
    <button type="button" @click="addProduct">Add Product</button>
  </div>
  {{ reviewList }}
  <table class="tbl">
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>PriceAdj</th>
      <th>Delete</th>
    </tr>
    <tr v-for="item in reviewList" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.price }}</td>
      <td><input type="number" v-model="item.price" /></td>
      <td><button @click="deleteProduct(item.id)">Delete</button></td>
      <td><button @click="orderProduct(item)">order</button></td>

    </tr>
  </table>
   <br>
  {{ customOrder.no }} <button @click="applyOrder">Apply Order</button>
  <table class="tbl">
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Count</th>
    </tr>
    <tr v-for="item in customOrder.orderList" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.price }}</td>
      <td>{{ item.count }}</td>
      <td><button @click="addCount(item)">+</button></td>
      <td><button @click="deductCount(item)">-</button></td>
    </tr>
   </table>
    {{ sum }}
    <br>
    <div style="border: 1px solid #000;" v-for="item in customOrderList" :key="item.id">
      {{ item }}
    </div>
</template>
<style scoped>
.tbl {
  width: 100%;
  border-collapse: collapse;
  border-block-style: solid;
  border-block-width: 1px;
}
</style>
