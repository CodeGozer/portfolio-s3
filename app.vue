<template>
  <NuxtPage />
</template>

<style>
/* Page Transition: Screen-Wipe Effect */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.65, 0, 0.35, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateX(30px);
  filter: blur(4px);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
  filter: blur(4px);
}
</style>
