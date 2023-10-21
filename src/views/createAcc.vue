<template>
  <!-- ---------------------------------------- -->
  <div
    class="wrapper fadeInDown draggable-element"
    :style="style"
    style="position: fixed"
    ref="draggableElement"
  >
    <div id="formContent">
      <!-- Tabs Titles -->
      <h2
        :class="[chooseWhich ? 'active' : 'inactive', , chooseWhich ? '' : 'underlineHover']"
        @click="updateChooseWhich(true)"
      >
        登入
      </h2>
      <h2
        :class="[chooseWhich ? 'inactive' : 'active', chooseWhich ? 'underlineHover' : '']"
        @click="updateChooseWhich(false)"
      >
        註冊
      </h2>

      <!-- Icon -->
      <!-- <div class="fadeIn first">
        <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
      </div> -->
      <!-- 註冊表單 -->
      <form v-if="!chooseWhich">
        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="login"
          :placeholder="'註冊帳號'"
          v-model="signAcc"
          @input="typeAcc"
        />
        <div class="noticeAll" v-if="accBoolean">請輸入8~12位元，至少含一個英文字</div>
        <input
          type="text"
          id="password"
          class="fadeIn third"
          name="login"
          :placeholder="'註冊密碼'"
          v-model="signPassword"
          @input="typePassword"
        />
        <div class="noticeAll" v-if="passwordBoolean">請輸入8~12位元</div>
        <input
          type="submit"
          class="fadeIn fourth"
          :value="isHovered ? 'Sign In' : '註冊'"
          @click.prevent="checkCount"
          v-element-hover="onHover"
        />
      </form>
      <!-- Login Form -->
      <form v-if="chooseWhich">
        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="login"
          :placeholder="'登入帳號'"
          v-model="acc"
        />

        <input
          type="text"
          id="password"
          class="fadeIn third"
          name="login"
          :placeholder="'登入密碼'"
          v-model="password"
        />
        <input
          type="submit"
          class="fadeIn fourth"
          :value="isHovered ? 'Join In' : '登入'"
          @click.prevent="login"
          v-element-hover="onHover"
        />
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <!-- <a class="underlineHover" href="#">Forgot Password?</a> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '../stores/counter'
import { nextTick } from 'vue'
import { computed, ref, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useLocalStorage, useMouse, useDraggable } from '@vueuse/core'
import { vElementHover } from '@vueuse/components'
import gsap from 'gsap'
const counterStore = useCounterStore()

const draggableElement = ref<HTMLElement | null>(null)

const { x, y, style } = useDraggable(draggableElement, {
  initialValue: { x: 40, y: 40 }
})
// hover改變字體
const isHovered = ref(false)
function onHover(state: boolean) {
  isHovered.value = state
}
// 註冊帳密
const signAccPattern = /^(?=.*[a-zA-Z]).{8,12}$/
const signPasswordPattern = /^.{8,12}$/
const signEmailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// 套件的切換 註冊登入 布林

// 註冊帳密 vmodel
let signAcc: Ref<string> = ref('')
let signPassword: Ref<string> = ref('')
let signEmail: Ref<string> = ref('')
let accBoolean: Ref<boolean> = ref(false)
let passwordBoolean: Ref<boolean> = ref(false)
let emailBoolean: Ref<boolean> = ref(false)
// 登入帳密
let acc: Ref<string> = ref('')
let password: Ref<string> = ref('')
let chooseWhich: Ref<boolean> = ref(true)

// 正則驗證帳號
const typeAcc = () => {
  let isValid = signAccPattern.test(signAcc.value)
  if (isValid) {
    accBoolean.value = false
  } else {
    accBoolean.value = true
  }
}

// 正則驗證密碼
const typePassword = () => {
  let isValid = signPasswordPattern.test(signPassword.value)
  if (isValid) {
    passwordBoolean.value = false
  } else {
    passwordBoolean.value = true
  }
}
// loginBox 移動
// onMounted(() => {
//   const loginBox: Ref<string> = ref('loginBox')
//   gsap.to(loginBox.value, {
//     x: 200,
//     duration: 2,
//     ease: 'power2.inOut'
//   })
// })

// 正則驗證信箱
const typeEmail = () => {
  let isValid = signEmailPattern.test(signEmail.value)
  if (isValid) {
    emailBoolean.value = false
  } else {
    emailBoolean.value = true
  }
}
// 登入驗證
const login = () => {
  const sucess1: boolean = counterStore.login(acc.value, password.value)

  if (sucess1) {
    acc.value = ''
    password.value = ''
    alert('登入成功')
    counterStore.loginCheck = true
  } else if (!sucess1) {
    alert('登入失敗')
  }
}
// const loginBox = ref(null)
// onMounted(() => {
//   // 这里可以执行你的动画逻辑
//   gsap.to(loginBox.value, {
//     x: 500,
//     duration: 2,
//     ease: 'power2.inOut'
//   })
// })
function updateChooseWhich(change: boolean): void {
  chooseWhich.value = change

  // --------------
}
const checkCount = () => {
  if (
    accBoolean.value ||
    passwordBoolean.value ||
    // emailBoolean.value ||
    // !signEmail.value ||
    !signPassword.value ||
    !signAcc.value
  ) {
    alert('尚未輸入完整')

    return
  }
  counterStore.person.acc = signAcc.value
  counterStore.person.password = signPassword.value
  const personAcc = useLocalStorage('personAcc', signAcc.value)
  acc.value = signAcc.value
  password.value = signPassword.value
  const personPassword = useLocalStorage('personPassword', signPassword.value)
  counterStore.person.email = signEmail.value
  counterStore.person.point = 0
  console.log(counterStore.person)
  signAcc.value = ''
  signPassword.value = ''
  signEmail.value = ''
  alert('註冊成功')
  counterStore.loginCheck = true
}
</script>
<style lang="scss" scoped>
.typeAll {
  width: 100%;
  height: 90vh;

  display: flex;

  align-items: center;
  justify-content: center;
  .typeBox {
    position: relative;
    border: 1px black solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    .loginAll {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .signAll {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .boxTitle {
      position: absolute;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px black solid;
      width: 100%;
      top: 0;
      div {
        cursor: pointer;
        display: flex;
        justify-content: center;
        width: 50%;
        &:first-child {
          border-right: 1px black solid;
        }
      }
      .chooseThis {
        background-color: black;
        color: white;
      }
    }
  }
}
// ---------------------------------------------------------
@import url('https://fonts.googleapis.com/css?family=Poppins');

/* BASIC */

html {
  background-color: #56baed;
}

body {
  font-family: 'Poppins', sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type='button'],
input[type='submit'],
input[type='reset'] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type='button']:hover,
input[type='submit']:hover,
input[type='reset']:hover {
  background-color: #39ace7;
}

input[type='button']:active,
input[type='submit']:active,
input[type='reset']:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type='text'] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type='text']:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type='text']:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.noticeAll {
  font-size: 12px;
  color: red;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: '';
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
  cursor: pointer;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 60%;
}

* {
  box-sizing: border-box;
}
</style>
