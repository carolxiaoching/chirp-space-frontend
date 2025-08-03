<script setup>
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());
</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <ClientOnly>
      <BaseToastMessage />
      <BaseAlertLoginModal />
    </ClientOnly>
  </NuxtLayout>
</template>
