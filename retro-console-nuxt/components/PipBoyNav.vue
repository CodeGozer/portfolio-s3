<template>
  <div class="bottom-row">
    <div class="corner left-corner"></div>
    <nav class="bottom-nav">
      <NuxtLink to="/" class="nav-link">CND</NuxtLink>
      <div class="nav-underline"></div>
      <NuxtLink to="/skills" class="nav-link">SKILLS</NuxtLink>
      <div class="nav-underline"></div>
      <NuxtLink to="/quests" class="nav-link">QUESTS</NuxtLink>
      <div class="nav-underline"></div>
      <NuxtLink to="/profile" class="nav-link">STATS</NuxtLink>
    </nav>
    <div class="corner right-corner"></div>
  </div>
</template>

<script setup>
import { NuxtLink } from '#components'
</script>
