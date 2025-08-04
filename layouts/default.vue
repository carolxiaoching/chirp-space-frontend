<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

// 判斷是否在登入、註冊頁
const isAccountPage = computed(() =>
  ["account-signin", "account-signup"].includes(route.name || ""),
);
</script>

<template>
  <div class="relative">
    <AppHeader />
    <main
      class="main container mx-auto mt-[65px] flex py-12"
      :class="{
        'items-center justify-center': isAccountPage,
      }"
    >
      <template v-if="isAccountPage">
        <slot />
      </template>
      <template v-else>
        <div class="flex-1 xl:me-8">
          <slot />
        </div>
        <AsideMenu />
      </template>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.main {
  min-height: calc(100vh - 65px - 64px);
}
</style>
