<script setup>
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
