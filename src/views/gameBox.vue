<template>
  <div class="gameAllOuter">
    <div class="gameBoxInside" v-if="!randomNumBool" ref="box">
      <div
        class="flip-card"
        :class="openCardsAll[index] ? 'goRotate' : ''"
        tabIndex="0"
        v-for="(i, index) in randNum"
        @click="openCard(index, i)"
        :ref="`singleCard${index}`"
        @mousemove="floatCard(index)"
        @mouseleave="leaveCard(index)"
      >
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h3>猜猜看</h3>
          </div>
          <div class="flip-card-back">
            <h3>{{ i }}</h3>
          </div>
        </div>
      </div>
      <!-- <button
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
      ></button> -->
    </div>
    <div v-if="!randomNumBool">Score:{{ correctPoint }}</div>
    <div v-if="correctPoint > 21" class="pointOverNotice">已超過範圍，將不會納入點數保存</div>
    <div>
      <button
        class="bubbly-button"
        @click="startGame"
        v-if="randomNumBool"
        v-element-hover="onHover"
        ref="floatBtn"
      >
        {{ isHovered ? 'Start!!' : '開始' }}
      </button>
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
import { computed, ref, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { vElementHover } from '@vueuse/components'
import gsap from 'gsap'
// hover改變字
const isHovered = ref(false)
function onHover(state: boolean) {
  isHovered.value = state
}
// -----------
const counterStore = useCounterStore()
const router = useRouter()
let startPlay: Ref<boolean> = ref(false)
let randomNumBool: Ref<boolean> = ref(true)
let opacityBoolean: Ref<boolean> = ref(false)
let noneDiv: Ref<boolean> = ref(false)
let showNew: Ref<boolean> = ref(false)

let openCardsAll: Ref<boolean[]> = ref([false, false, false, false, false, false, false, false])
let random1: number[] = [3, 4, 1, 2, 5, 6, 7, 9, 8]
let random2: number[] = [7, 9, 8, 3, 4, 5, 6, 1, 2]
let random3: number[] = [5, 6, 7, 4, 1, 9, 8, 3, 2]
let correctPoint: Ref<number> = ref(0)
let finallyNum: number = 0
let randNum: Ref<number[]> = ref([])
let randomNumSet = new Set()
let floatBtn = ref(null)
const box = ref(null)
// singleCard${index}
let singleCard0 = ref(null)
let singleCard1 = ref(null)
let singleCard2 = ref(null)
let singleCard3 = ref(null)
let singleCard4 = ref(null)
let singleCard5 = ref(null)
let singleCard6 = ref(null)
let singleCard7 = ref(null)
let singleCard8 = ref(null)
onMounted(() => {
  const min = 1
  const max = 8

  while (randNum.value.length < 8) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min

    if (!randomNumSet.has(randomNum)) {
      randomNumSet.add(randomNum)
      randNum.value.push(randomNum)
    }
  }
  console.log(randNum)
  // :ref="`singleCard${index}`
  gsap.to(floatBtn.value, {
    y: -20, // 向上浮动
    duration: 1,
    ease: 'power2.inOut',
    repeat: -1, // 无限循环
    yoyo: true // 循环时反向运动
  })
})
// const openCardsAll = ref([false, false, false, false, false, false]);
// const randNum = ref([0, 1, 2, 3, 4, 5]);

