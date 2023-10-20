import type { Ref } from 'vue'
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

interface Member {
  acc: string
  password: string
  email: string
  point: number
}
interface records {
  acc: string
  date: string
  point: number
}
interface pushInButList {
  src: string
  name: string
  date: string
  price: number
}
export const useCounterStore = defineStore('counter', () => {
  let userAcc: Ref<string> = ref('')
  let userPassword: Ref<number | string> = ref('')
  let loginCheck: Ref<boolean> = ref(false)
  let allRecords: Ref<records[]> = ref([])
  let allBuyList: Ref<pushInButList[]> = ref([])
  let userTotalPoint: Ref<number> = ref(0)
  const person: Member = reactive({
    acc: 'nan',
    password: 'nan',
    email: 'nan',
    point: 0
  })
  const login = (username: string, password: string): boolean => {
    console.log('帳號', person.acc, '密碼', person.password)
    if (username === person.acc && password == person.password) {
      userAcc.value = username
      userPassword.value = password
      return true
    } else {
      return false
      // throw new Error('登录失败')
    }
  }

  return {
    userAcc,
    userPassword,
    login,
    person,
    loginCheck,
    allRecords,
    allBuyList,
    userTotalPoint
  }
})
