<template>
  <!-- Fullscreen Pip-Boy style shell -->
  <div class="pipboy-shell">
    <div class="pipboy-bezel">
      <div class="crt-screen">
        <div class="scanlines"></div>
        <PipBoyStatsBar />
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
import PipBoyStatsBar from '~/components/PipBoyStatsBar.vue'
