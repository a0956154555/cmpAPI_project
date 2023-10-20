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
      <button class="bubbly-button" @click="startGame" v-if="randomNumBool">開始</button>
      <button
        class="bubbly-button"
        @click="savePoint"
        v-if="!randomNumBool"
        :disabled="correctPoint > 21"
      >
        完成
      </button>
      <!-- <button @click="startGame" v-if="randomNumBool">Start</button> -->
      <!-- <button v-if="!randomNumBool" @click="savePoint" :disabled="correctPoint > 21">deal</button> -->
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
// click 按鈕
var animateButton = function (e: any) {
  e.preventDefault
  //reset animation
  e.target.classList.remove('animate')

  e.target.classList.add('animate')
  setTimeout(function () {
    e.target.classList.remove('animate')
  }, 700)
}

var bubblyButtons = document.getElementsByClassName('bubbly-button')

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false)
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
// click按鈕
$fuschia: #ff0081;
$button-bg: $fuschia;
$button-text-color: #fff;
$baby-blue: #f8faff;

body {
  font-size: 16px;
  font-family: 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  background-color: $baby-blue;
}
.bubbly-button {
  font-family: 'Helvetica', 'Arial', sans-serif;
  display: inline-block;
  font-size: 1em;
  padding: 1em 2em;
  margin-top: 20px;
  margin-bottom: 60px;
  -webkit-appearance: none;
  appearance: none;
  background-color: $button-bg;
  color: $button-text-color;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  transition:
    transform ease-in 0.1s,
    box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);

  &:focus {
    outline: 0;
  }

  &:before,
  &:after {
    position: absolute;
    content: '';
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    z-index: -1000;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
  }

  &:before {
    display: none;
    top: -75%;
    background-image: radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, $button-bg 20%, transparent 30%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, $button-bg 15%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%);
    background-size:
      10% 10%,
      20% 20%,
      15% 15%,
      20% 20%,
      18% 18%,
      10% 10%,
      15% 15%,
      10% 10%,
      18% 18%;
    //background-position: 0% 80%, -5% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 85% 30%;
  }

  &:after {
    display: none;
    bottom: -75%;
    background-image: radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, $button-bg 15%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%);
    background-size:
      15% 15%,
      20% 20%,
      18% 18%,
      20% 20%,
      15% 15%,
      10% 10%,
      20% 20%;
    //background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }

  &:active {
    transform: scale(0.9);
    background-color: darken($button-bg, 5%);
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  }

  &.animate {
    &:before {
      display: block;
      animation: topBubbles ease-in-out 0.75s forwards;
    }
    &:after {
      display: block;
      animation: bottomBubbles ease-in-out 0.75s forwards;
    }
  }
}

@keyframes topBubbles {
  0% {
    background-position:
      5% 90%,
      10% 90%,
      10% 90%,
      15% 90%,
      25% 90%,
      25% 90%,
      40% 90%,
      55% 90%,
      70% 90%;
  }
  50% {
    background-position:
      0% 80%,
      0% 20%,
      10% 40%,
      20% 0%,
      30% 30%,
      22% 50%,
      50% 50%,
      65% 20%,
      90% 30%;
  }
  100% {
    background-position:
      0% 70%,
      0% 10%,
      10% 30%,
      20% -10%,
      30% 20%,
      22% 40%,
      50% 40%,
      65% 10%,
      90% 20%;
    background-size:
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%;
  }
}

@keyframes bottomBubbles {
  0% {
    background-position:
      10% -10%,
      30% 10%,
      55% -10%,
      70% -10%,
      85% -10%,
      70% -10%,
      70% 0%;
  }
  50% {
    background-position:
      0% 80%,
      20% 80%,
      45% 60%,
      60% 100%,
      75% 70%,
      95% 60%,
      105% 0%;
  }
  100% {
    background-position:
      0% 90%,
      20% 90%,
      45% 70%,
      60% 110%,
      75% 80%,
      95% 70%,
      110% 10%;
    background-size:
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%;
  }
}
</style>
