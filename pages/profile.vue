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
                    @click="selectedContact = contact"
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
                <p>> LOCATION: <span class="text-dim">Robert Kochstraat 15, 5751 MB Deurne, NL</span></p>
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
    link: 'https://linkedin.com/', // Vul hier later je echte URL in
    image: '/IMG_1439.png'
  }
]

const selectedContact = ref(contactMethods[0])
</script>


