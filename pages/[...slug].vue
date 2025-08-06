<script setup>
definePageMeta({
  layout: false,
});

useSeoMeta({
  title: "找不到頁面 | 啾啾",
});
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center text-center"
  >
    <img src="assets/images/logo.svg" alt="logo" class="h-28" />
    <h1 class="mb-10 text-[6rem] leading-none">404</h1>
    <p class="mb-4 text-3xl leading-8 tracking-wide">這頁飛走啦~</p>
    <p class="mb-16 text-3xl leading-8 tracking-wide">啾啾找不到你要的內容</p>

    <NuxtLink to="/" class="btn btn-primary px-12">帶我回首頁</NuxtLink>
  </div>
</template>
<style scoped></style>
