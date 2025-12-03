<template>
  <!-- Professional layout wrapped in CRT frame for all internal pages -->
  <div class="site-wrapper">
    <div class="pipboy-shell">
      <div class="pipboy-bezel">
        <!-- Rivets for consistent look -->
        <div class="rivet"></div>
        <div class="rivet"></div>
        <div class="rivet"></div>
        <div class="rivet"></div>
        <div class="rivet"></div>
        <div class="rivet"></div>

        <div class="crt-screen animated-crt pro-crt">
          <div class="crt-glare"></div>
          <div class="crt-noise"></div>
          <div class="scanlines"></div>

          <div class="screen-content">
            <!-- Conventional header -->
            <SiteHeader />

            <!-- Main content area -->
            <main class="main-content">
              <div class="site-container">
                <slot />
              </div>
            </main>

            <!-- Conventional footer -->
            <SiteFooter />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Clean professional layout for "boring" pages
</script>
