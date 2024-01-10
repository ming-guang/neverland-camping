<script setup lang="ts">
import GlobalNavbar from '@/components/GlobalNavbar.vue'
import LessonsListTitle from '@/components/CoursePage/LessonsListTitle.vue'
import LessonsList from '@/components/CoursePage/LessonsList.vue';
</script>
<script lang="ts">
export default {
  metaInfo: {
    title: 'Lessons'
  }
}
</script>
<template>
  <main>
    <GlobalNavbar />
    <div class="py-8 lg:py-16">
      <LessonsListTitle />
      <Suspense>
        <LessonsList />
      </Suspense>
    </div>
  </main>
</template>