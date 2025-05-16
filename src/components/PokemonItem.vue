<script lang="ts" setup>
interface PokemonDetails {
  name: string,
  url: string,
}

const props =  defineProps<{
  pokemonDetails: PokemonDetails
}>()

const emit = defineEmits<{
  (e: 'selectPokemon', details: PokemonDetails): void;
}>()

function sendDetails() {
  emit('selectPokemon', props.pokemonDetails);
}
</script>

<template>
  <div
    class="flex justify-between h-15 bg-white cursor-pointer gap-2 pl-4 pr-2"
    @click="sendDetails"
  >
    <h2 class="text-[22px] font-medium capitalize self-center">{{ pokemonDetails.name }}</h2>
    <img class="cursor-pointer w-11 h-11 self-center" src="@/assets/images/star-off.svg" alt="add to favourite">
  </div>
</template>
