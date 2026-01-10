<template>
  <div class="splash-screen">
    <div class="pipboy-shell">
      <div class="pipboy-bezel">
        <!-- Rivets -->
        <div class="rivet"></div>
        <div class="rivet"></div>
        <div class="rivet"></div>
        <div class="rivet"></div>
        <div class="rivet"></div>
        <div class="rivet"></div>
        
        <div class="crt-screen animated-crt">
          <div class="crt-glare"></div>
          <div class="crt-noise"></div>
          <div class="scanlines"></div>
          
          <!-- Avionics Callsign Header -->
          <div class="hud-header">
            <div class="hud-brackets">
              <div class="bracket-left"></div>
              <div class="hud-callsign">
                <div class="callsign-label">OPERATOR</div>
                <div class="callsign-name">NICO KORNUIJT</div>
                <div class="callsign-tag">CALLSIGN: CODEGOZER</div>
              </div>
              <div class="bracket-right"></div>
            </div>
            <div class="hud-divider"></div>
          </div>

          <!-- Cockpit Side Nav -->
          <aside class="cockpit-nav-left splash-nav">
            <div class="cockpit-nav-item">
              <span class="nav-icon">●</span>
              <span class="nav-label">HOME</span>
            </div>
            <div class="cockpit-nav-item">
              <span class="nav-icon">●</span>
              <span class="nav-label">SKILLS</span>
            </div>
          </aside>

          <aside class="cockpit-nav-right splash-nav">
            <div class="cockpit-nav-item">
              <span class="nav-label">PROJECTS</span>
              <span class="nav-icon">●</span>
            </div>
            <div class="cockpit-nav-item">
              <span class="nav-label">CONTACT</span>
              <span class="nav-icon">●</span>
            </div>
          </aside>

          <!-- Center Content -->
          <div class="splash-content">
            <img src="/vault-boy-clean.png" alt="Pip-Boy" class="splash-logo image-pixelated" />
            <h1 class="splash-title">PORTFOLIO TERMINAL</h1>
            <p class="splash-subtitle">INITIALIZING SYSTEMS<span class="dots"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span></p>
            <NuxtLink to="/quests" class="enter-button">
              <span class="enter-icon">▸</span>
              ENTER SITE
            </NuxtLink>
          </div>

          <!-- Bottom Status Bar -->
          <footer class="status-bar">
            <div class="status-item">
              <span class="status-label">STATUS:</span>
              <span class="status-value status-ok">BUILD CLEAN</span>
            </div>
            <div class="status-item">
              <span class="status-label">LAST DEPLOY:</span>
              <span class="status-value">NOMINAL</span>
            </div>
            <div class="status-item">
              <span class="status-label">CPU TEMP:</span>
              <span class="status-value status-warn">CLASSIFIED</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Home page variant: no emit needed; CTA navigates to Projects
</script>

<style scoped>
.splash-screen {
  position: relative;
  min-height: 100vh;
  background: var(--bg);
}

.splash-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 5;
  gap: 20px;
  padding: 24px;
}

.splash-logo {
  width: clamp(200px, 35vw, 320px);
  height: auto;
  border: 3px solid var(--hud-line);
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 32px var(--crt-glow);
  animation: hud-pulse 3s infinite;
  object-fit: contain;
}

.image-pixelated {
  image-rendering: pixelated;
}

.splash-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: clamp(3px, 0.8vw, 6px);
  margin: 0;
  text-shadow: 0 0 12px var(--crt-glow), 0 0 24px rgba(51, 255, 102, 0.4);
}

.splash-subtitle {
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  letter-spacing: 3px;
  color: var(--crt-dim);
  margin: 0;
  animation: hud-pulse 2s infinite;
}

/* Blinking ellipsis after subtitle */
.dots { display: inline-block; margin-left: 4px; }
.dot {
  display: inline-block;
  opacity: 0;
  animation: dot-blink 1.2s infinite;
}
.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-blink {
  0%, 20% { opacity: 0; }
  30%, 60% { opacity: 1; }
  70%, 100% { opacity: 0; }
}

.enter-button {
  margin-top: 24px;
  padding: 14px 32px;
  font-family: 'VT323', 'Courier New', Consolas, monospace;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--crt);
  background: rgba(0, 0, 0, 0.3);
  border: 3px solid var(--hud-line);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.enter-button:hover {
  background: rgba(51, 255, 102, 0.12);
  box-shadow: 0 0 24px var(--crt-glow);
  transform: scale(1.05);
  animation: hud-pulse 1s infinite;
}

.enter-icon {
  font-size: 0.8em;
  display: inline-block;
  transition: transform 0.3s ease;
}

.enter-button:hover .enter-icon {
  transform: translateX(4px);
}

/* Hide side nav on small screens */
.splash-nav {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 900px) {
  .splash-nav {
    display: none;
  }
}
</style>
