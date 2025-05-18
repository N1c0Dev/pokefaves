<script setup lang="ts">
  withDefaults(defineProps<{
    clickFunc: (event: MouseEvent) => void
    isActive?: boolean
    idTag?: string
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
    :id="idTag"
    :class="{
      'bg-primary-button active:bg-pressed-button': isActive,
      'bg-disabled-button': !isActive
    }"
    @click="clickFunc"
  >
    <slot />
  </button>
</template>
