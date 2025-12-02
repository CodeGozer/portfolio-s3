<template>
  <section class="panel condition-layout">
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
            <img src="/logo-portfolio.png" alt="Logo" class="center-logo" />
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

    <PipBoyNav />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import PipBoyNav from '~/components/PipBoyNav.vue'
const selected = ref('cnd')
</script>
