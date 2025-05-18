import { ref, onMounted, onBeforeUnmount } from 'vue'

import { mainStore } from '@/store/mainStore'
import {
  fetchPokemonList,
  fetchPokemonDetail,
} from './usePokemonAPI'

import type { PokemonBasic } from './usePokemonAPI'

export function usePokemonList() {
  const mountedLoading = ref(true)
  const searchLoading = ref(false)
  const showErrorMessage = ref(false)
  const showFavorites = ref(false)
  const currentPagination = ref<string | null>(null)
  const pokemonList = ref<(PokemonBasic & { isFavorite?: boolean })[]>([])
  const pokemonSelected = ref<any>({})
  const searchText = ref('')
  const isFetchingMore = ref(false)

  async function safeAsyncCall<T>(fn: () => Promise<T>, opts?: { loading?: typeof ref<boolean> }): Promise<T | null> {
    if (opts?.loading) opts.loading.value = true
    showErrorMessage.value = false
    try {
      return await fn()
    } catch (err) {
      console.error(err)
      showErrorMessage.value = true
      return null
    } finally {
      if (opts?.loading) opts.loading.value = false
    }
  }

  const fetchInitialData = async () => {
    const data = await safeAsyncCall(() => fetchPokemonList(), { loading: mountedLoading })
    if (data) {
      pokemonList.value = data.results
      currentPagination.value = data.next
      updatePokemonListWithFavorites()
    }

    setTimeout(() => {
      mountedLoading.value = false
    }, 1500)
  }

  const loadMorePokemon = async () => {
    if (!currentPagination.value || isFetchingMore.value) return
    isFetchingMore.value = true

    const data = await safeAsyncCall(() => fetchPokemonList(currentPagination.value))
    if (data) {
      pokemonList.value.push(...data.results)
      currentPagination.value = data.next
      updatePokemonListWithFavorites()
    }

    isFetchingMore.value = false
  }

  const handleSearch = async () => {
    if (!searchText.value.trim()) {
      await fetchInitialData()
      return
    }

    const result = await safeAsyncCall(() => fetchPokemonDetail(searchText.value.toLowerCase()), {
      loading: searchLoading,
    })

    if (result) {
      pokemonList.value = [{ ...result }]
      currentPagination.value = null
      updatePokemonListWithFavorites()
    }
  }

  const resetSearch = () => {
    searchText.value = ''
    handleSearch()
  }

  const handleSelectPokemon = async (details: any) => {
    const isFavorite = mainStore.favoritePokemon.some(fav => fav.name === details.name)

    let finalDetails = details
    if (Object.keys(details).length <= 3) {
      const data = await safeAsyncCall(() => fetchPokemonDetail(details.name))
      if (data) finalDetails = data
    }

    pokemonSelected.value = { ...finalDetails, isFavorite }
    mainStore.setModalVisible()
  }

  const handleCloseModal = () => {
    mainStore.setModalVisible()
    pokemonSelected.value = {}
  }

  const handleFavorite = (details: PokemonBasic) => {
    pokemonSelected.value.isFavorite = !pokemonSelected.value.isFavorite
    mainStore.setFavoritePokemon(details)
    updatePokemonListWithFavorites()
  }

  const updatePokemonListWithFavorites = () => {
    pokemonList.value = pokemonList.value.map(item => ({
      ...item,
      isFavorite: mainStore.favoritePokemon.some(fav => fav.name === item.name),
    }))
  }

  const onScroll = async () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
    if (nearBottom && !showFavorites.value && !searchText.value) {
      await loadMorePokemon()
    }
  }

  onMounted(() => {
    fetchInitialData()
    window.addEventListener('scroll', onScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    mountedLoading,
    searchLoading,
    showErrorMessage,
    showFavorites,
    pokemonList,
    pokemonSelected,
    searchText,
    isFetchingMore,
    currentPagination,
    fetchInitialData,
    handleSearch,
    resetSearch,
    handleSelectPokemon,
    handleFavorite,
    handleCloseModal,
    updatePokemonListWithFavorites,
    loadMorePokemon,
  }
}
