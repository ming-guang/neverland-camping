<script setup lang="ts">
import GlobalNavbar from '@/components/GlobalNavbar.vue'
import WelcomeHero from '@/components/HomePage/WelcomeHero.vue'
import CoachesList from '@/components/HomePage/CoachesList.vue'
import CoachesListTitle from '@/components/HomePage/CoachesListTitle.vue'
import CoachesListLoading from '@/components/HomePage/CoachesListLoading.vue'
import CoursesLevelDescription from '@/components/HomePage/CoursesLevelDescription.vue'
import FinishedTournamentsListTitle from '@/components/HomePage/FinishedTournamentsListTitle.vue'
import FinishedTournamentsList from '@/components/HomePage/FinishedTournamentsList.vue'
import FinishedTournamentsListLoading from '@/components/HomePage/FinishedTournamentsListLoading.vue'
import UserReviewsListTitle from '@/components/HomePage/UserReviewsListTitle.vue'
import UserReviewsListLoading from '@/components/HomePage/UserReviewsListLoading.vue'
import UserReviewsList from '@/components/HomePage/UserReviewsList.vue'
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
    <div class="py-8 lg:py-16">
      <UserReviewsListTitle />
      <Suspense>
        <UserReviewsList />
        <template #fallback>
          <UserReviewsListLoading />
        </template>
      </Suspense>
    </div>
  </main>
</template>
