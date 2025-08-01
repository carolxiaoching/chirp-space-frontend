<script setup>
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());
</script>

<template>
  <div>
    <ClientOnly>
      <BaseToastMessage />
    </ClientOnly>
  </div>
</template>
