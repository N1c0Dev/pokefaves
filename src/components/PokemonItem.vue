<script lang="ts" setup>
import IconFavourite from '@/components/icons/IconFavourite.vue'

interface PokemonDetails {
  name: string,
  url: string,
}

const props =  defineProps<{
  pokemonDetails: PokemonDetails
}>()

const emit = defineEmits<{
  (e: 'selectPokemon', details: PokemonDetails): void
  (e: 'addToFavourites', details: PokemonDetails): void
}>()

function sendDetails() {
  emit('selectPokemon', props.pokemonDetails)
}
function addToFavourites() {
  emit('addToFavourites', props.pokemonDetails)
}
</script>

<template>
  <div
    class="flex justify-between h-15 bg-white cursor-pointer gap-2 pl-4 pr-2"
    @click="sendDetails"
  >
    <h2 class="text-[22px] font-medium capitalize self-center">{{ pokemonDetails.name }}</h2>
    <IconFavourite
      class="self-center"
      :active="false"
      @click.stop="addToFavourites"
    />
  </div>
</template>
