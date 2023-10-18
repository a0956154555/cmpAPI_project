<template>
  <div class="buyListsAll">
    <div v-if="counterStore.person.email == 'nan'">尚未登入</div>
    <div class="listAll" v-else></div>
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
    width: 50%;
    height: 80%;
    border: 2px black solid;
  }
}
</style>
