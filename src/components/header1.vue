<script lang="ts" setup>
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useCounterStore } from '../stores/counter'

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
onMounted(() => {
  // 在组件被挂载后执行
  // 执行你的逻辑，例如路由导航
  router.push('/createAcc')
})
let headerAllArr: string[] = reactive(['創建/登入', '遊戲紀錄', '遊戲區', '購物商城', '購買清單'])
let allLink: string[] = reactive([
  '/createAcc',
  '/gameRecord',
  '/gameBox',
  '/shopping',
  '/buyLists'
])
</script>

<template>
  <div class="headerAll">
    <router-link v-for="(i, index) in headerAllArr" :to="allLink[index]" :key="index">{{
      i
    }}</router-link>
    <div class="personInfo" v-if="counterStore.loginCheck">
      <span>使用者:{{ counterStore.person.acc }}</span>
      <span>點數:{{ counterStore.person.point }}</span>
      <button @click="logOutMember">登出</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headerAll {
  border: 1px black solid;
  width: 100%;
  display: flex;
  padding: 10px 0px;
  justify-content: space-around;
  .personInfo {
    span {
      &:first-child,
      &:nth-child(2) {
        margin-right: 10px;
      }
    }
  }
}
</style>
