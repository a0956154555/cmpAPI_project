<template>
  <div class="recordsAll">
    <div v-if="allRec.length < 1 || !counterStore.loginCheck">目前為空</div>
    <div class="recordsTitle" v-if="allRec.length >= 1 && counterStore.loginCheck">
      <div>信箱</div>
      <div>日期</div>
      <div>點數</div>
    </div>
    <div class="recordsBox" v-if="allRec.length >= 1 && counterStore.loginCheck">
      <div v-for="i in allRec" class="singleRecord">
        <div>{{ i.email }}</div>
        <div>{{ i.date }}</div>
        <div>{{ i.point }}</div>
      </div>
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
const router = useRouter()
let allRec = counterStore.allRecords
</script>
<style lang="scss" scoped>
.recordsAll {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .recordsTitle {
    display: flex;
    width: 500px;
    div {
      width: calc(100% / 3);
      display: flex;
      justify-content: center;
    }
  }
  .recordsBox {
    width: 500px;
    height: 300px;
    border: 2px black solid;
    .singleRecord {
      display: flex;

      div {
        width: calc(100% / 3);
        display: flex;
        justify-content: center;
        border-bottom: 1px black solid;
        padding: 5px 0px;
      }
    }
  }
}
</style>
