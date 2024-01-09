<script setup lang="ts">
import { pb } from '@/utils/ApiClient'
const coaches = await pb.collection('users').getFullList({
  filter: 'role="COACH"'
})
</script>

<template>
  <div class="grid grid-cols-2 gap-2 max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-10">
    <div
      v-for="coach in coaches"
      class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      :key="coach.id"
    >
      <a href="#">
        <img class="rounded-t-lg" :src="pb.files.getUrl(coach, coach.avatar)" alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ coach.name }}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Coach</p>
      </div>
    </div>
  </div>
</template>
