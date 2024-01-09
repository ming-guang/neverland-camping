<script setup lang="ts">
import GlobalNavbar from '@/components/GlobalNavbar.vue'
import UpcomingTournamentsListTitle from '@/components/TournamentsView/UpcomingTournamentsListTitle.vue'
import UpcomingTournamentsList from '@/components/TournamentsView/UpcomingTournamentsList.vue'
</script>

<script lang="ts">
export default {
  metaInfo: {
    title: 'Tournaments'
  }
}
</script>

<template>
  <main>
    <GlobalNavbar />
    <div class="py-8 lg:py-16">
      <UpcomingTournamentsListTitle />
      <Suspense>
        <UpcomingTournamentsList />
      </Suspense>
    </div>
  </main>
</template>
