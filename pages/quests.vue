<template>
  <ProfessionalLayout>
    <section class="quests-layout">
      <div class="content-row">
        <aside class="quest-list">
        <div
          v-for="(quest, i) in quests"
          :key="i"
          :class="['quest-item', {active: i === selected}]"
          @click="selected = i"
        >
          {{ quest.title }}
        </div>
      </aside>
      <main class="quest-details" v-if="quests[selected]">
        <h2>{{ quests[selected].title }}</h2>
        <p class="quest-desc">{{ quests[selected].description }}</p>
        <div v-for="(section, j) in quests[selected].sections" :key="j" class="quest-section">
          <h3>{{ section.title }}</h3>
          <template v-if="section.type === 'text'">
            <p>{{ section.content }}</p>
          </template>
          <template v-else-if="section.type === 'list'">
            <ul>
              <li v-for="(item, k) in section.content" :key="k">{{ item }}</li>
            </ul>
          </template>
          <template v-else-if="section.type === 'gallery'">
            <div class="gallery">
              <figure v-for="(img, k) in section.images" :key="k">
                <img :src="img.src" :alt="img.alt" />
                <figcaption>{{ img.caption }}</figcaption>
              </figure>
            </div>
          </template>
          <template v-else-if="section.type === 'documentation'">
            <div class="docs">
              <a v-if="section.pdf" :href="section.pdf" target="_blank">PDF Documentatie</a>
              <a v-if="section.figma" :href="section.figma" target="_blank">Figma</a>
              <a v-if="section.website" :href="section.website" target="_blank">Website</a>
              <a v-if="section.git" :href="section.git" target="_blank">Git Repo</a>
            </div>
          </template>
        </div>
      </main>
      </div>
    </section>
  </ProfessionalLayout>
</template>

<script setup>
import ProfessionalLayout from '~/components/ProfessionalLayout.vue'
import { ref } from 'vue'
import questsData from '@/projects.json'
const quests = questsData.projects
const selected = ref(0)
</script>
