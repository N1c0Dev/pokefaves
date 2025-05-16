<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';

import { debounce } from '@/utils/debounce';
import DetailsModal from '@/components/DetailsModal.vue';

const loading = ref(false);
const currentPagination = reactive({});
const pokemonList = ref([]);

async function handleSearch(search: string) {
  console.log('search:', search.target.value);
  loading.value = true
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.target.value}`)
    pokemonList.value = search.target.value == '' ? res.data.results : [res.data];
    console.log('pokemonList:', pokemonList.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false
  }
}

const debounceSearch = debounce(handleSearch, 500);

</script>

<template>
  <section>
    <input type="text" placeholder="Search" class="bg-white border p-2 w-full mb-4 font-medium" @keyup="debounceSearch"/>
  </section>
  <section>
    <div
      v-for="(item, index) in pokemonList"
      :key="index"
      class="grid grid-cols-1 gap-4"
    >
      <div class="flex justify-between bg-white p-4 border">
        <h2 class="text-[22px] font-medium">{{ item.name }}</h2>
        <p>lorem</p>
      </div>
    </div>
  </section>
  <DetailsModal/>
  <footer class="flex justify-center shadow-md bg-white border p-4 gap-4 fixed bottom-0 left-0 right-0">
    <button class="mt-4 bg-red-500 text-white py-2 px-4 rounded-full font-bold">All</button>
    <button class="mt-4 bg-red-500 text-white py-2 px-4 rounded-full font-bold">Favorites</button>
  </footer>
</template>
