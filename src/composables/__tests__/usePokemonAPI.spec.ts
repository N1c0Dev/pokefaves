import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { fetchPokemonList, fetchPokemonDetail } from '@/composables/usePokemonAPI'

vi.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const POKE_API_URL = import.meta.env.VITE_POKE_API_URL

describe('usePokemonAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchPokemonList returns results and next URL', async () => {
    const mockData = {
      results: [{ name: 'bulbasaur', url: 'url' }],
      next: 'next-url',
    }

    mockedAxios.get.mockResolvedValueOnce({ data: mockData })

    const result = await fetchPokemonList()
    expect(mockedAxios.get).toHaveBeenCalledWith(POKE_API_URL)
    expect(result).toEqual(mockData)
  })

  it('fetchPokemonList works with a custom URL', async () => {
    const customUrl = `${POKE_API_URL}?offset=20`
    mockedAxios.get.mockResolvedValueOnce({ data: { results: [], next: null } })

    await fetchPokemonList(customUrl)
    expect(mockedAxios.get).toHaveBeenCalledWith(customUrl)
  })

  it('fetchPokemonDetail returns the Pokémon detail', async () => {
    const mockDetail = { name: 'pikachu', id: 25 }
    mockedAxios.get.mockResolvedValueOnce({ data: mockDetail })

    const result = await fetchPokemonDetail('pikachu')
    expect(mockedAxios.get).toHaveBeenCalledWith(`${POKE_API_URL}pikachu`)
    expect(result).toEqual(mockDetail)
  })
})
