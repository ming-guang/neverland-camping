<script setup lang="ts">
import type { LessonsRecord } from '@/utils/PocketbaseTypes';
import { ref } from 'vue';
const courseUrl = ref<string>('/courses');
const props = defineProps<{
    lesson: LessonsRecord,
}>()
</script>

<template>
    <div
        class="flex flex-col items-center justify-start bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ props.lesson.title }}</h5>
            <div v-html="props.lesson.description">

            </div>
        </div>
    </div>
</template>