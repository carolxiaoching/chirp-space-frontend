export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const { isSignedIn } = storeToRefs(authStore);

  // 確認登入狀態：若已登入則跳轉至首頁
  if (isSignedIn.value) {
    return navigateTo("/");
  }
});
