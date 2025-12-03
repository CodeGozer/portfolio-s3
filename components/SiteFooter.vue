<template>
  <footer class="site-footer">
    <div class="footer-left">
      <span>© {{ new Date().getFullYear() }} CodeGozer</span>
    </div>
    <div class="footer-right">
      <NuxtLink to="/profile" class="nav-link">Contact</NuxtLink>
      <a href="https://github.com/CodeGozer" target="_blank" rel="noopener" class="nav-link">GitHub</a>
    </div>
  </footer>
</template>

<script setup>
// Minimal footer
</script>
