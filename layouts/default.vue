<script setup></script>

<template>
  <div class="">
    <AppHeader />
    <main class="main container mx-auto mt-[65px] py-12">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.main {
  min-height: calc(100vh - 65px - 64px);
}
</style>
