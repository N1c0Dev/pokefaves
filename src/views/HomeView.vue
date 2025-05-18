<script setup lang="ts">
import { mainStore } from '@/store/mainStore'
import { debounce } from '@/utils/debounce'
import { usePokemonList } from '@/composables/usePokemonList'

import PokemonItem from '@/components/PokemonItem.vue'
import DetailsModal from '@/components/DetailsModal.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import ButtonElement from '@/components/forms/ButtonElement.vue'
import DotsSpinner from '@/components/icons/DotsSpinner.vue'

const {
  mountedLoading,
  searchLoading,
  showErrorMessage,
  showFavorites,
  pokemonList,
  pokemonSelected,
  searchText,
  isFetchingMore,
  handleSearch,
  resetSearch,
  handleSelectPokemon,
  handleFavorite,
  handleCloseModal,
} = usePokemonList()

const debounceSearch = debounce(handleSearch, 500)
</script>

<template>
  <LoadingScreen class="h-screen" :is-visible="mountedLoading" />
  <section v-if="!mountedLoading" class="flex">
    <div
      class="
        w-2/12
        lg:w-3/12"
    />
    <div
      class="
        w-8/12
        mt-10
        lg:w-6/12
      "
    >
      <section
        class="
          relative
          mb-4\
        "
      >
        <div
          class="
            absolute
            inset-y-0
            left-0
            flex
            items-center
            pl-4
            pointer-events-none
          "
        >
          <img
            src="@/assets/images/magnifier.svg"
            alt=""
          >
        </div>
        <input
          v-model="searchText"
          id="search-input"
          type="text"
          placeholder="Search"
          class="
            h-[50px]
            bg-white
            font-montserrat
            pl-12
            w-full
            font-medium
            rounded-[5px]
            shadow-[0px_2px_10px_0px_#0000000A]
            placeholder:text-faded-color
            focus:outline-blue-300
          "
          @keyup="debounceSearch"
        />
      </section>
      <LoadingScreen
        class="h-50"
        :is-visible="searchLoading"
      />
      <ErrorMessage
        :is-visible="showErrorMessage"
        :reset-func="resetSearch"
      />
      <section
        v-if="!searchLoading && !showErrorMessage && !showFavorites"
        class="
          grid
          grid-cols-1
          gap-4
          mt-10
          mb-30
        "
      >
        <div
          v-for="(item, index) in pokemonList"
          :key="index"
        >
          <PokemonItem
            :pokemon-details="item"
            @select-pokemon="handleSelectPokemon"
            @add-to-favorites="handleFavorite"
          />
        </div>
        <div
          v-if="isFetchingMore"
          class="
            flex
            justify-center
            py-4
          "
        >
          <DotsSpinner v-if="isFetchingMore"/>
        </div>
      </section>

      <section
        v-if="showFavorites"
        class="
          grid
          grid-cols-1
          gap-4
          mt-10
          mb-30
        "
      >
        <div
          v-for="(item, index) in mainStore.favoritePokemon"
          :key="index"
        >
          <PokemonItem
            :pokemon-details="item"
            @select-pokemon="handleSelectPokemon"
            @add-to-favorites="handleFavorite"
          />
        </div>
      </section>

      <DetailsModal
        :is-visible="mainStore.modalVisble"
        :pokemon-details="pokemonSelected"
        :close-func="handleCloseModal"
        @add-to-favorites="handleFavorite"
      />
    </div>
    <div
      class="
        w-2/12
        lg:w-3/12
      "
    />
  </section>

  <footer
    v-if="!mountedLoading"
    class="
      flex
      justify-center
      shadow-[0px_-5px_4px_0px_#0000000D]
      bg-white
      p-4
      fixed
      bottom-0
      left-0
      right-0
    "
  >
    <div
      class="
        w-2/12
        lg:w-3/12
      "
    />
    <section
      class="
        flex
        w-8/12
        gap-4
        lg:w-6/12
      "
    >
      <ButtonElement
        class="
          h-11
          w-1/2
          mt-4
          font-bold
          flex
          justify-center
          gap-3
        "
        id-tag="list-all-button"
        :is-active="!showFavorites"
        :clickFunc="() => { showFavorites = false }"
      >
        <img
          class="self-center"
          src="@/assets/images/list-icon.svg"
          alt=""
        >
        <p class="self-center">All</p>
      </ButtonElement>
      <ButtonElement
        class="
          h-11
          w-1/2
          mt-4
          font-bold
          flex
          justify-center
          gap-3
        "
        id-tag="favorite-button"
        :is-active="showFavorites"
        :clickFunc="() => { showFavorites = true }"
      >
        <img
          class="self-center"
          src="@/assets/images/star-icon.svg"
          alt=""
        >
        <p class="self-center">Favorites</p>
      </ButtonElement>
    </section>
    <div
      class="
        w-2/12
        lg:w-3/12
      "
    />
  </footer>
</template>
