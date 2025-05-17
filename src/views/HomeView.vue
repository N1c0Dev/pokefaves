<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { mainStore } from '@/store/mainStore'
import { debounce } from '@/utils/debounce'
import PokemonItem from '@/components/PokemonItem.vue'
import DetailsModal from '@/components/DetailsModal.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import ButtonElement from '@/components/forms/ButtonElement.vue'
import DotsSpinner from '@/components/icons/DotsSpinner.vue'

const mountedLoading = ref(false)
const searchLoading = ref(false)
const showErrorMessage = ref(false)
const showFavorites = ref(false)
const currentPagination = ref<string | null>(null)
const pokemonList = ref<any[]>([])
const pokemonSelected = ref({})
const searchText = ref('')
const isFetchingMore = ref(false)

onMounted(() => {
  mountedLoading.value = true

  const fetchInitialData = async () => {
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/')
      pokemonList.value = res.data.results
      currentPagination.value = res.data.next
    } catch (err) {
      console.error(err)
      showErrorMessage.value = true
    } finally {
      setTimeout(() => {
        mountedLoading.value = false
      }, 1500)
    }
  }

  fetchInitialData()

  window.addEventListener('scroll', async () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
    if (nearBottom && !showFavorites.value && !searchText.value) {
      await loadMorePokemon()
    }
  })
})

async function loadMorePokemon() {
  if (!currentPagination.value || isFetchingMore.value) return

  isFetchingMore.value = true

  try {
    const res = await axios.get(currentPagination.value)
    pokemonList.value.push(...res.data.results)
    currentPagination.value = res.data.next
    updatePokemonListWithFavorites()
  } catch (err) {
    console.error('Error loading more Pokémon:', err)
    showErrorMessage.value = true
  } finally {
    isFetchingMore.value = false
  }
}
async function handleSearch() {
  searchLoading.value = true
  showErrorMessage.value = false

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchText.value}`)
    pokemonList.value = searchText.value == '' ? res.data.results : [res.data]
    currentPagination.value = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'
  } catch (err) {
    console.error(err)
    showErrorMessage.value = true
  } finally {
    searchLoading.value = false
    updatePokemonListWithFavorites()
  }
}
function resetSearch() {
  searchText.value = ''
  handleSearch()
}
async function handleSelectPokemon(details: object) {
  const favoriteFlag = mainStore.favoritePokemon.some(item => item.name === details.name)

  if (Object.keys(details).length > 3) {
    pokemonSelected.value = {
      ...details,
      isFavorite: favoriteFlag,
    }
    mainStore.setModalVisible()
  } else {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${details.name}`)
      pokemonSelected.value = {
        ...res.data,
        isFavorite: favoriteFlag,
      }
    } catch (err) {
      console.error(err)
      showErrorMessage.value = true
    } finally {
      searchLoading.value = false
      mainStore.setModalVisible()
    }
  }
}
function handleCloseModal() {
  mainStore.setModalVisible()
  pokemonSelected.value = {}
}
function handleFavorite(details: object) {
  pokemonSelected.value.isFavorite = !pokemonSelected.value.isFavorite
  mainStore.setFavoritePokemon(details)
  updatePokemonListWithFavorites()
}
function updatePokemonListWithFavorites() {
  pokemonList.value = pokemonList.value.map(item => {
    const isFavorite = mainStore.favoritePokemon.some(fav => fav.name === item.name)
    return { ...item, isFavorite }
  })
}

const debounceSearch = debounce(handleSearch, 500)
</script>

<template>
  <LoadingScreen class="h-screen" :is-visible="mountedLoading" />
  <section v-if="!mountedLoading" class="flex">
    <div class="w-1/12" />
    <div class="w-10/12 mt-10">
      <section class="relative mb-4">
        <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <img src="@/assets/images/magnifier.svg" alt="">
        </div>
        <input
          v-model="searchText"
          type="text"
          placeholder="Search"
          class="h-[50px] bg-white font-montserrat pl-12 w-full font-medium rounded-[5px] shadow-[0px_2px_10px_0px_#0000000A] placeholder:text-faded-color focus:outline-blue-300"
          @keyup="debounceSearch"
        />
      </section>
      <LoadingScreen class="h-50" :is-visible="searchLoading" />
      <ErrorMessage :is-visible="showErrorMessage" :reset-func="resetSearch" />
      <section v-if="!searchLoading && !showErrorMessage && !showFavorites" class="grid grid-cols-1 gap-4 mt-10 mb-30">
        <div v-for="(item, index) in pokemonList" :key="index">
          <PokemonItem
            :pokemon-details="item"
            @select-pokemon="handleSelectPokemon"
            @add-to-favorites="handleFavorite"
          />
        </div>
        <div v-if="isFetchingMore" class="flex justify-center py-4">
          <DotsSpinner v-if="isFetchingMore"/>
        </div>
      </section>

      <section v-if="showFavorites" class="grid grid-cols-1 gap-4 mt-10 mb-30">
        <div v-for="(item, index) in mainStore.favoritePokemon" :key="index">
          <PokemonItem
            :pokemon-details="item"
            @select-pokemon="handleSelectPokemon"
            @add-to-favorites="handleFavorite"
          />
        </div>
      </section>

      <DetailsModal
        :is-visible="mainStore.modalVisble"
        :pokemon-details="pokemonSelected"
        :close-func="handleCloseModal"
        @add-to-favorites="handleFavorite"
      />
    </div>
    <div class="w-1/12" />
  </section>

  <footer
    v-if="!mountedLoading"
    class="flex justify-center shadow-[0px_-5px_4px_0px_#0000000D] bg-white p-4 gap-4 fixed bottom-0 left-0 right-0"
  >
    <ButtonElement
      class="h-11 w-[150px] mt-4 font-bold flex justify-center gap-3"
      :is-active="!showFavorites"
      :clickFunc="() => { showFavorites = false }"
    >
      <img class="self-center" src="@/assets/images/list-icon.svg" alt="">
      <p class="self-center">All</p>
    </ButtonElement>
    <ButtonElement
      class="h-11 w-[150px] mt-4 font-bold flex justify-center gap-3"
      :is-active="showFavorites"
      :clickFunc="() => { showFavorites = true }"
    >
      <img class="self-center" src="@/assets/images/star-icon.svg" alt="">
      <p class="self-center">Favorites</p>
    </ButtonElement>
  </footer>
</template>
