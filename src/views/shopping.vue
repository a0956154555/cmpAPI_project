<template>
  <div class="shoppingAll">
    <div v-for="i in allCards" class="sigleCardAll" @click="checkBuy(i.name, i.price)">
      <img :src="i.picRoute" alt="" />
      <div>{{ i.name }}</div>
      <div>需要 : {{ i.price }} 點</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '../stores/counter'
import { nextTick } from 'vue'
import { computed, ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
const counterStore = useCounterStore()
const checkBuy = (name: string, price: number): void => {
  if (counterStore.person.point < price) {
    alert('點數不足')
    return
  }
  if (confirm(`是否購買${name}? `)) {
    counterStore.person.point -= price
  }
}
interface singlePic {
  name: string
  picRoute: string
  price: number
}
let allCards: Ref<singlePic[]> = ref([
  {
    name: '圓嘟嘟藍藍豚鑰匙圈',
    picRoute: '../../public/all_images/6526c327c3284.png',
    price: 10
  },
  {
    name: '湛藍海豚抱枕',
    picRoute: '../../public/all_images/6526c1ff572ac.jpg',
    price: 25
  },
  {
    name: '微笑鯊魚娃娃',
    picRoute: '../../public/all_images/6526c4dba72fe.jpg',
    price: 50
  },
  {
    name: '粉紅海豹抱枕',
    picRoute: '../../public/all_images/6526c6aa3718a.png',
    price: 120
  },
  {
    name: '黑鯊抱枕',
    picRoute: '../../public/all_images/6526c27c7cb13.jpg',
    price: 333
  },
  {
    name: '艾利鯊鯊枕',
    picRoute: '../../public/all_images/6526ce01edd19.png',
    price: 450
  },
  {
    name: 'QQ長長橘橘',
    picRoute: '../../public/all_images/6526ce347f0fa.png',
    price: 20
  },
  {
    name: '水水藍藍',
    picRoute: '../../public/all_images/6526ce742341b.jpg',
    price: 111
  }
])
// let allRecords: Ref<records[]> = ref([])
</script>
<style lang="scss" scoped>
.shoppingAll {
  width: 100%;

  //   border: 3px red solid;
  padding: 20px 10px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .sigleCardAll {
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px black solid;
    cursor: pointer;
    width: calc(25% - 10px);
    margin: 0px 5px 20px;
    height: 300px;
    img {
      width: 80%;
    }
  }
}
</style>
