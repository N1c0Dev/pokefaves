<script lang="ts" setup>
import ButtonElement from '@/components/forms/ButtonElement.vue'
</script>
<template>
  <section
    class="
      flex
      flex-col
      items-center
      pt-30
      h-screen
    "
  >
    <img
      src="@/assets/images/pikachu.svg"
      alt="Pikachu waving"
    >
    <h1
      class="
        mt-15
        font-bold
        text-[26px]
        text-center
      "
    >
      Welcome to the Pokedex
    </h1>
    <p
      class="
        mt-10
        text-center
        text-lg
        text-secondary-color
        font-medium
      "
    >
      The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
    </p>
    <router-link to="/home">
      <ButtonElement
        class="
          mt-10
          text-lg
          py-[11px]
          px-5
        "
        :clickFunc="() => {}"
      >
        Get started
      </ButtonElement>
    </router-link>
  </section>
</template>
