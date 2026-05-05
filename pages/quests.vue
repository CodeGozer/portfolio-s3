<template>
  <ProfessionalLayout>
    <section class="quests-layout">
      <div class="content-row">
        <!-- VUE REF FOR LIST ITEMS -->
        <aside class="quest-list">
          <div
            v-for="(quest, i) in quests"
            :key="i"
            :ref="el => { if(el) questItemsRef[i] = el }"
            :class="['quest-item', {active: i === selected}]"
            @click="selected = i"
          >
            {{ quest.title }}
          </div>
        </aside>
        
        <!-- VUE REF FOR CONTENT -->
        <main class="quest-details" v-if="activeQuest" ref="questContentRef">
          <h2>{{ activeQuest.title }}</h2>

          <!-- MAIN QUEST ANIMATION / CAROUSEL -->
          <div v-if="gallerySection && gallerySection.images.length" class="quest-hero-carousel">
            <figure>
              <div class="hero-image-wrapper">
                <!-- Navigation Buttons -->
                <button class="carousel-btn prev-btn" @click.stop="prevImage">&lt;</button>
                
                <!-- Image Display -->
                <div class="carousel-img-container" @click="showLightbox = true" title="Klik om uit te vergroten" ref="carouselImgRef">
                  <img v-if="currentImage" :src="currentImage.src" :alt="currentImage.alt" />
                </div>

                <button class="carousel-btn next-btn" @click.stop="nextImage">&gt;</button>
              </div>
              <figcaption v-if="currentImage">
                <span class="step-counter">[{{ currentIndex + 1 }}/{{ gallerySection.images.length }}]</span>
                <span ref="captionRef">{{ currentImage.caption }}</span>
                <span class="view-hint">(Klik op afbeelding om te vergroten)</span>
              </figcaption>
            </figure>
          </div>

          <p class="quest-desc" style="clear: both; margin-top: 24px;">{{ activeQuest.description }}</p>

          <div v-for="(section, j) in textSections" :key="j" class="quest-section">
            <h3>{{ section.title }}</h3>
            <template v-if="section.type === 'text'">
              <p>{{ section.content }}</p>
            </template>
            <template v-else-if="section.type === 'list'">
              <ul>
                <li v-for="(item, k) in section.content" :key="k">{{ item }}</li>
              </ul>
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

    <!-- LIGHTBOX OVERLAY -->
    <Teleport to="body">
      <div v-if="showLightbox && currentImage" class="lightbox-overlay" @click="showLightbox = false">
        <div class="lightbox-content" @click.stop>
          <button class="lightbox-close" @click="showLightbox = false">[X] CLOSE</button>
          
          <img :src="currentImage.src" :alt="currentImage.alt" class="lightbox-img" />
          
          <div class="lightbox-caption">
            <span class="step-counter">[{{ currentIndex + 1 }}/{{ gallerySection.images.length }}]</span>
            {{ currentImage.caption }}
          </div>
          
          <button class="lightbox-btn lb-prev" @click.stop="prevImage">&lt; PREV</button>
          <button class="lightbox-btn lb-next" @click.stop="nextImage">NEXT &gt;</button>
        </div>
      </div>
    </Teleport>
  </ProfessionalLayout>
</template>

<script setup>
import ProfessionalLayout from '~/components/ProfessionalLayout.vue'
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import questsData from '@/projects.json'
import gsap from 'gsap'

const quests = questsData.projects
const selected = ref(0)
const tick = ref(0)
const showLightbox = ref(false)
const manualOverride = ref(false)
let timer = null

// REFS FOR GSAP
const questItemsRef = ref([])
const questContentRef = ref(null)
const carouselImgRef = ref(null)
const captionRef = ref(null)

const activeQuest = computed(() => quests[selected.value])

const gallerySection = computed(() => 
  activeQuest.value?.sections?.find(s => s.type === 'gallery')
)

const textSections = computed(() => 
  activeQuest.value?.sections?.filter(s => s.type !== 'gallery')
)

