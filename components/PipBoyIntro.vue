<template>
  <!-- TODO: Temporary inline styles to bypass visibility bug. Move to CSS once root cause is found. -->
  <div v-if="visible" class="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden font-vt323" :class="{ 'crt-turn-off': isClosing }"
       style="position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: black !important; z-index: 2147483647 !important; display: flex !important;">
    <!-- Main CRT container -->
    <div class="absolute inset-0 bg-black flex flex-col items-center justify-center text-[#33ff66] p-8">
        
        <!-- STAGE 1: STATIC BURST -->
        <div v-if="introStage === 'static'" class="absolute inset-0 z-10 bg-white opacity-10 animate-noise"></div>
        <div v-if="introStage === 'static'" class="w-full h-2 bg-[#33ff66] absolute top-0 opacity-80 animate-scanline-sweep"></div>
        
        <!-- STAGE 2: DIAGNOSTICS -->
        <div v-if="introStage === 'diagnostics'" class="w-full max-w-2xl h-full flex flex-col justify-end pb-24 text-2xl uppercase tracking-widest leading-relaxed">
            <div v-for="(line, index) in diagnosticLines" :key="index" class="typewriter-line">
                > {{ line }}
            </div>
            <div class="animate-pulse mt-4">_</div>
        </div>

        <!-- STAGE 3 & 4: GLITCH & MASCOT -->
        <!-- Glitch Effect Wrapper -->
        <div v-if="introStage === 'glitch' || introStage === 'mascot'" class="relative flex flex-col items-center" :class="{ 'glitch-effect': introStage === 'glitch' }">
             <!-- Mascot Image -->
            <img v-show="introStage === 'mascot'" src="/vault-boy-clean.png" alt="Pip-Boy" class="w-64 h-64 md:w-96 md:h-96 object-contain image-pixelated mb-8 animate-pop-in" />
            
            <!-- Text UI -->
            <div v-if="introStage === 'mascot'" class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold animate-pulse">PIP-BOY 3000</h1>
                <h2 class="text-xl md:text-2xl mt-2">MARK IV</h2>
            </div>
        </div>

    </div>

    <!-- Always On Overlay Effects -->
    <div class="pointer-events-none absolute inset-0 z-40 scanlines"></div>
    <div class="pointer-events-none absolute inset-0 z-50 vignette"></div>
    <div class="pointer-events-none absolute inset-0 z-50 crt-flicker"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const emit = defineEmits(['finish'])

// State
const visible = ref(true)
const isClosing = ref(false)
const introStage = ref<'off' | 'static' | 'diagnostics' | 'glitch' | 'mascot'>('off')
const diagnosticLines = ref<string[]>([])

// Full Diagnostic Script
const fullDiagnostics = [
    'INITIALIZING...',
    'CHECKING SYSTEM RAM... 64KB OK',
    'LOADING HOLOTAPE DRIVERS...',
    'CALIBRATING BIOMETRIC SENSORS...',
    'ESTABLISHING LINK...'
]

onMounted(() => {
    console.log('PipBoyIntro mounted')
    runBootSequence()
})

const runBootSequence = async () => {
    // 0. Power On (Warmup) - 500ms
    await sleep(500)
    
    // 1. Static Burst - 1000ms
    introStage.value = 'static'
    await nextTick()
    await sleep(1000)
    
    // 2. Diagnostics - Typewriter effect
    introStage.value = 'diagnostics'
    await nextTick()
    for (const line of fullDiagnostics) {
        diagnosticLines.value.push(line)
        await nextTick()
        await sleep(400) 
    }

    await sleep(500) // Pause after text

    // 3. The Glitch - 300ms
    introStage.value = 'glitch'
    await nextTick()
    await sleep(300)

    // 4. The Mascot - 2000ms
    introStage.value = 'mascot'
    await nextTick()
    await sleep(2500)

    // 5. Turn Off / Transition
    startExitSequence()
}

const startExitSequence = () => {
  isClosing.value = true
  sleep(700).then(() => {
    console.log('[PipBoyIntro] Emitting finish')
    visible.value = false
    emit('finish')
  })
}

const sleep = (ms: number) => {
    const start = Date.now()
    console.log(`[PipBoyIntro] Sleep start ${ms}ms at`, start)
    return new Promise(resolve => {
        const check = () => {
            const now = Date.now()
            if (now - start >= ms) {
                console.log(`[PipBoyIntro] Sleep done ${ms}ms at`, now, 'diff:', now - start)
                resolve(true)
            } else {
                requestAnimationFrame(check)
            }
        }
        requestAnimationFrame(check)
    })
}
</script>

<style scoped>
/* Image Rendering */
.image-pixelated {
    image-rendering: pixelated;
}

/* Animations */
@keyframes scanline-sweep {
    0% { top: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
}
.animate-scanline-sweep {
    animation: scanline-sweep 1s linear forwards;
}

@keyframes noise {
    0% { transform: translate(0,0); }
    10% { transform: translate(-5%,-5%); }
    20% { transform: translate(-10%,5%); }
    30% { transform: translate(5%,-10%); }
    40% { transform: translate(-5%,15%); }
    50% { transform: translate(-10%,5%); }
    60% { transform: translate(15%,0); }
    70% { transform: translate(0,10%); }
    80% { transform: translate(-15%,0); }
    90% { transform: translate(10%,5%); }
    100% { transform: translate(5%,0); }
}
.animate-noise {
    animation: noise 0.2s steps(8) infinite;
}

/* Glitch Effect */
.glitch-effect {
    animation: glitch-anim 0.3s infinite;
}
@keyframes glitch-anim {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); filter: invert(1); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes pop-in {
    0% { transform: scale(0); opacity: 0; }
    70% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}
.animate-pop-in {
    animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* CRT Effects (Preserved/Enhanced) */
.scanlines {
  background: linear-gradient(
    to bottom,
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
}

.vignette {
  background: radial-gradient(
    circle,
    rgba(18, 16, 16, 0) 60%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.crt-flicker {
  background: rgba(18, 16, 16, 0.1);
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% { opacity: 0.1; }
  50% { opacity: 0.2; }
  100% { opacity: 0.1; }
}

.crt-turn-off {
  animation: turn-off 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes turn-off {
  0% {
    transform: scale(1, 1.3) translate3d(0, 0, 0);
    filter: brightness(1);
    opacity: 1;
  }
  60% {
    transform: scale(1.3, 0.001) translate3d(0, 0, 0);
    filter: brightness(10);
  }
  100% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: scale(0, 0.0001) translate3d(0, 0, 0);
    filter: brightness(0);
    opacity: 0;
  }
}
</style>
