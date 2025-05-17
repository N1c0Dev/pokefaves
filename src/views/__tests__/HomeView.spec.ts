import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PokemonList from '@/views/HomeView.vue'
import axios from 'axios'

vi.mock('@/components/PokemonItem.vue', () => ({
  default: {
    name: 'PokemonItem',
    template: '<div class="pokemon-item">{{ pokemonDetails.name }}</div>',
    props: ['pokemonDetails'],
  },
}))

vi.mock('@/components/LoadingScreen.vue', () => ({
  default: {
    name: 'LoadingScreen',
    template: '<div v-if="isVisible">Loading...</div>',
    props: ['isVisible'],
  },
}))

vi.mock('@/components/ErrorMessage.vue', () => ({
  default: {
    name: 'ErrorMessage',
    template: '<div v-if="isVisible">Error</div>',
    props: ['isVisible', 'resetFunc'],
  },
}))

vi.mock('@/components/forms/ButtonElement.vue', () => ({
  default: {
    name: 'ButtonElement',
    template: '<button @click="clickFunc()">Button</button>',
    props: ['clickFunc', 'isActive'],
  },
}))

vi.mock('@/components/icons/DotsSpinner.vue', () => ({
  default: {
    name: 'DotsSpinner',
    template: '<div>LoadingMore</div>',
  },
}))

vi.mock('@/components/DetailsModal.vue', () => ({
  default: {
    name: 'DetailsModal',
    template: '<div v-if="isVisible">Modal</div>',
    props: ['isVisible', 'pokemonDetails', 'closeFunc'],
  },
}))

vi.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const POKE_API_URL = import.meta.env.VITE_POKE_API_URL

describe('PokemonList.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and displays Pokémon list on mount', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [{ name: 'bulbasaur', url: 'url' }],
        next: null,
      },
    })

    const wrapper = mount(PokemonList)
    await flushPromises()
    await new Promise(resolve => setTimeout(resolve, 1600))

    expect(wrapper.html()).toContain('bulbasaur')
  })

  it('shows error if API fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('fail'))

    const wrapper = mount(PokemonList)
    await flushPromises()
    await new Promise(resolve => setTimeout(resolve, 1600))

    expect(wrapper.html()).toContain('Error')
  })

  it('filters Pokémon list when typing in input', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({
        data: {
          results: [{ name: 'bulbasaur', url: 'url' }],
          next: null,
        },
      })
      .mockResolvedValueOnce({
        data: {
          name: 'pikachu',
          url: 'url',
        },
      })

    const wrapper = mount(PokemonList)
    await flushPromises()
    await new Promise(resolve => setTimeout(resolve, 1600))

    const input = wrapper.find('input[type="text"]')
    await input.setValue('pikachu')
    await input.trigger('keyup')
    await new Promise(resolve => setTimeout(resolve, 600))

    expect(mockedAxios.get).toHaveBeenLastCalledWith(`${POKE_API_URL}pikachu`)
  })
})
