<template>
  <CRTLayout>
    <section class="panel profile-panel">
      <h1>Profile</h1>
      <div class="profile-grid">
        <img src="/logo-placeholder.svg" alt="Logo" class="profile-logo" />
        <div class="profile-info">
          <p><strong>Name:</strong> Lorem Ipsum</p>
          <p><strong>HP:</strong> 89 / 110</p>
          <p><strong>DT:</strong> 21</p>
        </div>
      </div>
    </section>
  </CRTLayout>
</template>

<script setup>
import CRTLayout from '~/components/CRTLayout.vue'
</script>
