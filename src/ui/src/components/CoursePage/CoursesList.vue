<script setup lang="ts">
import { pb } from '@/utils/ApiClient'
import CourseCard from '@/components/CoursePage/CourseCard.vue';
import type { BaseSystemFields, CoursesRecord, UsersRecord } from '@/utils/PocketbaseTypes';
import { ref } from 'vue';
const message = ref<string>('');
const courses = await pb.collection('courses').getFullList<CoursesRecord & BaseSystemFields<{ coach: UsersRecord }>>({
    expand: "coach"
})
function showNotification(msg: string) {
    message.value = msg;
}
</script>
<template>
    <div class="grid grid-cols-1 gap-2 max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-10">
        <template v-for="course in courses" :key="course.id">
            <CourseCard :course="course" :show-notification="showNotification" />
        </template>
    </div>
    <div v-if="message != ''" id="toast-warning"
        class="absolute flex items-center w-full max-w-xs bottom-5 right-2 p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert">
        <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span class="sr-only">Warning icon</span>
        </div>
        <div class="ms-3 text-sm font-normal" v-html="message"></div>
        <button type="button" @click="() => {
            message = ''
        }
            "
            class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-warning" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
    </div>
</template>
