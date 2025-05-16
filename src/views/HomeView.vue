<script setup lang="ts">
import DetailsModal from '@/components/DetailsModal.vue';

</script>

<template>
  <section>
    <input type="text" placeholder="Search" class="bg-white border p-2 w-full mb-4" />
  </section>
  <section>
    <div class="grid grid-cols-1 gap-4">
      <div class="flex justify-between bg-white p-4 border">
        <h2 class="text-xl font-bold">Pokemon 1</h2>
        <p>lorem</p>
      </div>
      <div class="flex justify-between bg-white p-4 border">
        <h2 class="text-xl font-bold">Pokemon 2</h2>
        <p>lorem</p>
      </div>
    </div>
  </section>
  <DetailsModal/>
  <footer class="flex justify-center shadow-md bg-white rounded-lg p-4 gap-4">
    <button class="mt-4 bg-red-500 text-white py-2 px-4 rounded-full">All</button>
    <button class="mt-4 bg-red-500 text-white py-2 px-4 rounded-full">Favorites</button>
  </footer>
</template>
