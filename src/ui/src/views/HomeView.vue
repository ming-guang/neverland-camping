<script setup lang="ts">
import GlobalNavbar from '@/components/GlobalNavbar.vue'
import WelcomeHero from '@/components/WelcomeHero.vue'
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
  </main>
</template>
