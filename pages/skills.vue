<template>
  <div class="pipboy-shell">
    <div class="pipboy-bezel">
      <!-- Standard Overlay Effects -->
      <div class="rivet"></div>
      <div class="rivet"></div>
      <div class="rivet"></div>
      <div class="rivet"></div>
      
      <div class="crt-screen animated-crt pro-crt">
        <div class="crt-glare"></div>
        <div class="crt-noise"></div>
        <div class="scanlines"></div>

        <div class="screen-content">
          <!-- Site Header -->
          <SiteHeader />

          <!-- Pip-Boy Tab Navigation -->
          <div class="sub-nav">
            <div class="sub-nav-item" :class="{ active: activeTab === 'STATS' }" @click="activeTab = 'STATS'">STATS</div>
            <div class="sub-nav-item" :class="{ active: activeTab === 'PERKS' }" @click="activeTab = 'PERKS'">PERKS</div>
          </div>

          <!-- Main Two-Pane Content -->
          <main class="skills-layout">
            
            <!-- LEFT PANE: Skill List -->
            <section class="pane left-pane">
              <div class="pane-header">SKILLS & PERKS</div>
              <ul class="skill-list-interactive">
                <li v-for="skill in displayedSkills" :key="skill.name" 
                    :class="{ active: selectedSkill.name === skill.name }"
                    @mouseenter="selectSkill(skill)"
                    @click="selectSkill(skill)">
                  <div class="skill-row">
                    <span class="skill-name">
                      <span v-if="skill.tag" class="tag-icon">[TAG]</span>
                      {{ skill.name }}
                    </span>
                    <span class="skill-val">{{ skill.value }}</span>
                  </div>
                  <div class="skill-bar-track">
                    <div class="skill-bar-fill" :style="{ width: skill.value + '%' }"></div>
                  </div>
                </li>
              </ul>
              
              <div class="pane-header mt-8">ACTIVE PERKS</div>
              <div class="perks-list">
                <div class="perk-badge" title="Leergierige Student Front-end">★ EAGER LEARNER</div>
                <div class="perk-badge" title="Figma Ontwerper">★ PIXEL PUSHER</div>
                <div class="perk-badge" title="Geduldig bij code bugs">★ ZEN CODER</div>
                <div class="perk-badge" title="[PLACEHOLDER PERK]">★ TEAM PLAYER</div>
              </div>
            </section>

            <!-- RIGHT PANE: Detail View -->
            <section class="pane right-pane">
               <!-- S.P.E.C.I.A.L. Header for Context -->
               <div class="special-stats">
                  <div class="stat-box">
                    <span class="stat-letter">S</span>
                    <span class="stat-val">6</span>
                    <span class="stat-label">STAMINA</span>
                  </div>
                  <div class="stat-box active">
                    <span class="stat-letter">P</span>
                    <span class="stat-val">8</span>
                    <span class="stat-label">PIXELS</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-letter">I</span>
                    <span class="stat-val">7</span>
                    <span class="stat-label">INTEL</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-letter">C</span>
                    <span class="stat-val">8</span>
                    <span class="stat-label">CREATIEF</span>
                  </div>
               </div>

               <!-- Avatar Display -->
               <div class="avatar-display">
                 <img :src="selectedSkill.image" alt="Vault Boy Skill Avatar" class="avatar-img mix-blend-screen image-pixelated" />
               </div>

               <!-- Description Area -->
               <div class="detail-box">
                 <h2 class="detail-title">{{ selectedSkill.name }}</h2>
                 <p class="detail-desc">{{ selectedSkill.description }}</p>
                 
                 <div class="detail-meta">
                   <div class="meta-row">
                     <span class="meta-label">EFFECT:</span>
                     <span class="meta-val">{{ selectedSkill.effect }}</span>
                   </div>
                   <div class="meta-row">
                     <span class="meta-label">REQ:</span>
                     <span class="meta-val">{{ selectedSkill.requirement }}</span>
                   </div>
                 </div>
               </div>

               <!-- Condition Bar -->
               <div class="condition-footer">
                 <span class="cond-label">CND</span>
                 <div class="cond-bar-track">
                   <div class="cond-bar-fill" style="width: 100%"></div>
                 </div>
               </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const activeTab = ref('STATS')

const devSkills = [
  { 
    name: 'FIGMA (UI/UX)', 
    value: 80, 
    tag: true,
    description: 'Een website ontwerpen is geen probleem. Ik kan wirehuidframen en prototypes maken vóór ik in de code duik.',
    effect: '+50% Aesthetics',
    requirement: 'Creatieve Geest',
    image: '/tumblr_nq141xLbmA1riwt83o5_500.webp'
  },
  { 
    name: 'HTML/CSS/JS', 
    value: 75, 
    tag: true,
    description: 'De fundering van het web. Ik heb een redelijk goede en stabiele basiskennis van hoe websites werken.',
    effect: '+30% Structuur',
    requirement: 'Code Editor',
    image: '/tumblr_nq141xLbmA1riwt83o8_500.webp'
  },
  { 
    name: 'TAILWIND CSS', 
    value: 70, 
    tag: false,
    description: 'Utility-first styling framework. Ik bouw redelijk vlot moderne en responsive lay-outs hiermee op.',
    effect: '+20% Dev Speed',
    requirement: 'Utility Classes',
    image: '/tumblr_nq141xLbmA1riwt83o3_500.webp'
  },
  { 
    name: 'NUXT.JS (VUE)', 
    value: 75, 
    tag: true,
    description: 'Mijn go-to framework voor webapplicaties. Ervaring met component-based architecture en Nuxt conventies (zoals dit portfolio).',
    effect: '+50% Vue Power',
    requirement: 'Vue.js / TypeScript',
    image: '/tumblr_nq141xLbmA1riwt83o7_500.webp'
  },
  { 
    name: 'NEXT.JS (REACT)', 
    value: 65, 
    tag: false,
    description: 'Het toonaangevende React framework. Bekend met server-side rendering, routing en dynamische front-ends.',
    effect: '+40% SSR Speed',
    requirement: 'React.js / TypeScript',
    image: '/tumblr_nq141xLbmA1riwt83o2_400.webp'
  }
]

