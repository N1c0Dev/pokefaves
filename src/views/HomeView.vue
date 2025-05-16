<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

import { debounce } from '@/utils/debounce'
import DetailsModal from '@/components/DetailsModal.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'

const mountedLoading = ref(false)
const searchLoading = ref(false)
const currentPagination = reactive({})
const pokemonList = ref([])

onMounted(async () => {
  try {
    mountedLoading.value = true

    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/')
    pokemonList.value = res.data.results
  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(() => {
      mountedLoading.value = false
    }, 1500)
  }
})

async function handleSearch(search: string) {
  console.log('search:', search.target.value)
  searchLoading.value = true
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.target.value}`)
    pokemonList.value = search.target.value == '' ? res.data.results : [res.data]
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(() => {
      searchLoading.value = false
    }, 500)
  }
}


const debounceSearch = debounce(handleSearch, 500)

</script>

<template>
  <LoadingScreen class="h-screen" :isVisible="mountedLoading" />
  <section v-if="!mountedLoading" class="flex">
    <div class="w-1/12"/>
    <div class="w-10/12 mt-10">
      <section class="relative mb-4 ">
        <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <img src="@/assets/images/magnifier.svg" alt="">
        </div>
        <input
          type="text"
          placeholder="Search"
          class="h-[50px] bg-white font-montserrat pl-12 w-full font-medium rounded-[5px] shadow-[0px_2px_10px_0px_#0000000A] placeholder:text-faded-color"
          @keyup="debounceSearch"
        />
      </section>
      <LoadingScreen class="h-50" :isVisible="searchLoading" />
      <section v-if="!searchLoading" class="grid grid-cols-1 gap-4 mt-10 mb-30">
        <div
          v-for="(item, index) in pokemonList"
          :key="index"
        >
          <div class="flex justify-between h-15 bg-white cursor-pointer gap-2 pl-4 pr-2">
            <h2 class="text-[22px] font-medium capitalize self-center">{{ item.name }}</h2>
            <img class="cursor-pointer w-11 h-11 self-center" src="@/assets/images/star-off.svg" alt="add to favourite">
          </div>
        </div>
      </section>
      <DetailsModal/>
    </div>
    <div class="w-1/12"/>
  </section>
  <footer v-if="!mountedLoading" class="flex justify-center shadow-[0px_-5px_4px_0px_#0000000D]  bg-white p-4 gap-4 fixed bottom-0 left-0 right-0">
    <button class="h-11 w-[150px] mt-4 bg-primary-button text-white rounded-full font-bold cursor-pointer flex justify-center gap-3">
      <img class="self-center" src="@/assets/images/list-icon.svg" alt="">
      <p class="self-center">All</p>
    </button>
    <button class="h-11 w-[150px] mt-4 bg-primary-button text-white rounded-full font-bold cursor-pointer flex justify-center gap-3">
      <img class="self-center" src="@/assets/images/star-icon.svg" alt="">
      <p class="self-center">Favourites</p>
    </button>
  </footer>
</template>
