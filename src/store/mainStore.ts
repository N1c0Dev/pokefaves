import { reactive } from 'vue'

export const mainStore = reactive({
  modalVisble: false,
  setModalVisible() {
    this.modalVisble = !this.modalVisble
  },
})
