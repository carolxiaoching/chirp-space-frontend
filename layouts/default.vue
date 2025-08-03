<script setup></script>

<template>
  <div class="relative">
    <AppHeader />
    <main class="main container mx-auto mt-[65px] flex py-12">
      <div class="flex-1 xl:me-8">
        <slot />
      </div>
      <AsideMenu />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.main {
  min-height: calc(100vh - 65px - 64px);
}
</style>
