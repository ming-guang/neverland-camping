<script setup lang="ts">
import { pb } from '@/utils/ApiClient'
const now = new Date()
const tournaments = await pb.collection('tournament').getFullList({
  filter: `time >= "${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 8)}"`
})
</script>
<template>
  <div
    v-for="tournament in tournaments"
    class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
    :key="tournament.id"
  >
    <img
      class="w-full"
      :src="pb.files.getUrl(tournament, tournament.banner)"
      alt="dashboard image"
    />
    <div class="mt-4 md:mt-0">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        {{ tournament.title }}
      </h2>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        {{ tournament.description }}
      </p>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        <span class="font-bold">Date:</span>
        {{ new Date(tournament.time).toISOString().slice(0, 10) }}
      </p>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        <span class="font-bold">Time:</span>
        {{ new Date(tournament.time).toTimeString().slice(0, 8) }}
      </p>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        <span class="font-bold">Location:</span> {{ tournament.location }}
      </p>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        <span class="font-bold">Address:</span> {{ tournament.address }}
      </p>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        <span class="font-bold">Level:</span> {{ tournament.level }}
      </p>
      <p class="mb-6 text-gray-500 md:text-lg dark:text-gray-400">
        <span class="font-bold">Type:</span> {{ tournament.type }}
      </p>
    </div>
  </div>
</template>
