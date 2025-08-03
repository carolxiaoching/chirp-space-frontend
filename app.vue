<script setup>
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());
</script>

<template>
  <OffcanvasMenu />
  <NuxtLayout>
    <NuxtPage />

    <ClientOnly>
      <BaseToastMessage />
      <BaseAlertLoginModal />
    </ClientOnly>
  </NuxtLayout>
</template>
