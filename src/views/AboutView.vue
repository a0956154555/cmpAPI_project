<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    // Using the Composition API
    const someData: Ref<string> = ref('Hello, Composition API!')
    const someState: { counter: number } = reactive({
      counter: 0
    })

    const increment = () => {
      someState.counter++
    }

    return {
      someData,
      someState,
      increment
    }
  }
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ someState.counter }}</div>
    <button @click.prevent="increment">Click me</button>
  </div>
</template>

<style></style>
