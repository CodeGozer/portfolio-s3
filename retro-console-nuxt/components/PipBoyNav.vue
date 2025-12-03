<template>
  <div class="cockpit-nav-wrapper">
    <!-- Left Vertical Nav Panel -->
    <aside class="cockpit-nav-left">
      <NuxtLink to="/" class="cockpit-nav-item">
        <span class="nav-icon">●</span>
        <span class="nav-label">HOME</span>
      </NuxtLink>
      <NuxtLink to="/skills" class="cockpit-nav-item">
        <span class="nav-icon">●</span>
        <span class="nav-label">SKILLS</span>
      </NuxtLink>
    </aside>

    <!-- Right Vertical Nav Panel -->
    <aside class="cockpit-nav-right">
      <NuxtLink to="/quests" class="cockpit-nav-item">
        <span class="nav-label">PROJECTS</span>
        <span class="nav-icon">●</span>
      </NuxtLink>
      <NuxtLink to="/profile" class="cockpit-nav-item">
        <span class="nav-label">CONTACT</span>
        <span class="nav-icon">●</span>
      </NuxtLink>
    </aside>

    <!-- Bottom Status Bar -->
    <footer class="status-bar">
      <div class="status-item">
        <span class="status-label">STATUS:</span>
        <span class="status-value status-ok">BUILD CLEAN</span>
      </div>
      <div class="status-item">
        <span class="status-label">LAST DEPLOY:</span>
        <span class="status-value">NOMINAL</span>
      </div>
      <div class="status-item">
        <span class="status-label">CPU TEMP:</span>
        <span class="status-value status-warn">CLASSIFIED</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Nuxt auto-registers `NuxtLink`; no manual import required.
</script>
