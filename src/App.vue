<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import header1 from './components/header1.vue'
import { reactive, toRefs } from 'vue'

const components = {
  header1
}
interface userStyle {
  userName: string
  age: number
  // setUserName: () => void
  setUserName(): void
}
let user: userStyle = reactive({
  userName: 'lee',
  age: 20,
  setUserName(): void {
    this.userName = 'wang'
  }
})

let user2 = reactive<userStyle>({
  userName: 'lee',
  age: 20,
  setUserName(): void {
    this.userName = 'wang'
  }
})
const { userName, age, setUserName } = toRefs(user) //拆分物件 賦值解構
</script>

<template>
  <header1 class="headerAll"></header1>

  <RouterView />
</template>

<style scoped lang="scss">
body {
  min-height: 0;
}

// header {
//   line-height: 1.5;
//   max-height: 100vh;
// }

// .logo {
//   display: block;
//   margin: 0 auto 2rem;
// }

// nav {
//   width: 100%;
//   font-size: 12px;
//   text-align: center;
//   margin-top: 2rem;
// }

// nav a.router-link-exact-active {
//   color: var(--color-text);
// }

// nav a.router-link-exact-active:hover {
//   background-color: transparent;
// }

// nav a {
//   display: inline-block;
//   padding: 0 1rem;
//   border-left: 1px solid var(--color-border);
// }

// nav a:first-of-type {
//   border: 0;
// }

// @media (min-width: 1024px) {
//   header {
//     display: flex;
//     place-items: center;
//     padding-right: calc(var(--section-gap) / 2);
//   }

//   .logo {
//     margin: 0 2rem 0 0;
//   }

//   header .wrapper {
//     display: flex;
//     place-items: flex-start;
//     flex-wrap: wrap;
//   }

//   nav {
//     text-align: left;
//     margin-left: -1rem;
//     font-size: 1rem;

//     padding: 1rem 0;
//     margin-top: 1rem;
//   }
// }
</style>
