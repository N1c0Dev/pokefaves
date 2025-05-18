<script lang="ts" setup>
import ButtonElement from '@/components/forms/ButtonElement.vue'
</script>

<template>
  <section class="flex">
    <div class="w-2/12" />
    <section
      class="
        flex
        flex-col
        w-8/12
        items-center
        pt-30
        h-screen
      "
    >
      <img
        class="
          animate-wave-hello
          inline-block
          origin-bottom-left
        "
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
        The digital encyclopedia created by <br class="lg:hidden">
        Professor Oak is an invaluable tool <br class="hidden lg:block">
        to<br class="lg:hidden"> Trainers in the Pokémon world.
      </p>
      <router-link to="/home">
        <ButtonElement
          class="
            mt-10
            text-lg
            py-[11px]
            px-5
          "
          id-tag="welcome-button"
          :click-func="() => {}"
        >
          Get started
        </ButtonElement>
      </router-link>
    </section>
    <div class="w-2/12" />
  </section>
</template>

<style scoped lang="css">
@keyframes wave-hello {
  0% { transform: rotate(0deg); }
  30% { transform: rotate(3deg); }
  60% { transform: rotate(-4deg); }
  100% { transform: rotate(0deg); }
}

.animate-wave-hello {
  animation: wave-hello 1s ease-in-out 1;
}
</style>
