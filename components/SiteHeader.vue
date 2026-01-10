<template>
  <header class="site-header">
    <NuxtLink to="/" class="site-logo">
      <img src="/vault-boy-intro.jpg" alt="CodeGozer" style="image-rendering: pixelated; mix-blend-mode: screen;" />
      <span class="logo-text">CODEGOZER</span>
    </NuxtLink>
    <nav class="site-nav">
      <NuxtLink to="/" class="nav-link">Home</NuxtLink>
      <NuxtLink to="/quests" class="nav-link">Projects</NuxtLink>
      <NuxtLink to="/skills" class="nav-link">Skills</NuxtLink>
      <NuxtLink to="/profile" class="nav-link">Contact</NuxtLink>
    </nav>
  </header>
</template>

<script setup>
// Uses NuxtLink; auto-registered
</script>
