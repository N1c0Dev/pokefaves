import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePokemonList } from '@/composables/usePokemonList'
import * as api from '@/composables/usePokemonAPI'

vi.mock('@/composables/usePokemonAPI', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    fetchPokemonList: vi.fn(),
    fetchPokemonDetail: vi.fn(),
  }
})

vi.mock('@/store/mainStore', () => ({
  mainStore: {
    favoritePokemon: [],
    modalVisble: false,
    setModalVisible: vi.fn(),
    setFavoritePokemon: vi.fn(),
  },
}))

describe('usePokemonList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchInitialData loads and assigns Pokémon list', async () => {
    const mockData = {
      results: [{ name: 'bulbasaur', url: 'url' }],
      next: 'next-url',
    }

    ;(api.fetchPokemonList as any).mockResolvedValue(mockData)

    const { fetchInitialData, pokemonList, currentPagination } = usePokemonList()
    await fetchInitialData()

    expect(pokemonList.value).toHaveLength(1)
    expect(pokemonList.value[0].name).toBe('bulbasaur')
    expect(currentPagination.value).toBe('next-url')
  })

  it('handleSearch searches and replaces list with single result', async () => {
    const mockResult = { name: 'pikachu', id: 25 }

    ;(api.fetchPokemonDetail as any).mockResolvedValue(mockResult)

    const { handleSearch, searchText, pokemonList } = usePokemonList()
    searchText.value = 'pikachu'
    await handleSearch()

    expect(pokemonList.value[0].name).toBe('pikachu')
  })

  it('handleSelectPokemon fetches full detail when needed', async () => {
    const mockDetail = { name: 'mewtwo', id: 150 }

    ;(api.fetchPokemonDetail as any).mockResolvedValue(mockDetail)

    const { handleSelectPokemon, pokemonSelected } = usePokemonList()
    await handleSelectPokemon({ name: 'mewtwo' })

    expect(pokemonSelected.value.name).toBe('mewtwo')
  })

  it('handleFavorite toggles favorite and updates list', async () => {
    const { handleFavorite, pokemonSelected, pokemonList } = usePokemonList()

    pokemonSelected.value = { name: 'eevee', isFavorite: false }
    pokemonList.value = [{ name: 'eevee' }]

    handleFavorite({ name: 'eevee', url: 'some-url' })
    expect(pokemonSelected.value.isFavorite).toBe(true)
  })
})
