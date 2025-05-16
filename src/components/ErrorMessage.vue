<script lang="ts" setup>
defineProps<{
  isVisible: boolean
  resetFunc: (event: MouseEvent) => void
}>()
</script>

<template>
  <section
    v-if="isVisible"
    class="
      flex
      flex-col
      items-center
    "
  >
    <h2
      class="
        mt-15
        font-bold
        text-4xl
        text-center
      "
    >
      Uh-oh!
    </h2>
    <p
      class="
        mt-10
        text-center
        text-xl
        text-secondary-color
        font-medium
      "
    >
      You look lost on your journey!
    </p>
    <button
      class="
        mt-10
        text-lg
        bg-primary-button
        text-white
        py-[11px]
        px-5
        rounded-full
        cursor-pointer
      "
      @click="resetFunc"
    >
      Go back home
    </button>
  </section>
</template>
