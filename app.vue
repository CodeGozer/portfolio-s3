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
import { ref, watch, onMounted } from 'vue'

// Gebruik een cookie om te onthouden of de bezoeker de animatie al heeft gezien (verloopt na 7 dagen)
const hasSeenIntro = useCookie('hasSeenIntro', { maxAge: 60 * 60 * 24 * 7 })

// Toon de intro alleen als de cookie nog niet bestaat
const showIntro = ref(!hasSeenIntro.value)

watch(showIntro, (val) => {
  console.log('[App] showIntro changed to:', val)
  if (!val) {
    hasSeenIntro.value = true
  }
})

onMounted(() => {
  console.log('[App] App mounted, showIntro:', showIntro.value)
})
</script>

<style>
/* Keep optional page transition styles minimal; can be extended later */
</style>