const currentIndex = computed(() => {
  if (!gallerySection.value || gallerySection.value.images.length === 0) return 0
  const len = gallerySection.value.images.length
  return ((tick.value % len) + len) % len
})

const currentImage = computed(() => {
  if (!gallerySection.value || gallerySection.value.images.length === 0) return null
  return gallerySection.value.images[currentIndex.value]
})

const prevImage = () => {
  manualOverride.value = true
  tick.value--
}

const nextImage = () => {
  manualOverride.value = true
  tick.value++
}

const runIntroSequence = () => {
  // Retro staggered boot sequence for the quest items
  // Using steps ease to make it feel like an old slow processor
  gsap.fromTo(questItemsRef.value, 
    { opacity: 0, x: -10 },
    { opacity: 1, x: 0, duration: 0.15, stagger: 0.1, ease: 'steps(2)', clearProps: 'all' }
  )
}

const triggerGlitchTransition = () => {
  if (!questContentRef.value) return;
  // A fast, mechanical flicker for the whole content panel mimicking screen refresh
  gsap.fromTo(questContentRef.value,
    { opacity: 0, filter: 'brightness(1.5) contrast(1.5)' },
    { opacity: 1, filter: 'brightness(1) contrast(1)', duration: 0.2, ease: 'steps(3)', clearProps: 'filter' }
  )
}

const triggerCarouselFlicker = () => {
  if (carouselImgRef.value) {
    // When picture changes, snap it vertically like a CRT refresh line
    gsap.fromTo(carouselImgRef.value,
      { opacity: 0.6, scaleY: 0.95 },
      { opacity: 1, scaleY: 1, duration: 0.15, ease: 'steps(2)', clearProps: 'transform' }
    )
  }
}

// Watchers for GSAP animations
watch(selected, async () => {
  tick.value = 0
  showLightbox.value = false
  manualOverride.value = false
  await nextTick()
  triggerGlitchTransition()
})

watch(tick, async () => {
  await nextTick()
  triggerCarouselFlicker()
})

onMounted(() => {
  runIntroSequence()
  
  timer = setInterval(() => {
    if (!showLightbox.value && !manualOverride.value) {
      tick.value++
    }
  }, 2500)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* Projects/Quests Tab - Radar Target Styling */
.quests-layout{display:flex;flex-direction:column;height:100%;padding:18px;position:relative;background:transparent;}
.quests-layout .content-row{display:flex;flex:1;align-items:stretch;gap:0;padding:0;}

/* Target List (Radar Contacts) */
.quest-list{
  width:340px;
  background:linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5));
  border-right:3px solid var(--hud-line);
  padding:24px 0;
  display:flex;flex-direction:column;gap:3px;
  overflow-y:auto;
  box-shadow:inset -8px 0 16px rgba(0,0,0,0.6);
}

.quest-item{
  padding:16px 24px;
  font-size:1.15em;letter-spacing:3px;font-weight:600;
  cursor:pointer;
  border-left:4px solid transparent;
  background:rgba(0,0,0,0.2);
  transition:all 0.3s ease;
  position:relative;
  text-transform:uppercase;
}
.quest-item::before{
  content:'▸';margin-right:12px;color:var(--crt-dim);
  transition:color 0.3s ease;
}
.quest-item:hover{
  background:rgba(51, 255, 102, 0.06);
  border-left-color:var(--crt);
  animation:hud-pulse 2s infinite;
}
.quest-item:hover::before{color:var(--crt)}
.quest-item.active{
  background:rgba(51, 255, 102, 0.12);
  border-left:4px solid var(--crt);
  color:var(--crt);
  font-weight:700;
  box-shadow:inset 0 0 20px var(--crt-glow);
}
.quest-item.active::before{color:var(--crt)}

