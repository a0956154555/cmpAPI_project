<template>
  <div class="buyListsAll">
    <div v-if="counterStore.person.email == 'nan'">尚未登入</div>
    <div class="listAll" v-else>
      <div class="buyTitle">購買清單</div>
      <div class="allCardsBox">
        <div v-for="i in counterStore.allBuyList" class="singleCard">
          <img :src="i.src" alt="" />
          <div class="prodDetail">
            <div>品名 : {{ i.name }}</div>
            <div>日期 : {{ i.date }}</div>
            <div>點數 : {{ i.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()
const router = useRouter()
</script>
<style lang="scss" scoped>
.buyListsAll {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .listAll {
    width: 90%;
    height: 80%;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    .buyTitle {
      display: flex;
      justify-content: center;
      font-size: 25px;
    }
    .allCardsBox {
      display: flex;
    }
    .singleCard {
      width: 200px;
      height: 300px;
      border: 1px black solid;
      display: flex;
      flex-direction: column;
      margin: 10px 20px;
      .prodDetail {
        border-top: 1px black solid;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div {
          &:nth-child(2) {
            margin: 5px 0px;
          }
        }
      }
      img {
        height: 50%;
      }
    }
  }
}
</style>
