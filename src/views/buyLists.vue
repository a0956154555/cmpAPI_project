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
      <!-- <div class="allCardsBox">
        <div v-for="i in counterStore.allBuyList" class="singleCard">
          <img :src="i.src" alt="" />
          <div class="prodDetail">
            <div>品名 : {{ i.name }}</div>
            <div>日期 : {{ i.date }}</div>
            <div>點數 : {{ i.price }}</div>
          </div>
        </div>
      </div> -->
      <div class="wrapper">
        <h1 style="color: transparent">FavoriteList</h1>

        <div class="cols">
          <div
            class="col"
            ontouchstart="this.classList.toggle('hover');"
            v-for="i in counterStore.allBuyList"
          >
            <div class="container">
              <div class="front">
                <!-- <div class="front" style="background-image: url(https://unsplash.it/500/500/)"> -->
                <div class="inner">
                  <p>{{ i.date }}</p>
                  <span>{{ i.name }}</span>
                </div>
              </div>
              <div class="back">
                <div class="inner">
                  <!-- <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit
                quae suscipit c.
              </p> -->
                  <img :src="i.src" alt="" />
                </div>
              </div>
            </div>
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
// _-------------------------------------------
.wrapper {
  width: 90%;
  margin: 0 auto;
  max-width: 80rem;
}

.cols {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.col {
  width: calc(25% - 2rem);
  margin: 1rem;
  cursor: pointer;
}

.container {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  perspective: 1000px;
}

.front,
.back {
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-position: center;
  -webkit-transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition:
    transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1),
    -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  text-align: center;
  min-height: 280px;
  height: auto;
  border-radius: 10px;
  color: #fff;
  font-size: 1.5rem;
}

.back {
  background: #cedce7;
  background: -webkit-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: -o-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: linear-gradient(45deg, #cedce7 0%, #596a72 100%);
}

.front:after {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  content: '';
  display: block;
  opacity: 0.6;
  background-color: #000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 10px;
}
.container:hover .front,
.container:hover .back {
  -webkit-transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition:
    transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1),
    -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.inner {
  -webkit-transform: translateY(-50%) translateZ(60px) scale(0.94);
  transform: translateY(-50%) translateZ(60px) scale(0.94);
  top: 50%;
  position: absolute;
  left: 0;
  width: 100%;
  padding: 2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 1px solid transparent;
  -webkit-perspective: inherit;
  perspective: inherit;
  z-index: 2;
  img {
    width: 100%;
  }
}

.container .back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container .front {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .back {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .front {
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.front .inner p {
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.front .inner p:after {
  content: '';
  width: 4rem;
  height: 2px;
  position: absolute;
  background: #c6d4df;
  display: block;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -0.75rem;
}

.front .inner span {
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Montserrat';
  font-weight: 300;
}

@media screen and (max-width: 64rem) {
  .col {
    width: calc(33.333333% - 2rem);
  }
}

@media screen and (max-width: 48rem) {
  .col {
    width: calc(50% - 2rem);
  }
}

@media screen and (max-width: 32rem) {
  .col {
    width: 100%;
    margin: 0 0 2rem 0;
  }
}
</style>
