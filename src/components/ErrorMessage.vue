<script lang="ts" setup>
import ButtonElement from '@/components/forms/ButtonElement.vue'

defineProps<{
  isVisible: boolean
  resetFunc: (event: MouseEvent) => void
}>()
</script>

<template>
  <section
    v-if="isVisible"
    id="error-container"
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
    <ButtonElement
      class="
        mt-10
        text-lg
        py-[11px]
        px-5
      "
      id-tag="back-home-button"
      :clickFunc="resetFunc"
    >
      Go back home
    </ButtonElement>
  </section>
</template>
