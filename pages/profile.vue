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



          <!-- Main Two-Pane Content -->
          <main class="contact-layout">
            
            <!-- LEFT PANE: Contact List -->
            <section class="pane left-pane">
              <div class="pane-header">COMMUNICATION UPLINK</div>
              <ul class="contact-list-interactive">
                <li v-for="contact in contactMethods" :key="contact.type" 
                    :class="{ active: selectedContact.type === contact.type }"
                    @click="handleContactClick(contact)"
                    @mouseenter="selectedContact = contact">
                  <div class="contact-row">
                    <span class="contact-name">
                      <span class="square-icon">■</span>
                      {{ contact.type }}
                    </span>
                    <span class="contact-val">{{ contact.status }}</span>
                  </div>
                </li>
              </ul>
              
              <!-- System Logs -->
              <div class="pane-header mt-8">SYSTEM STATUS</div>
              <div class="system-logs">
                <p>> BESCHIKBAARHEID: <span class="text-green">OPEN</span></p>
                <p>> SIGNAL STRENGTH: <span class="text-green">STRONG</span></p>
                <p>> LOCATION: <span class="text-dim">Deurne, NL</span></p>
                <p>> STATUS: <span class="text-green">Open for work</span></p>
              </div>
            </section>

            <!-- RIGHT PANE: Detail View -->  
            <section class="pane right-pane">
               <!-- Header -->
               <div class="right-header">
                  <div class="header-title">CONNECTION DETAILS</div>
               </div>

               <!-- Display Image / Map Grid -->
               <div class="map-display">
                 <div class="map-grid-overlay"></div>
                 <img :src="selectedContact.image" alt="Contact Visual" class="map-img" />
               </div>

               <!-- Description Area -->
               <div class="detail-box">
                 <h2 class="detail-title">{{ selectedContact.value }}</h2>
                 <p class="detail-desc">{{ selectedContact.description }}</p>
                 
                 <div class="action-row">
                   <a :href="selectedContact.link" target="_blank" class="action-btn">
                     {{ selectedContact.actionText }}
                   </a>
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
import { ref } from 'vue'

const contactMethods = [
  { 
    type: 'EMAIL', 
    value: 'Nicokornuijt2003@gmail.com',
    status: 'OPEN',
    description: 'Directe verbinding via e-mail. Ideaal voor zakelijke voorstellen, technische vragen en samenwerkingen.',
    actionText: 'Stuur een E-mail',
    link: 'mailto:NICOKORNUIJT2003@gmail.COM',
    image: '/IMG_1439.png'
  },
  { 
    type: 'GITHUB', 
    value: 'github.com/CodeGozer',
    status: 'ACTIVE',
    description: 'Toegang tot mijn broncode archief. Hier vind je al mijn publieke repositories en open-source bijdragen.',
    actionText: 'Bekijk op GitHub',
    link: 'https://github.com/CodeGozer',
    image: '/IMG_1439.png'
  },
  { 
    type: 'LINKEDIN', 
    value: 'LinkedIn Netwerk',
    status: 'CONNECTED',
    description: 'Professioneel netwerk uplink. Klik door naar LinkedIn om te connecten of om mijn digitale werkverleden te scannen.',
    actionText: 'Bekijk LinkedIn profiel',
    link: 'https://www.linkedin.com/in/nico-kornuijt-681403220/',
    image: '/IMG_1439.png'
  }
]

const handleContactClick = (contact) => {
  selectedContact.value = contact
  window.open(contact.link, contact.type === 'EMAIL' ? '_self' : '_blank')
}

const selectedContact = ref(contactMethods[0])
</script>

<style scoped>
.contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; flex: 1; min-height: 0; padding: 16px; overflow: hidden; }
.pane { display: flex; flex-direction: column; }
.pane-header { font-size: 1.2rem; font-weight: 700; border-bottom: 2px solid var(--crt); margin-bottom: 12px; letter-spacing: 2px; }
.contact-list-interactive { list-style: none; padding: 0; margin: 0; flex: 1; overflow-y: auto; }
.contact-list-interactive li { padding: 12px; margin-bottom: 8px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; background: rgba(0,0,0,0.3); }
.contact-list-interactive li:hover, .contact-list-interactive li.active { background: rgba(51, 255, 102, 0.15); border-color: var(--crt); box-shadow: 0 0 12px var(--crt-glow); }
.contact-row { display: flex; justify-content: space-between; align-items: center; }
.contact-name { font-weight: 700; letter-spacing: 1px; }
.square-icon { margin-right: 8px; font-size: 0.8em; }
.contact-val { color: var(--crt-dim); font-size: 0.9em; }
.system-logs p { margin: 4px 0; font-family: 'Courier New', monospace; letter-spacing: 1px; }
.text-green { color: var(--crt); font-weight: bold; }
.text-dim { color: var(--crt-dim); }
.right-header { border-bottom: 2px solid var(--hud-line); padding-bottom: 8px; margin-bottom: 16px; font-weight: 700; letter-spacing: 2px; }
.map-display { position: relative; height: 220px; background: rgba(0,20,10,0.9); border: 2px solid var(--hud-line); margin-bottom: 16px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.map-grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(51,255,102,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(51,255,102,0.15) 1px, transparent 1px); background-size: 20px 20px; pointer-events: none; }
.map-img { height: 90%; object-fit: contain; filter: drop-shadow(0 0 8px rgba(51, 255, 102, 0.4)); border-radius: 4px; }
.detail-box { background: rgba(51, 255, 102, 0.05); padding: 16px; border: 2px solid var(--hud-line); flex: 1; display:flex; flex-direction: column; }
.detail-title { margin: 0 0 8px 0; font-size: 1.4rem; border-bottom: 1px solid var(--crt-dim); padding-bottom: 4px; word-break: break-all; }
.detail-desc { font-size: 1rem; line-height: 1.4; margin-bottom: auto; }
.action-row { margin-top: 24px; text-align: right; }
.action-btn { display: inline-block; padding: 12px 24px; background: rgba(0,0,0,0.5); border: 2px solid var(--crt); color: var(--crt); text-decoration: none; font-weight: 700; letter-spacing: 2px; transition: all 0.2s; }
.action-btn:hover { background: var(--crt); color: #000; box-shadow: 0 0 16px var(--crt-glow); }

@media (max-width: 768px) {
  :deep(.pipboy-shell) { align-items: stretch; }
  :deep(.crt-screen.pro-crt) { overflow-y: auto; }
  :deep(.screen-content) { min-height: max-content; }
  .contact-layout { grid-template-columns: 1fr; gap: 14px; flex: initial; min-height: auto; padding: 8px 2px 80px; overflow: visible; align-content: start; }
  .pane { min-height: auto; flex: initial; }
  .pane-header { font-size: 1rem; letter-spacing: 1px; }
  .contact-list-interactive { flex: initial; overflow: visible; }
  .contact-list-interactive li { padding: 10px; }
  .contact-row { align-items: flex-start; gap: 8px; }
  .contact-val { flex-shrink: 0; }
  .map-display { display: none; }
  .right-pane { padding-bottom: 20px; }
  .detail-box { flex: initial; min-height: 220px; }
  .detail-title { font-size: 1.15rem; word-break: break-word; }
  .action-row { text-align: left; }
  .action-btn { width: 100%; text-align: center; padding: 10px 12px; letter-spacing: 1px; }
}
</style>
