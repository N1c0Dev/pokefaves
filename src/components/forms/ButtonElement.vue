<script setup lang="ts">
  withDefaults(defineProps<{
    clickFunc: (event: MouseEvent) => void
    isActive?: boolean
  }>(), {
    isActive: true
  })
</script>
<template>
  <button
    class="
      text-white
      py-2
      px-4
      rounded-full
      cursor-pointer
    "
    :class="{
      'bg-primary-button': isActive,
      'bg-disabled-button': !isActive
    }"
    @click="clickFunc"
  >
    <slot />
  </button>
</template>
