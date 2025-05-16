<script setup lang="ts">
defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <section v-if="isVisible" class="flex ">
    <img class="animate-pulse h-[106px] w-[106px] m-auto" src="@/assets/images/pokeball.svg" alt="loading">
  </section>
</template>
