<script setup lang="ts">
import { pb } from '@/utils/ApiClient'
import { useRoute } from 'vue-router';
import LessonCard from "@/components/CoursePage/LessonCard.vue"
const route = useRoute();
const { params: { courseId } } = route;
const lessons = await pb.collection('lessons').getFullList({
    filter: `course.id="${courseId}"`
})
</script>
<template>
    <div class="grid grid-cols-1 gap-2 max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-10">
        <template v-for="lesson in lessons" :key="lesson.id">
            <LessonCard :lesson="lesson" />
        </template>
    </div>
</template>
