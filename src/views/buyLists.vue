<template>
  <div class="buyListsAll">
    <!-- <div v-if="counterStore.person.email == 'nan'">尚未登入</div> -->
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />

    <div class="content" v-if="counterStore.person.email == 'nan'" ref="box">
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
    <!-- -------------------------------------------- -->
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
import gsap from 'gsap'
const counterStore = useCounterStore()
const router = useRouter()
const box = ref(null)
onMounted(() => {
  gsap.to(box.value, {
    fontSize: '20px',
    x: 50, // 向右移动 100 像素
    duration: 0.5, // 持续时间为 0.25 秒
    ease: 'power1.inOut', // 缓动函数

    rotation: 360,
    onComplete: () => {
      gsap.to(box.value, {
        fontSize: '40px',
        rotation: 360,
        x: -10,
        duration: 0.5, // 持续时间为 0.25 秒
        ease: 'power1.inOut', // 缓动函数
        yoyo: true // 循环播放反向动画
      })
    }
  })
})
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
// --------------------------
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
