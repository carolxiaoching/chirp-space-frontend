export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const { isSignedIn } = storeToRefs(authStore);

  // 確認登入狀態：若未登入則跳轉至登入頁面
  if (!isSignedIn.value) {
    return navigateTo("/account/signin");
  }
});
