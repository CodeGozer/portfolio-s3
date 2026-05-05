<template>
  <div>
    <Teleport to="body">
      <PipBoyIntro v-if="showIntro" @finish="showIntro = false" class="z-[9999]" />
    </Teleport>
    
    <!-- Render pages directly -->
    <div v-if="!showIntro">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const route = useRoute()

// Gebruik een versie-cookie zodat bezoekers de herstelde intro opnieuw een keer zien.
const hasSeenIntro = useCookie('hasSeenIntroV2', { maxAge: 60 * 60 * 24 * 7 })
const forceIntro = computed(() => route.query.intro === '1')
const showIntro = ref(forceIntro.value || !hasSeenIntro.value)

watch(showIntro, (val) => {
  if (!val && !forceIntro.value) {
    hasSeenIntro.value = true
  }
})
</script>

<style>
/* Keep optional page transition styles minimal; can be extended later */
</style>
