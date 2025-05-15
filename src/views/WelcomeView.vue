<template>
  <section class="flex flex-col items-center justify-center h-screen">
    <img src="@/assets/logo.svg" alt="Pikachu waving">
    <h1 class="text-3xl font-bold text-center">Welcome to the Pokedex</h1>
    <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, temporibus repellat sequi quibusdam iste labore molestias, tempore deserunt atque aut, nihil enim tenetur illum. A aperiam tempora culpa impedit quam!</p>
    <button class="mt-4 bg-red-500 text-white py-2 px-4 rounded-full">
      <router-link to="/home">Get started</router-link>
    </button>
  </section>
</template>
