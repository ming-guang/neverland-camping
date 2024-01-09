<script setup lang="ts">
import GlobalNavbar from '@/components/GlobalNavbar.vue'
import WelcomeHero from '@/components/WelcomeHero.vue'
import CoachesList from '@/components/CoachesList.vue'
import CoachesListTitle from '@/components/CoachesListTitle.vue'
import CoachesListLoading from '@/components/CoachesListLoading.vue'
import CoursesLevelDescription from '@/components/CoursesLevelDescription.vue'
import FinishedTournamentsListTitle from '@/components/FinishedTournamentsListTitle.vue'
import FinishedTournamentsList from '@/components/FinishedTournamentsList.vue'
import FinishedTournamentsListLoading from '@/components/FinishedTournamentsListLoading.vue'
</script>

<script lang="ts">
export default {
  metaInfo: {
    title: 'Home'
  }
}
</script>

<template>
  <main>
    <GlobalNavbar />
    <WelcomeHero />
    <div class="py-8 lg:py-16">
      <CoursesLevelDescription />
    </div>
    <div class="py-8 lg:py-16">
      <CoachesListTitle />
      <Suspense>
        <CoachesList />
        <template #fallback>
          <CoachesListLoading />
        </template>
      </Suspense>
    </div>
    <div class="py-8 lg:py-16">
      <FinishedTournamentsListTitle />
      <Suspense>
        <FinishedTournamentsList />
        <template #fallback>
          <FinishedTournamentsListLoading />
        </template>
      </Suspense>
    </div>
  </main>
</template>
