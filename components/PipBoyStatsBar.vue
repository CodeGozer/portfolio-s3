<template>
  <div class="hud-header">
    <div class="hud-brackets">
      <div class="bracket-left"></div>
      <div class="hud-callsign">
        <div class="callsign-label">OPERATOR</div>
        <div class="callsign-name">NICO KORNUIJT</div>
        <div class="callsign-tag">CALLSIGN: CODEGOZER</div>
      </div>
      <div class="bracket-right"></div>
      <button class="ml-6 px-3 py-1 border-2" @click="toggleHudMode">HUD MODE: {{ hudModeLabel }}</button>
    </div>
    <div class="hud-divider"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isLite = ref(false)
const hudModeLabel = computed(() => isLite.value ? 'LITE' : 'FULL')

function applyMode() {
  const root = document.documentElement
  if (isLite.value) root.classList.add('hud-lite')
  else root.classList.remove('hud-lite')
}

function toggleHudMode(){
  isLite.value = !isLite.value
  applyMode()
}

onMounted(() => applyMode())
</script>
