import { reactive } from 'vue'

export const mainStore = reactive({
  modalVisble: false,
  favouritePokemon: [] as string[],
  setModalVisible() {
    this.modalVisble = !this.modalVisble
  },
  setFavouritePokemon(pokemonItem: string) {
    const index = this.favouritePokemon.findIndex(element => element.name === pokemonItem.name)

    if (index !== -1) {
      this.favouritePokemon.splice(index, 1)
    } else {
      this.favouritePokemon.push(pokemonItem)
    }
  }
})