const softSkills = [
  { 
    name: 'PUBLIC SPEAKING', 
    value: 65, 
    tag: false,
    description: 'Ik ben sterk in presenteren en kan mijn technische keuzes en concepten moeiteloos overbrengen aan groepen en klanten.',
    effect: '+40% Charisma',
    requirement: 'Publiek',
    image: '/tumblr_nq141xLbmA1riwt83o2_400.webp'
  },
  { 
    name: 'BLIND TYPEN', 
    value: 90, 
    tag: true,
    description: 'Geen tijd te verliezen tijdens het coderen. Door vloeiend blind te typen zet ik gedachten razendsnel om in code, zonder ooit naar het toetsenbord te hoeven kijken.',
    effect: '+30% Productiviteit',
    requirement: 'Spiergeheugen',
    image: '/tumblr_nq141xLbmA1riwt83o7_500.webp'
  },
  { 
    name: 'POLYGLOT (TALEN)', 
    value: 70, 
    tag: false,
    description: 'Vloeiend in Nederlands en Engels. Daarnaast spreek ik ook een aardig woordje Duits en begrijp ik de basis van Indonesisch. Internationale communicatie is geen probleem.',
    effect: '+20% Lokalisatie',
    requirement: 'Communicatie',
    image: '/tumblr_nq141xLbmA1riwt83o3_500.webp'
  }
]

const displayedSkills = computed(() => activeTab.value === 'STATS' ? devSkills : softSkills)
const selectedSkill = ref(devSkills[0])

watch(activeTab, (newTab) => {
  selectedSkill.value = newTab === 'STATS' ? devSkills[0] : softSkills[0]
})

const selectSkill = (skill) => {
  selectedSkill.value = skill
}
</script>

<style scoped>
/* Layout */
.skills-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  height: 100%;
  padding: 16px;
  overflow: hidden;
}

/* Sub Navigation (Tabs) */
.sub-nav {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
  padding: 0 16px;
  border-bottom: 2px solid var(--hud-line);
}
.sub-nav-item {
  padding: 8px 24px;
  font-weight: 700;
  letter-spacing: 2px;
  background: rgba(0,0,0,0.4);
  color: var(--crt-dim);
  cursor: pointer;
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
}
.sub-nav-item.active {
  background: var(--crt);
  color: black;
  text-shadow: none;
}

/* Left Pane */
.pane {
  display: flex;
  flex-direction: column;
}
.pane-header {
  font-size: 1.2rem;
  font-weight: 700;
  border-bottom: 2px solid var(--crt);
  margin-bottom: 12px;
  letter-spacing: 2px;
}

/* Interactive Skill List */
.skill-list-interactive {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex: 1;
}
.skill-list-interactive li {
  padding: 8px 12px;
  margin-bottom: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}
.skill-list-interactive li:hover, .skill-list-interactive li.active {
  background: rgba(51, 255, 102, 0.15);
  border-color: var(--crt);
  box-shadow: 0 0 12px var(--crt-glow);
}

.skill-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.skill-name { font-weight: 700; letter-spacing: 1px; }
.tag-icon { margin-right: 8px; font-size: 0.8em; }
.skill-bar-track {
  height: 12px;
  background: rgba(0,0,0,0.5);
  border: 1px solid var(--crt-dim);
  padding: 1px;
}
.skill-bar-fill {
  background-color: var(--crt);
  height: 100%;
  /* Blocky progress bar appearance */
  background-image: linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.8) 50%);
  background-size: 4px 100%;
}

/* Perks */
.perks-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.perk-badge {
  border: 2px solid var(--crt-dim);
  padding: 4px 8px;
  font-size: 0.8rem;
  color: var(--crt-dim);
}

/* Right Pane Stats */
.special-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--hud-line);
  padding-bottom: 12px;
}
.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.6;
}
.stat-box.active { opacity: 1; }
.stat-letter { font-size: 1.5rem; font-weight: 700; }
.stat-val { font-size: 1.2rem; }
.stat-label { font-size: 0.6rem; letter-spacing: 1px; }

/* Avatar */
.avatar-display {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 16px;
  border: 2px solid var(--hud-line);
  background: rgba(0,0,0,0.3);
}
.avatar-img {
  height: 100%;
  object-fit: contain;
}

/* Detail Box */
.detail-box {
  background: rgba(51, 255, 102, 0.05);
  padding: 16px;
  border: 2px solid var(--hud-line);
  flex: 1;
}
.detail-title {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--crt-dim);
}
.detail-desc {
  font-size: 1rem;
  line-height: 1.4;
  margin-bottom: 16px;
}
.meta-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 0.9rem;
}
.meta-label { color: var(--crt-dim); }

/* Condition Footer */
.condition-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 12px;
}
.cond-bar-track {
  flex: 1;
  height: 16px;
  border: 2px solid var(--crt);
  padding: 2px;
}
.cond-bar-fill {
  background: var(--crt);
  height: 100%;
}

@media (max-width: 768px) {
  .skills-layout {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
}
</style>
