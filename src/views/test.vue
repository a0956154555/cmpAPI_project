<script setup lang="ts">
import { ref } from 'vue'
import { vElementHover } from '@vueuse/components'

const isHovered = ref(false)
function onHover(state: boolean) {
  isHovered.value = state
}
</script>

<template>
  <button v-element-hover="onHover">
    {{ isHovered ? 'Thank you!' : 'Hover me' }}
  </button>
</template>
