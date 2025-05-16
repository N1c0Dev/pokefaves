<template>
  <transition name="fade-modal">
    <div
      v-if="false"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div class="bg-white rounded-[5px] max-w-md w-full pb-6 relative animate-fade-in">
        <div class="relative w-full h-64 mb-3 bg-[url('@/assets/images/landscape.svg')] bg-cover bg-center rounded-t-[5px] overflow-hidden">
          <img
            src="@/assets/images/close-icon.svg"
            class="absolute top-4 right-5 w-[26px] h-[26px] object-contain z-10 cursor-pointer"
            alt="close modal"
          />
          <img
            src="@/assets/images/dummy-scuero.svg"
            class="absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-45 h-45 object-contain z-20"
            alt=""
          />
        </div>
        <section class="px-6">
          <div>
            <div class="flex bg-white border-b border-primary-border text-secondary-color py-3">
              <h4 class="text-lg font-bold self-baseline">Name:</h4>
              <p class="self-baseline ml-1">Lorem ipsum</p>
            </div>
            <div class="flex bg-white border-b border-primary-border text-secondary-color py-3">
              <h4 class="text-lg font-bold self-baseline">Weight:</h4>
              <p class="self-baseline ml-1">Lorem ipsum</p>
            </div>
            <div class="flex bg-white border-b border-primary-border text-secondary-color py-3">
              <h4 class="text-lg font-bold self-baseline">Height:</h4>
              <p class="self-baseline ml-1">Lorem ipsum</p>
            </div>
            <div class="flex bg-white border-b border-primary-border text-secondary-color py-3">
              <h4 class="text-lg font-bold self-baseline">Types:</h4>
              <p class="self-baseline ml-1">Lorem ipsum</p>
            </div>
          </div>
        </section>
        <section class="px-6">
          <div class="flex justify-between mt-4">
            <button class="self-center font-bold bg-primary-button text-white py-2 px-4 rounded-full cursor-pointer">
              Share to my friends
            </button>
            <img class="cursor-pointer w-11 h-11 self-center" src="@/assets/images/star-off.svg" alt="add to favourite">
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.2s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>
