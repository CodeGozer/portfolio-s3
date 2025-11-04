<template>
  <CRTLayout>
    <section class="panel">
      <h1>Skills</h1>
      <ul class="skill-list">
        <li v-for="(s, i) in skills" :key="i">{{ s.name }} — {{ s.level }}</li>
      </ul>
    </section>
  </CRTLayout>
</template>

<script setup>
import CRTLayout from '~/components/CRTLayout.vue'
const skills = [
  { name: 'Hacking', level: 4 },
  { name: 'Charisma', level: 6 },
  { name: 'Guns', level: 5 }
]
</script>
