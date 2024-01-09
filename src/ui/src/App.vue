<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }"
      >{{ content ? `Neverland Camping - ${content}` : `Nevrland Camping` }}
    </template>
  </metainfo>

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
