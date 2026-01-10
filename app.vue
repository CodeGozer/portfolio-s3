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

const showIntro = ref(true)

watch(showIntro, (val) => {
  console.log('[App] showIntro changed to:', val)
})

onMounted(() => {
  console.log('[App] App mounted, showIntro:', showIntro.value)
})
</script>

<style>
/* Keep optional page transition styles minimal; can be extended later */
</style>
