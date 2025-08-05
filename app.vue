<script setup>
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId());

const { isLoading } = useLoading();
</script>

<template>
  <OffcanvasMenu />
  <NuxtLayout>
    <NuxtPage />

    <ClientOnly>
      <BaseToastMessage />
      <BaseAlertLoginModal />
      <Loading
        :active="isLoading"
        :is-full-page="true"
        :height="128"
        :width="128"
        loader="dots"
        color="#D9BAA6"
        background-color="#000"
      />
    </ClientOnly>
  </NuxtLayout>
</template>
