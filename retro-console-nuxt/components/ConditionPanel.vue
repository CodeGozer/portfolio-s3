<template>
  <section class="panel condition-layout">
    <div class="top-row">
      <div class="corner top-left-corner"></div>
      <div class="menu-label">MENU</div>
      <div class="top-stats">
        <div class="stat-box">LVL 21</div>
        <div class="stat-box">HP 419/460</div>
        <div class="stat-box">AP 419/460</div>
        <div class="stat-box">XP 29200/29450</div>
      </div>
      <div class="corner top-right-corner"></div>
    </div>

    <div class="top-lines">
      <div class="top-line left"></div>
      <div class="top-line center"></div>
      <div class="top-line right"></div>
    </div>

    <div class="content-row">
      <aside class="left-menu">
        <div class="menu-item" :class="{active: selected==='cnd'}" @click="selected='cnd'">CND</div>
        <div class="menu-item" :class="{active: selected==='rad'}" @click="selected='rad'">ABOUT ME</div>
        <div class="menu-item">EFF</div>
        <div class="menu-item">H20</div>
      </aside>

      <main class="center-stage">
        <template v-if="selected==='cnd'">
          <div class="logo-wrap">
            <img src="/logo-portfolio.svg" alt="Logo" class="center-logo" />
          </div>
          <div class="center-meta">
            <div class="meta-name">NICO KORNUIJT</div>
            <div class="meta-level">LEVEL 21</div>
          </div>
        </template>
        <template v-else-if="selected==='rad'">
          <div class="about-wrap">
            <img src="https://placehold.co/220x220?text=Photo" alt="About Me" class="about-photo" />
            <div class="about-text">
              <h2>About Me</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, nisl erat dictum enim, nec facilisis enim erat nec urna. Integer euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec facilisis enim erat nec urna.</p>
            </div>
          </div>
        </template>
      </main>
    </div>

    <div class="bottom-row">
      <div class="corner left-corner"></div>
      <nav class="bottom-nav">
        <NuxtLink to="/skills" class="nav-link">SKILLS</NuxtLink>
        <div class="nav-underline"></div>
        <NuxtLink to="/quests" class="nav-link">QUESTS</NuxtLink>
        <div class="nav-underline"></div>
        <NuxtLink to="/profile" class="nav-link">STATS</NuxtLink>
      </nav>
      <div class="corner right-corner"></div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { NuxtLink } from '#components'
const selected = ref('cnd')
</script>
