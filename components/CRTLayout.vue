<template>
  <!-- Fullscreen Cockpit Terminal Shell -->
  <div class="pipboy-shell">
    <div class="pipboy-bezel">
      <!-- Rivets -->
      <div class="rivet"></div>
      <div class="rivet"></div>
      <div class="rivet"></div>
      <div class="rivet"></div>
      <div class="rivet"></div>
      <div class="rivet"></div>
      
      <div class="crt-screen">
        <div class="scanlines"></div>
        <PipBoyStatsBar />
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
// Components in `components/` are auto-registered by Nuxt.
</script>

