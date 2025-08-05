import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref(null);
  const authToken = useCookie("auth");

  const isSignedIn = computed(() => authToken.value != null);

  function setAuth(data) {
    userInfo.value = {
      ...userInfo.value,
      ...data,
    };
  }

  function clearAuth() {
    userInfo.value = null;
    authToken.value = null;
  }

  // 監聽 token，若 token 不存在則清除帳號資料
  watch(
    () => authToken.value,
    (newVal) => {
      if (!newVal) {
        clearAuth();
      }
    },
  );

  return {
    authToken,
    userInfo,
    isSignedIn,
    setAuth,
    clearAuth,
  };
});
