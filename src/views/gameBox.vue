<template>
  <div class="gameAllOuter">
    <div class="gameBoxInside">
      <button
        v-for="(i, index) in 9"
        class="singleNum"
        :class="{ movePosition: startPlay, opacityNum: opacityBoolean }"
        v-if="!noneDiv"
      >
        {{
          randomNumBool
            ? i
            : finallyNum == 1
            ? random1[index]
            : finallyNum == 2
            ? random2[index]
            : finallyNum == 3
            ? random3[index]
            : ''
        }}
      </button>
      <button
        v-for="(i, index) in 9"
        class="singleNum"
        v-if="showNew"
        @click="pushText($event, index)"
        :disabled="correctPoint > 21"
      ></button>
    </div>
    <div v-if="!randomNumBool">Score:{{ correctPoint }}</div>
    <div v-if="correctPoint > 21" class="pointOverNotice">已超過範圍，將不會納入點數保存</div>
    <div>
      <button @click="startGame" v-if="randomNumBool">Start</button>
      <button v-if="!randomNumBool" @click="savePoint" :disabled="correctPoint > 21">deal</button>
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
let startPlay: Ref<boolean> = ref(false)
let randomNumBool: Ref<boolean> = ref(true)
let opacityBoolean: Ref<boolean> = ref(false)
let noneDiv: Ref<boolean> = ref(false)
let showNew: Ref<boolean> = ref(false)
let random1: number[] = [3, 4, 1, 2, 5, 6, 7, 9, 8]
let random2: number[] = [7, 9, 8, 3, 4, 5, 6, 1, 2]
let random3: number[] = [5, 6, 7, 4, 1, 9, 8, 3, 2]
let correctPoint: Ref<number> = ref(0)
let finallyNum: number = 0
const savePoint = () => {
  counterStore.allRecords.push({
    email: counterStore.person.email,
    date: `${new Date().getMonth() + 1}/${new Date().getDate()}`,
    point: correctPoint.value
  })
  //   interface records {
  //   email: string
  //   date: Date
  //   point: number
  // }
  if (correctPoint.value > 21) {
    return
  }
  counterStore.person.point += correctPoint.value
  setTimeout(() => {
    router.push('/gameRecord')
  })
}
const pushText = (e: any, index: number) => {
  // 获取目标元素
  const targetElement = e.target

  // 修改目标元素的 innerText
  if (finallyNum == 1) {
    targetElement.innerText = random1[index]
    correctPoint.value += random1[index]
  } else if (finallyNum == 2) {
    targetElement.innerText = random2[index]
    correctPoint.value += random2[index]
  } else if (finallyNum == 3) {
    targetElement.innerText = random3[index]
    correctPoint.value += random3[index]
  }
  console.log(correctPoint)
}

const startGame = () => {
  if (counterStore.person.acc == 'nan') {
    alert('需先登入')
    return
  }
  startPlay.value = true
  randomNumBool.value = false

  let min = Math.ceil(1)
  let max = Math.floor(3)
  finallyNum = Math.floor(Math.random() * (max - min + 1)) + min
  setTimeout(() => {
    opacityBoolean.value = true
  }, 2500)
  setTimeout(() => {
    noneDiv.value = true
  }, 4500)
  setTimeout(() => {
    showNew.value = true
  }, 5000)
  setTimeout(() => {
    startPlay.value = false
  }, 3000)
}
</script>
<style lang="scss" scoped>
.gameAllOuter {
  width: 100%;
  height: 90vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  .gameBoxInside {
    position: relative;
    width: 50%;
    height: 80%;
    border: 1px black solid;
    display: flex;
    flex-wrap: wrap;
    transition: 2s;
    padding: 30px 5px 0px;
    .singleNum {
      width: calc(33.33% - 6px);
      margin: 0px 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 100px;
      border: 1px black solid;
      position: relative;
    }
    .movePosition {
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50%;
      transition: 2s;
    }
    .opacityNum {
      opacity: 0;
      transition: 2s;
    }
  }
  .pointOverNotice {
    color: red;
    font-size: 12px;
  }
}
</style>
