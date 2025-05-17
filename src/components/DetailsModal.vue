<script lang="ts" setup>
import { computed } from 'vue'

import IconFavorite from '@/components/icons/IconFavorite.vue'
import ButtonElement from '@/components/forms/ButtonElement.vue'

const props = defineProps<{
  isVisible: boolean
  pokemonDetails: object
  closeFunc: () => void
}>()

const emit = defineEmits<{
  (e: 'addToFavorites', details: PokemonDetails): void
}>()

const typeNames = computed(() => {
  return props.pokemonDetails.types.map(item => item.type.name).join(',')
})

function handleShare() {
  const valuesFormated = `${props.pokemonDetails.name},w:${props.pokemonDetails.weight},h:${props.pokemonDetails.height},t:${typeNames.value}`
  navigator.clipboard.writeText(valuesFormated)
}
function addToFavorites() {
  emit('addToFavorites', props.pokemonDetails)
}
</script>
<template>
  <transition name="fade-modal">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div class="bg-white rounded-[5px] max-w-md w-full pb-6 relative animate-fade-in">
        <div class="relative w-full h-64 mb-3 bg-[url('@/assets/images/landscape.svg')] bg-cover bg-center rounded-t-[5px] overflow-hidden">
          <img
            src="@/assets/images/close-icon.svg"
            class="absolute top-4 right-5 w-[26px] h-[26px] object-contain z-10 cursor-pointer"
            alt="close modal"
            @click="closeFunc"
          />
          <img
            :src="pokemonDetails.sprites.other['official-artwork'].front_default || pokemonDetails.sprites.front_default"
            class="absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-45 h-45 object-contain z-20"
            alt=""
          />
        </div>
        <section class="px-6">
          <div>
            <div class="flex bg-white border-b border-primary-border text-secondary-color py-3">
              <h4 class="text-lg font-bold self-baseline">Name:</h4>
              <p class="self-baseline ml-1 capitalize">{{ pokemonDetails.name }}</p>
            </div>
            <div class="flex bg-white border-b border-primary-border text-secondary-color py-3">
              <h4 class="text-lg font-bold self-baseline">Weight:</h4>
              <p class="self-baseline ml-1">{{ pokemonDetails.weight }}</p>
            </div>
            <div class="flex bg-white border-b border-primary-border text-secondary-color py-3">
              <h4 class="text-lg font-bold self-baseline">Height:</h4>
              <p class="self-baseline ml-1">{{ pokemonDetails.height }}</p>
            </div>
            <div class="flex bg-white border-b border-primary-border text-secondary-color py-3">
              <h4 class="text-lg font-bold self-baseline">Types:</h4>
              <p class="self-baseline ml-1 capitalize">{{ typeNames }}</p>
            </div>
          </div>
        </section>
        <section class="px-6">
          <div class="flex justify-between mt-4">
            <ButtonElement
              class="font-bold"
              :clickFunc="handleShare"
            >
              Share to my friends
            </ButtonElement>
            <IconFavorite
              class="
                self-center
                cursor-pointer
              "
              :active="pokemonDetails.isFavorite"
              @click="addToFavorites"
            />
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.2s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>
