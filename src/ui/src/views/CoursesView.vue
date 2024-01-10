<script setup lang="ts">
import GlobalNavbar from '@/components/GlobalNavbar.vue'
import CoursesListTitle from '@/components/CoursePage/CoursesListTitle.vue'
import CoursesList from '@/components/CoursePage/CoursesList.vue';
</script>
<script lang="ts">
export default {
  metaInfo: {
    title: 'Courses'
  }
}
</script>
<template>
  <main>
    <GlobalNavbar />
    <div class="py-8 lg:py-16">
      <CoursesListTitle />
      <Suspense>
        <CoursesList />
      </Suspense>
    </div>
  </main>
</template>