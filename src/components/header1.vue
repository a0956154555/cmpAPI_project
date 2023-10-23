<script lang="ts" setup>
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useCounterStore } from '../stores/counter'
import { vElementHover } from '@vueuse/components'
const counterStore = useCounterStore()
const router = useRouter()
const logOutMember = () => {
  counterStore.person = reactive({
    acc: 'nan',
    password: 'nan',
    email: 'nan',
    point: 0
  })
  counterStore.loginCheck = false
  counterStore.allRecords = []
}
const logOut = () => {
  counterStore.person = reactive({
    acc: 'nan',
    password: 'nan',
    email: 'nan',
    point: 0
  })
}
onMounted(() => {
  // 在组件被挂载后执行
  // 执行你的逻辑，例如路由导航
  router.push('/createAcc')
})
// hover改變字體
const isHovered = reactive(Array(6).fill(false)) // 假设有 6 个链接
let isSingleHover: Ref<boolean> = ref(false)
const onHover = (state: boolean, index: number) => {
  isHovered[index] = state
}
const onSingleHover = (state: boolean) => {
  isSingleHover.value = state
}
let headerAllArr: string[] = reactive(['遊戲紀錄', '遊戲區', '購物商城', '購買清單', '珍藏清單'])
let headerAllEngArr: string[] = reactive(['Records', 'Game', 'Shopping', 'BuyList', 'FavList'])
let allLink: string[] = reactive(['/gameRecord', '/gameBox', '/shopping', '/buyLists', '/FavLists'])
</script>

<template>
  <!-- <div class="headerAll">
    <router-link v-for="(i, index) in headerAllArr" :to="allLink[index]" :key="index">{{
      i
    }}</router-link>
    <div class="personInfo" v-if="counterStore.loginCheck">
      <span>使用者:{{ counterStore.person.acc }}</span>
      <span>點數:{{ counterStore.person.point }}</span>
      <button @click="logOutMember">登出</button>
    </div>
  </div> -->

  <header class="header">
    <div href="" class="logo">
      {{ counterStore.person.acc == 'nan' ? 'TS' : 'USER : ' + counterStore.person.acc }}
      <span v-if="counterStore.person.acc !== 'nan'">Point:{{ counterStore.person.point }}</span>
      <button @click="logOut" v-if="counterStore.person.acc !== 'nan'">登出</button>
    </div>

    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
    <ul class="menu">
      <router-link
        to="/createAcc"
        class="singleLink"
        v-element-hover="(state) => onSingleHover(state)"
        v-if="counterStore.person.acc == 'nan'"
        >{{ isSingleHover ? 'Sign/Join' : '創建/登入' }}</router-link
      >
      <router-link
        v-for="(i, index) in headerAllArr"
        :to="allLink[index]"
        :key="index"
        class="singleLink"
        v-element-hover="(state) => onHover(state, index)"
        >{{ isHovered[index] ? headerAllEngArr[index] : headerAllArr[index] }}</router-link
      >
      <!-- <li><a href="#work">Our Work</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#careers">Careers</a></li>
      <li><a href="#contact">Contact</a></li> -->
    </ul>
  </header>
</template>

<style lang="scss" scoped>
// .headerAll {
//   border: 1px black solid;
//   width: 100%;
//   display: flex;
//   padding: 10px 0px;
//   justify-content: space-around;
//   .personInfo {
//     span {
//       &:first-child,
//       &:nth-child(2) {
//         margin-right: 10px;
//       }
//     }
//   }
// }

body {
  margin: 0;
  font-family: Helvetica, sans-serif;
  background-color: #f4f4f4;
}

a {
  color: #000;
}

/* header */

.header {
  background-color: #fff;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
  // position: fixed;
  width: 100%;
  z-index: 3;
}

.header ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  background-color: #fff;
}

.header li a {
  display: block;
  padding: 20px 20px;
  border-right: 1px solid #f4f4f4;
  text-decoration: none;
}

.header li a:hover,
.header .menu-btn:hover {
  background-color: #f4f4f4;
}

.header .logo {
  display: block;
  float: left;
  font-size: 1.5em;
  padding: 10px 20px;
  text-decoration: none;
  span {
    color: rgb(248, 90, 90);
    font-size: 14px;
  }
}

/* menu */

.header .menu {
  clear: both;
  max-height: 0;
  transition: max-height 0.2s ease-out;
  display: flex;
  .singleLink {
    display: block;
    padding: 20px 20px;
    width: 120px;
    border-right: 1px solid #f4e7e7;
    text-decoration: none;
  }
}

/* menu icon */

.header .menu-icon {
  cursor: pointer;
  display: inline-block;
  float: right;
  padding: 28px 20px;
  position: relative;
  user-select: none;
}

.header .menu-icon .navicon {
  background: #333;
  display: block;
  height: 2px;
  position: relative;
  transition: background 0.2s ease-out;
  width: 18px;
}

.header .menu-icon .navicon:before,
.header .menu-icon .navicon:after {
  background: #333;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  transition: all 0.2s ease-out;
  width: 100%;
}

.header .menu-icon .navicon:before {
  top: 5px;
}

.header .menu-icon .navicon:after {
  top: -5px;
}

/* menu btn */

.header .menu-btn {
  display: none;
}

.header .menu-btn:checked ~ .menu {
  max-height: 240px;
}

.header .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.header .menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.header .menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}

/* 48em = 768px */

@media (min-width: 48em) {
  .header li {
    float: left;
  }
  .header li a {
    padding: 20px 30px;
  }
  .header .menu {
    clear: none;
    float: right;
    max-height: none;
  }
  .header .menu-icon {
    display: none;
  }
}
</style>
