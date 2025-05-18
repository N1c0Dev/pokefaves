<script setup lang="ts">
const dev = import.meta.env.DEV;
</script>

<template>
  <main :class="[dev ? 'debug-screens' : '']">
    <RouterView />
  </main>
</template>

