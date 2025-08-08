<script setup>
import { ref, computed,onMounted, onUnmounted } from 'vue'
const newName=ref('')
const newDesc=ref('')
const newNumber=ref(0)
const newStock=ref(0)
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
    desc: newDesc.value,
    price: newNumber.value,
    stock: newStock.value
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
      { id: 1, name: '珍珠奶茶',desc:'香濃奶茶搭配QQ珍珠', price: 50 ,stock:100},
      { id: 2, name: '冬瓜檸檬',desc:'清新冬瓜配上新鮮檸檬', price: 45 ,stock:100},
      { id: 3, name: '翡翠檸檬',desc:'綠茶與檸檬的完美結合', price: 55 ,stock:100},
      { id: 4, name: '四季春茶',desc:'香醇四季春茶，回甘無比', price: 45 ,stock:100},
      { id: 5, name: '阿薩姆奶茶',desc:'阿薩姆紅茶搭配香醇鮮奶', price: 50 ,stock:100},
      { id: 6, name: '芒果綠茶',desc:'芒果與綠茶的獨特風味', price: 55 ,stock:100},
      { id: 7, name: '抹茶拿鐵',desc:'抹茶與鮮奶的絕配', price: 60 ,stock:100},
    ]
  },1000)
})
let intervalId =0;
const addStock = (id) => {
  let index = reviewList.value.findIndex(item => item.id == id)
  console.log(reviewList.value)
  reviewList.value[index].stock++
}
const deductStock = (id) => {
  let index = reviewList.value.findIndex(item => item.id == id)
  console.log(reviewList.value)
  if (reviewList.value[index].stock > 0) {
    reviewList.value[index].stock--
  }
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
  deductStock(item.id)
}
const addCount = (itemorder) => {
  const work = reviewList.value.findIndex(item => item.id == itemorder.id)
  if (work!=-1) {
    itemorder.count++
    deductStock(itemorder.id)
  }
}
const deductCount = (itemorder) => {
  const work = reviewList.value.findIndex(item => item.id == itemorder.id)
  if (itemorder.count > 0) {
    itemorder.count--
    reviewList.value[work].stock++
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
const saveName = (item) => {
  item.edit = false
}
</script>
<template>
  <div>
    <h1>菜單</h1>
    <p>品項如下:</p>
    <input type="text" v-model="newName" placeholder="Enter your name">{{ newName }}
    <input type="text" v-model="newDesc" placeholder="Enter your desc">{{ newDesc }}
    price:<input type="number" v-model="newNumber" placeholder="Enter your price">{{ newNumber }}
    stock:<input type="number" v-model="newStock" placeholder="Enter your stock">{{ newStock }}
    <button type="button" @click="addProduct">Add Product</button>
  </div>
  {{ reviewList }}
  <table class="tbl">
    <tr>
      <th>Name</th>
      <th>Desc</th>
      <th>Stock</th>
      <th>Price</th>
      <th>StockAdj</th>
      <th>Delete</th>
    </tr>
    <tr v-for="item in reviewList" :key="item.id">
      <td ><input type="text" v-model="item.name" @click="item.edit=true" placeholder="Enter your name"><button @click="saveName(item)" v-show="item.edit">save</button></td>
      <td>{{ item.desc }}</td>
      <td>{{ item.stock }}</td>
      <td>{{ item.price }}</td>
      <td><button @click="addStock(item.id)">+</button><button @click="deductStock(item.id)">-</button></td>
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
      <td >{{ item.name }}</td>
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
.tbl th, .tbl td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}
</style>
