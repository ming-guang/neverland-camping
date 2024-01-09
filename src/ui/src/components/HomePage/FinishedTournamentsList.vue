<script setup lang="ts">
import { pb } from '@/utils/ApiClient'
const now = new Date()
const tournaments = await pb.collection('tournament').getFullList({
  filter: `time < "${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 8)}"`
})
</script>

<template>
  <div class="grid grid-cols-3 gap-2 max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-10">
    <div
      v-for="tournament in tournaments"
      class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      :key="tournament.id"
    >
      <a href="#">
        <img class="rounded-t-lg" :src="pb.files.getUrl(tournament, tournament.image)" alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ tournament.title }}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ tournament.description }}
        </p>
      </div>
    </div>
  </div>
</template>
