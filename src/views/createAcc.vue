<template>
  <div class="typeAll">
    <div class="typeBox">
      <div class="boxTitle">
        <div :class="{ chooseThis: chooseWhich }" @click="updateChooseWhich(true)">登入</div>
        <div :class="{ chooseThis: !chooseWhich }" @click="updateChooseWhich(false)">註冊</div>
      </div>
      <div v-if="chooseWhich" class="loginAll">
        <label>
          帳號
          <input type="text" v-model="acc" />
        </label>
        <label>
          密碼
          <input type="password" v-model="password" />
        </label>
      </div>
      <div class="signAll" v-if="!chooseWhich">
        <label>
          帳號
          <input type="text" v-model="signAcc" @input="typeAcc" />
        </label>
        <div class="noticeAll" v-if="accBoolean">請輸入8~12位元，至少含一個英文字</div>
        <label>
          密碼
          <input type="password" v-model="signPassword" @input="typePassword" />
        </label>
        <div class="noticeAll" v-if="passwordBoolean">請輸入8~12位元</div>
        <label>
          信箱
          <input type="text" @input="typeEmail" v-model="signEmail" />
        </label>
        <div class="noticeAll" v-if="emailBoolean">請輸入正確信箱</div>
      </div>
      <button @click="login" v-if="chooseWhich">登入</button>
      <button @click="checkCount" v-if="!chooseWhich">註冊</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '../stores/counter'
import { nextTick } from 'vue'
import { computed, ref, reactive } from 'vue'
import type { Ref } from 'vue'

const counterStore = useCounterStore()
// 註冊帳密
const signAccPattern = /^(?=.*[a-zA-Z]).{8,12}$/
const signPasswordPattern = /^.{8,12}$/
const signEmailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

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
function updateChooseWhich(change: boolean): void {
  chooseWhich.value = change
}
const checkCount = () => {
  if (
    accBoolean.value ||
    passwordBoolean.value ||
    emailBoolean.value ||
    !signEmail.value ||
    !signPassword.value ||
    !signAcc.value
  ) {
    alert('尚未輸入完整')

    return
  }
  counterStore.person.acc = signAcc.value
  counterStore.person.password = signPassword.value
  counterStore.person.email = signEmail.value
  counterStore.person.point = 0
  console.log(counterStore.person)
  signAcc.value = ''
  signPassword.value = ''
  signEmail.value = ''
  alert('註冊成功')
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
      .noticeAll {
        font-size: 12px;
        color: red;
      }
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
</style>
