<script setup>
import { useRoute } from "vue-router";
import { authAPI } from "@/apis/auth";

const route = useRoute();

const authStore = useAuthStore();
const { authToken, userInfo } = storeToRefs(authStore);
const { setAuth, clearAuth } = authStore;

const { pushToast } = useToastStore();
const { apiGetMyProfile } = authAPI();

// 判斷是否在登入、註冊頁
const isAccountPage = computed(() =>
  ["account-signin", "account-signup"].includes(route.name || ""),
);

onMounted(async () => {
  // 確認登入狀態：若 cookie 中沒有 token 不進行驗證
  if (!authToken.value) {
    return;
  }

  // 確認登入狀態：若 cookie 中有 token，但 pinia store 中 userInfo 沒資料
  if (!userInfo.value) {
    try {
      const data = await apiGetMyProfile();

      setAuth(data.data);
    } catch {
      pushToast({
        message: "登入已失效，請重新登入",
        status: "danger",
      });

      clearAuth();
    }
  }
});
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