/* Target Details Panel */
.quest-details{
  flex:1;padding:32px 48px;overflow-y:auto;
  background:linear-gradient(90deg, rgba(0,0,0,0.2), transparent 20%);
}
.quest-desc{margin-bottom:24px;font-size:1.1em;line-height:1.7;color:var(--crt)}
.quest-section{margin-bottom:32px}
.quest-section h3{
  margin:0 0 12px 0;font-size:1.2em;letter-spacing:3px;
  color:var(--crt);font-weight:700;text-transform:uppercase;
  border-bottom:2px solid var(--hud-line);padding-bottom:6px;
}
.quest-section ul{margin:0 0 12px 0;padding-left:28px;line-height:1.8}
.quest-section ul li{color:var(--crt)}

/* Documentation Links */
.docs{display:flex;flex-wrap:wrap;gap:18px;margin-top:12px}
.docs a{
  color:var(--crt);text-decoration:none;font-size:1em;
  padding:8px 16px;border:2px solid var(--hud-line);
  background:rgba(0,0,0,0.3);letter-spacing:2px;
  transition:all 0.3s ease;text-transform:uppercase;font-weight:600;
}
.docs a:hover{
  border-color:var(--crt);
  background:rgba(51, 255, 102, 0.1);
  box-shadow:0 0 16px var(--crt-glow);
}
.quest-hero-carousel {
  width: 100%;
  margin: 16px 0 32px 0;
  border-radius: 4px;
}

.quest-hero-carousel figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.4);
  border: 3px solid var(--hud-line);
  padding: 12px;
  box-shadow: 0 0 16px rgba(51, 255, 102, 0.15);
}

.hero-image-wrapper {
  width: 100%;
  height: 280px; /* FIXED SIZE - No layout jumping! */
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 20, 10, 0.8);
  border: 1px solid rgba(51, 255, 102, 0.3);
}

/* CAROUSEL BUTTONS */
.carousel-btn {
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid var(--crt-dim);
  color: var(--crt);
  font-size: 1.5em;
  padding: 4px 12px;
  cursor: pointer;
  z-index: 10;
  font-family: 'VT323', monospace;
  font-weight: 700;
  transition: all 0.2s;
  height: 60px;
}
.carousel-btn:hover {
  background: var(--crt);
  color: black;
  box-shadow: 0 0 12px var(--crt-glow);
}
.prev-btn { border-left: none; }
.next-btn { border-right: none; }

/* IMAGE & FILTER */
.carousel-img-container {
  flex: 1;
  height: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.carousel-img-container img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  transition: transform 0.3s ease;
  animation: hud-pulse 3s infinite;
}

/* On hover: brighten image to show interactivity */
.carousel-img-container:hover img {
  transform: scale(1.02);
}

.quest-hero-carousel figcaption {
  margin-top: 12px;
  font-size: 0.95em;
  color: var(--crt-dim);
  letter-spacing: 1px;
  text-align: center;
}

.step-counter {
  color: var(--crt);
  font-weight: 700;
  margin-right: 8px;
}
.view-hint {
  display: block;
  font-size: 0.8em;
  opacity: 0.6;
  margin-top: 4px;
}

/* LIGHTBOX STYLES */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483647; 
  background: rgba(0, 20, 10, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.lightbox-content {
  position: relative;
  width: 90vw;
  max-width: 1000px;
  max-height: 90vh;
  background: #050a05;
  border: 4px solid var(--hud-line);
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 60px rgba(51, 255, 102, 0.3);
}
.lightbox-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  color: var(--crt);
  border: 2px solid var(--crt);
  padding: 4px 12px;
  font-weight: 700;
  cursor: pointer;
}
.lightbox-close:hover {
  background: var(--crt);
  color: black;
}
.lightbox-img {
  max-width: 100%;
  max-height: calc(80vh - 100px);
  object-fit: contain;
  border: 2px solid var(--hud-line);
}
.lightbox-caption {
  margin-top: 24px;
  color: var(--crt);
  font-size: 1.1em;
  text-align: center;
}
.lightbox-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.8);
  border: 2px solid var(--crt);
  color: var(--crt);
  padding: 12px;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 700;
}
.lightbox-btn:hover {
  background: var(--crt);
  color: black;
}
.lb-prev { left: 12px; }
.lb-next { right: 12px; }

@media (min-width: 1024px) {
  .hero-image-wrapper { height: 380px; }
}
</style>
