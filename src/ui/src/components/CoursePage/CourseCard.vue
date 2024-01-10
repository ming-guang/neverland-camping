<script setup lang="ts">
import { pb } from '@/utils/ApiClient';
import type { BaseSystemFields, CoursesRecord, UsersRecord } from '@/utils/PocketbaseTypes';
import { ClientResponseError } from 'pocketbase';
import { ref } from 'vue';
const courseUrl = ref<string>('/courses');
const props = defineProps<{
    course: CoursesRecord & BaseSystemFields<{ coach: UsersRecord }>,
    showNotification: (message: string) => void,
}>()
const loggedIn = pb.authStore.isValid;
const isStudent = ref<boolean>(false);
async function doIsStudentCheck() {
    if (!loggedIn) {
        return;
    }
    const check = await pb.collection('courseStudents').getFirstListItem(`student.id="${pb.authStore.model!["id"]}" && course.id="${props.course.id}"`)
    if (check.id != "") {
        courseUrl.value = `course/${check.id}`;
        isStudent.value = true;
    }
}
doIsStudentCheck();
async function joinCourse() {
    try {
        await pb.collection('courseStudents').create({
            "course": props.course.id,
            "student": pb.authStore.model!["id"] ?? "",
        });
        isStudent.value = true;
    } catch (err) {
        if (!(err instanceof ClientResponseError)) {
            return
        }
        if (!err.message.startsWith("Failed to create record")) {
            props.showNotification(err.message)
            return
        }
        const data: { [key: string]: { message: string } } = err.data.data
        const message = Object.entries(data)
            .map(([key, value]: [string, { message: string }]) => `'${key}' ${value.message}`)
            .join('<br>')
        props.showNotification(message)
    }
}
</script>

<template>
    <RouterLink :to="courseUrl"
        class="flex flex-col items-center justify-start bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div
            class="inline-flex justify-center items-center object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg">
            <div
                class="w-[3.5rem] h-[3.5rem] inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 max-w-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41a60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84a51.39 51.39 0 0 0-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5m0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
            </div>
        </div>
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ course.name }}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ course.description }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span class="font-bold">Level:</span> {{
                course.level }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span class="font-bold">Fee:</span> {{
                course.fee }} / {{ course.feeSchedule }} days</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span class="font-bold">Location:</span> {{
                course.location }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span class="font-bold">Schedule:</span> {{
                course.schedule ?? "" }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span class="font-bold">By:</span> {{
                course.expand?.coach.name }}</p>
        </div>
        <template v-if="!loggedIn">
            <RouterLink to="/sign-in"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Join now
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </RouterLink>
        </template>
        <template v-else-if="!isStudent">
            <a href="#" @click="() => joinCourse()"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Join now
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
        </template>
    </RouterLink>
</template>