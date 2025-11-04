<template>
  <CRTLayout>
    <section class="quests-layout">
      <nav class="bottom-nav visible">
        <NuxtLink to="/" class="nav-link">CND</NuxtLink>
        <div class="nav-underline"></div>
        <NuxtLink to="/skills" class="nav-link">SKILLS</NuxtLink>
        <div class="nav-underline"></div>
        <NuxtLink to="/quests" class="nav-link active">QUESTS</NuxtLink>
        <div class="nav-underline"></div>
        <NuxtLink to="/profile" class="nav-link">STATS</NuxtLink>
      </nav>
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
    </section>
  </CRTLayout>
</template>

<script setup>
import CRTLayout from '~/components/CRTLayout.vue'
import { ref } from 'vue'
import { NuxtLink } from '#components'
import questsData from '~/../projects.json'
const quests = questsData.projects
const selected = ref(0)
</script>

<style scoped>
.quests-layout {
  display: flex;
  height: calc(100vh - 60px);
}

.bottom-nav {
  display: flex;
  background: #111;
  color: #eee;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: center;
}

.nav-link {
  color: #ff9800;
  text-decoration: none;
  padding: 10px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #e68900;
}

.nav-link.active {
  font-weight: bold;
}

.nav-underline {
  height: 2px;
  background: #ff9800;
  transition: width 0.3s;
}

.quests-layout {
  padding-bottom: 60px; /* Adjusted for bottom nav */
}

.quest-list {
  background: #111;
  color: #eee;
  padding: 10px;
  width: 250px;
  overflow-y: auto;
}

.quest-item {
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: background 0.3s;
}

.quest-item:hover {
  background: #222;
}

.quest-item.active {
  background: #007bff;
  color: #fff;
}

.quest-details {
  flex: 1;
  padding: 20px;
  background: #fff;
  overflow-y: auto;
}

.quest-desc {
  font-size: 16px;
  margin: 10px 0;
}

.quest-section {
  margin: 20px 0;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
}

figure {
  margin: 0 10px 10px 0;
  flex: 1 1 calc(33.333% - 10px);
}

figcaption {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.docs a {
  display: block;
  margin: 5px 0;
  color: #007bff;
  text-decoration: none;
}

.docs a:hover {
  text-decoration: underline;
}
</style>
