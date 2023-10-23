<template>
  <div class="recordsAll">
    <!-- <div v-if="allRec.length < 1 || !counterStore.loginCheck">目前為空</div> -->
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />

    <div class="content" ref="box" v-if="allRec.length < 1">
      <div class="content__container">
        <p class="content__container__text">您好!</p>

        <ul class="content__container__list">
          <li class="content__container__list__item">去玩遊戲</li>
          <li class="content__container__list__item">獲得點數</li>
          <li class="content__container__list__item">來換獎勵</li>
          <li class="content__container__list__item">只差你了</li>
        </ul>
      </div>
    </div>
    <!-- ------------------------------------------------------------------------ -->
    <div class="recordsTitle" v-if="allRec.length >= 1 && counterStore.loginCheck">
      <div>帳號</div>
      <div>日期</div>
      <div>點數</div>
    </div>
    <div class="recordsBox" v-if="allRec.length >= 1 && counterStore.loginCheck">
      <div v-for="i in allRec" class="singleRecord">
        <div>{{ i.acc }}</div>
        <div>{{ i.date }}</div>
        <div>{{ i.point }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '../stores/counter'
import { nextTick } from 'vue'
import { computed, ref, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
const counterStore = useCounterStore()
const router = useRouter()

const box = ref(null)
let allRec = counterStore.allRecords
onMounted(() => {
  gsap.to(box.value, {
    fontSize: '20px',
    x: 50, // 向右移动 100 像素
    duration: 0.5, // 持续时间为 0.25 秒
    ease: 'power1.inOut', // 缓动函数
    yoyo: true, // 循环播放反向动画

    onComplete: () => {
      gsap.to(box.value, {
        fontSize: '40px',
        x: -10, // 向右移动 100 像素
        duration: 0.5, // 持续时间为 0.25 秒
        ease: 'power1.inOut', // 缓动函数
        yoyo: true // 循环播放反向动画
      })
    }
  })
})
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
// ----------------------------------
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 160px;
  overflow: hidden;

  font-family: 'Lato', sans-serif;
  font-size: 35px;
  line-height: 40px;
  color: #6fbed1;

  &__container {
    font-weight: 600;
    overflow: hidden;
    height: 40px;
    padding: 0 40px;

    &:before {
      content: '[';
      left: 0;
    }

    &:after {
      content: ']';
      position: absolute;
      right: 0;
    }

    &:after,
    &:before {
      position: absolute;
      top: 0;

      color: #16a085;
      font-size: 42px;
      line-height: 40px;

      -webkit-animation-name: opacity;
      -webkit-animation-duration: 2s;
      -webkit-animation-iteration-count: infinite;
      animation-name: opacity;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }

    &__text {
      display: inline;
      float: left;
      margin: 0;
    }

    &__list {
      margin-top: 0;
      padding-left: 110px;
      text-align: left;
      list-style: none;

      -webkit-animation-name: change;
      -webkit-animation-duration: 10s;
      -webkit-animation-iteration-count: infinite;
      animation-name: change;
      animation-duration: 10s;
      animation-iteration-count: infinite;

      &__item {
        line-height: 40px;
        margin: 0;
      }
    }
  }
}

@-webkit-keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-webkit-keyframes change {
  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}

@-o-keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-o-keyframes change {
  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}

@-moz-keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-moz-keyframes change {
  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}

@keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@keyframes change {
  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}
</style>
