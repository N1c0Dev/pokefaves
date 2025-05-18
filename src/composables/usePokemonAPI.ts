import axios from 'axios'

export interface PokemonBasic {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: PokemonBasic[]
  next: string | null
}

export interface PokemonDetail {
  name: string
}

const POKE_API_URL = import.meta.env.VITE_POKE_API_URL

export async function fetchPokemonList(url = POKE_API_URL): Promise<PokemonListResponse> {
  const res = await axios.get<PokemonListResponse>(url)
  return res.data
}

export async function fetchPokemonDetail(name: string): Promise<PokemonDetail> {
  const res = await axios.get<PokemonDetail>(`${POKE_API_URL}${name}`)
  return res.data
}
