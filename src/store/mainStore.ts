import { reactive } from 'vue'

export const mainStore = reactive({
  modalVisble: false,
  favoritePokemon: [] as string[],
  setModalVisible() {
    this.modalVisble = !this.modalVisble
  },
  setFavoritePokemon(pokemonItem: string) {
    const index = this.favoritePokemon.findIndex(element => element.name === pokemonItem.name)

    if (index !== -1) {
      this.favoritePokemon.splice(index, 1)
    } else {
      this.favoritePokemon.push(pokemonItem)
    }
  }
})
