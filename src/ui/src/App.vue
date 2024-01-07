<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }"
      >{{ content ? `Neverland Camping - ${content}` : `Nevrland Camping` }}
    </template>
  </metainfo>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
export default {
  name: 'App',
  metaInfo: {
    title: 'Home'
  }
}
</script>
