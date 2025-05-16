<template>
  <transition name="fade-modal">
    <div
      v-if="true"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div class="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fade-in">
        <button class="absolute top-2 right-2 text-gray-500">
          ✕
        </button>
        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
        <section>
          <div>
            <div class="flex bg-white border-b">
              <h4 class="text-xl font-bold self-baseline">Name:</h4>
              <p class="self-baseline ml-1 text-gray-500">Lorem ipsum</p>
            </div>
            <div class="flex bg-white border-b">
              <h4 class="text-xl font-bold self-baseline">Weight:</h4>
              <p class="self-baseline ml-1 text-gray-500">Lorem ipsum</p>
            </div>
            <div class="flex bg-white border-b">
              <h4 class="text-xl font-bold self-baseline">Height:</h4>
              <p class="self-baseline ml-1 text-gray-500">Lorem ipsum</p>
            </div>
            <div class="flex bg-white border-b">
              <h4 class="text-xl font-bold self-baseline">Types:</h4>
              <p class="self-baseline ml-1 text-gray-500">Lorem ipsum</p>
            </div>
          </div>
        </section>
        <section>
          <div class="flex justify-between mt-4">
            <button class="bg-red-500 text-white py-2 px-4 rounded-full">
              Share
            </button>
            <p>lorem</p>
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
