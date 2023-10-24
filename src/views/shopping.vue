<template>
  <div class="chooseTypeAll">
    <div
      v-for="(i, index) in showOnceType"
      :key="index"
      class="singleType"
      @click="showWhichProd(i)"
    >
      {{ i }}
    </div>
  </div>
  <section class="cards">
    <article
      class="card"
      :class="'card--' + (index + 1)"
      v-for="(i, index) in nowTypeArr"
      :key="i.name"
      ref="card"
      @click.prevent.stop="fav_list1(i.type, i.name, i.price, i.picRoute)"
    >
      <div class="card__info-hover">
        <svg class="card__like" viewBox="0 0 24 24">
          <path
            :fill="
              counterStore.fav_list.findIndex((v) => v.name == i.name) > -1 ? '#FF0000' : '#000000'
            "
            d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
          />
        </svg>
        <div class="card__clock-info">
          <svg class="card__clock" viewBox="0 0 24 24">
            <path
              d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z"
            /></svg
          ><span class="card__time">15 min</span>
        </div>
      </div>
      <div class="card__img" :style="{ backgroundImage: `url(${i.picRoute})` }"></div>
      <a href="#" class="card_link">
        <div class="card__img--hover" :style="{ backgroundImage: `url(${i.picRoute})` }"></div>
      </a>
      <div class="card__info" @click.stop="checkBuy(i.name, i.price, i.picRoute)">
        <span class="card__category">{{ i.type }}</span>
        <h3 class="card__title">{{ i.name }}</h3>
        <span class="card__by"
          >點數 <a href="#" class="card__author" title="author">{{ i.price }}點</a></span
        >
      </div>
    </article>
  </section>
</template>
<script setup lang="ts">
import { useCounterStore } from '../stores/counter'
import { nextTick } from 'vue'
import { computed, ref, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
const counterStore = useCounterStore()
const showOnceType = computed(() => {
  const uniqueTypeSet = new Set<string>()

  allCards.value.forEach((card) => {
    uniqueTypeSet.add(card.type)
  })
  const uniqueTypesArray = Array.from(uniqueTypeSet)
  uniqueTypesArray.unshift('所有種類')

  return uniqueTypesArray
})
const bkImg = (route: string) => {
  return `/cmpAPI_project/all_images/${route}`
}
const nowTypeArr = ref<singlePic[]>([])

const showWhichProd = (i: string): void => {
  nowTypeArr.value = []
  if (i == '所有種類') {
    nowTypeArr.value = allCards.value
    return
  }
  allCards.value.forEach((item) => {
    if (item.type == i) {
      nowTypeArr.value.push(item)
      console.log(nowTypeArr.value)
    }
  })
}
const fav_list1 = (type: string, name: string, price: number, src: string): void => {
  for (let i = 0; i < counterStore.fav_list.length; i++) {
    if (counterStore.fav_list[i].name == name) {
      counterStore.fav_list.splice(i, 1)
      return
    }
  }
  counterStore.fav_list.push({
    name: name,
    type: type,
    point: price,
    src: src
  })
  console.log(counterStore.fav_list)
}
const checkBuy = (name: string, price: number, src: string): void => {
  if (counterStore.person.point < price) {
    alert('點數不足')
    return
  }
  if (confirm(`是否購買${name}? `)) {
    counterStore.person.point -= price
    interface pushInButList {
      src: string
      name: string
      date: string
      price: number
    }
    const newOne: pushInButList = {
      src: src,
      name: name,
      date: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
      price: price
    }
    counterStore.allBuyList.push(newOne)
    console.log(counterStore.allBuyList)
  }
}
interface singlePic {
  name: string
  type: string
  picRoute: string
  price: number
}
let allCards: Ref<singlePic[]> = ref([
  {
    name: '圓嘟嘟藍藍豚鑰匙圈',
    type: '飾品',
    picRoute: '/cmpAPI_project/all_images/6526c327c3284.png',
    price: 10
  },
  {
    name: '湛藍海豚抱枕',
    type: '抱枕',
    picRoute: '/cmpAPI_project/all_images/6526c1ff572ac.jpg',
    price: 25
  },
  {
    name: '微笑鯊魚娃娃',
    type: '娃娃',
    picRoute: '/cmpAPI_project/all_images/6526c4dba72fe.jpg',
    price: 50
  },
  {
    name: '粉紅海豹抱枕',
    type: '抱枕',
    picRoute: '/cmpAPI_project/all_images/6526c6aa3718a.png',
    price: 120
  },
  {
    name: '黑鯊抱枕',
    type: '抱枕',
    picRoute: '/cmpAPI_project/all_images/6526c27c7cb13.jpg',
    price: 333
  },
  {
    name: '艾利鯊鯊枕',
    type: '抱枕',
    picRoute: '/cmpAPI_project/all_images/6526ce01edd19.png',
    price: 450
  },
  {
    name: 'QQ長長橘橘',
    type: '娃娃',
    picRoute: '/cmpAPI_project/all_images/6526ce347f0fa.png',
    price: 20
  },
  {
    name: '水水藍藍',
    type: '娃娃',
    picRoute: '/cmpAPI_project/all_images/6526ce742341b.jpg',
    price: 111
  }
])
nowTypeArr.value = allCards.value
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

@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700');
@import url('https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');

* {
  box-sizing: border-box;
}

body,
html {
  font-family: 'Roboto Slab', serif;
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0;
}

body {
  background-color: #d2dbdd;
  display: flex;
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  justify-content: center;
  align-items: center;
}
.chooseTypeAll {
  position: absolute;
  left: 20px;
  top: 20%;
  width: 100px;
  height: 500px;

  .singleType {
    width: 100%;
    border-bottom: 1px rgb(69, 68, 68) solid;
    padding: 5px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: hsla(160, 100%, 37%, 0.2);
    }
  }
}
.cards {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  flex-wrap: wrap;
  height: 500px;
}

.card__like {
  width: 18px;
}

.card__clock {
  width: 15px;
  vertical-align: middle;
  fill: #ad7d52;
}
.card__time {
  font-size: 12px;
  color: #ad7d52;
  vertical-align: middle;
  margin-left: 5px;
}

.card__clock-info {
  float: right;
}

.card__img {
  visibility: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 235px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card__info-hover {
  cursor: pointer;
  position: absolute;
  padding: 16px;
  width: 100%;
  opacity: 0;
  top: 0;
}

.card__img--hover {
  transition: 0.2s all ease-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  height: 235px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  top: 0;
}
.card {
  margin-right: 25px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  width: 33.3%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
}
.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
  transform: scale(1.1, 1.1);
}

.card__info {
  cursor: pointer;
  z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px 24px 24px 24px;
}

.card__category {
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #868686;
}

.card__title {
  margin-top: 5px;
  margin-bottom: 10px;
  font-family: 'Roboto Slab', serif;
}

.card__by {
  font-size: 12px;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
}

.card__author {
  font-weight: 600;
  text-decoration: none;
  color: #ad7d52;
}

.card:hover .card__img--hover {
  height: 100%;
  opacity: 0.3;
}

.card:hover .card__info {
  background-color: transparent;
  position: relative;
}

.card:hover .card__info-hover {
  opacity: 1;
}
</style>