const floatCard = (index: number) => {
  if (index == 0) {
    gsap.to(singleCard0.value, {
      y: -20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  } else if (index == 1) {
    gsap.to(singleCard1.value, {
      y: -20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  } else if (index == 2) {
    gsap.to(singleCard2.value, {
      y: -20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  } else if (index == 3) {
    gsap.to(singleCard3.value, {
      y: -20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  } else if (index == 4) {
    gsap.to(singleCard4.value, {
      y: -20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  } else if (index == 5) {
    gsap.to(singleCard5.value, {
      y: -20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  } else if (index == 6) {
    gsap.to(singleCard6.value, {
      y: -20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  } else if (index == 7) {
    gsap.to(singleCard7.value, {
      y: -20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  } else if (index == 8) {
    gsap.to(singleCard8.value, {
      y: -20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  }
}
const leaveCard = (idx: number) => {
  if (idx === 0) {
    gsap.to(singleCard1.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard2.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard3.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard4.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard5.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard6.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard7.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard8.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    // ------------------------------------------------
  } else if (idx == 1) {
    gsap.to(singleCard0.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard2.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard3.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard4.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard5.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard6.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard7.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard8.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    // ---------------------------------------------------
  } else if (idx == 2) {
    gsap.to(singleCard0.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard1.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard3.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard4.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard5.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard6.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard7.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard8.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    // --------------------------------------------
  } else if (idx == 3) {
    gsap.to(singleCard0.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard1.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard2.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard4.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard5.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard6.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard7.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard8.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    // ----------------------------------------
  } else if (idx == 4) {
    gsap.to(singleCard0.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard1.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard2.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard3.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard5.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard6.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard7.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard8.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    // ------------------------------------------------
  } else if (idx == 5) {
    gsap.to(singleCard0.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard1.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard2.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard3.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard4.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard6.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard7.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard8.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    // -------------------------------------------
  } else if (idx == 6) {
    gsap.to(singleCard0.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard1.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard2.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard3.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard4.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard5.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard7.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard8.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    // ----------------------------------------------
  } else if (idx == 7) {
    gsap.to(singleCard0.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard1.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard2.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard3.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard4.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard5.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard6.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard8.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    // -----------------------------------------------
  } else if (idx == 8) {
    gsap.to(singleCard0.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard1.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard2.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard3.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard4.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard5.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard6.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
    gsap.to(singleCard7.value, {
      y: 20, // 向上浮动
      duration: 0.2,
      ease: 'power2.inOut',
      // 无限循环
      yoyo: true // 循环时反向运动
    })
  }
}

const savePoint = () => {
  counterStore.allRecords.push({
    acc: counterStore.person.acc,
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
  gsap.to(box.value, {
    x: -900, // 向右移动 100 像素
    duration: 0.2, // 持续时间为 0.25 秒
    ease: 'power1.inOut', // 缓动函数
    yoyo: true, // 循环播放反向动画

    onComplete: () => {
      gsap.to(box.value, {
        x: 1500, // 向右移动 100 像素
        duration: 0.4, // 持续时间为 0.25 秒
        ease: 'power1.inOut', // 缓动函数
        yoyo: true, // 循环播放反向动画
        onComplete: () => {
          setTimeout(() => {
            router.push('/gameRecord')
          }, 1300)
        }
      })
    }
  })
  // setTimeout(() => {
  //   router.push('/gameRecord')
  // })
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
  gsap.killTweensOf(floatBtn.value)
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
// 打開卡片
const openCard = (idx: number, i: any): void => {
  openCardsAll.value[idx] = true
  console.log(i)
  correctPoint.value += i
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
@keyframes animate {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50.1% {
    transform: scaleX(1);
    transform-origin: right;
  }

  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}
.gameAllOuter {
  width: 100%;
  height: 90vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  .gameBoxInside {
    position: relative;
    width: 60%;
    height: 80%;
    border: 1px black solid;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #2a3cad;
    border-radius: 4px;
    box-shadow: 0px 0px 5px #2a3cad;
    transition: 2s;
    padding: 30px 0px 50px 35px;
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
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      transition: 0.5s;
      pointer-events: none;
    }
    &:hover {
      &::before {
        left: -50%;
        transform: skewX(-5deg);
      }
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
// ------------------------每個卡片點擊
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.flip-card {
  background-color: transparent;
  width: 150px;
  height: 150px;
  perspective: 1000px;
  margin: 0px 10px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  backface-visibility: hidden;
  -moz-backface-visibility: hidden;
}

.flip-card:focus {
  outline: 0;
}

.goRotate .flip-card-inner,
.goRotate .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
}

.flip-card-front {
  background: linear-gradient(to left, #4364f7, #6fb1fc);
  color: black;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card-back {
  background: linear-gradient(to right, #4364f7, #6fb1fc);
  color: white;
  transform: rotateY(180deg);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
h3 {
  font-size: 20px;
  font-family: Verdana, sans-serif;
  font-weight: bold;
  color: #fff;
}
</style>
