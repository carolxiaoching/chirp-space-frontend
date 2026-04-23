import { defineStore } from "pinia";
import { authAPI } from "@/apis/auth";
import { useLoading } from "@/composables/useLoading";
import { useModal } from "@/composables/useModal";

export const useAuthStore = defineStore("auth", () => {
  const { pushToast } = useToastStore();
  const { openLoading, closeLoading } = useLoading();
  const { openModal } = useModal();

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

  async function logout() {
    clearAuth();
    await navigateTo("/");
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

  // 追蹤/取消追蹤
  async function updateFollow({ actionType, memberId }) {
    if (!userInfo?.value) {
      openModal("login");
      return null;
    }

    if (!actionType || !memberId) {
      pushToast({
        message: "哎呀~ 資料錯誤",
        status: "danger",
      });
      return null;
    }

    openLoading();

    const apiMethod =
      actionType === "follow"
        ? authAPI().apiFollowUser
        : authAPI().apiUnfollowUser;

    try {
      const { data } = await apiMethod(memberId);

      if (actionType === "follow") {
        if (!Array.isArray(userInfo.value.following)) {
          userInfo.value.following = [];
        }
        userInfo.value.following.push({
          user: memberId,
          createdAt: new Date().toISOString(),
        });
        userInfo.value.followingCount++;
      } else {
        const index = userInfo.value.following.findIndex(
          (item) => item.user === memberId,
        );
        if (index !== -1) {
          userInfo.value.following.splice(index, 1);
          userInfo.value.followingCount--;
        }
      }

      pushToast({
        message:
          data.message ||
          `${actionType === "follow" ? "追蹤" : "取消追蹤"}成功`,
        status: "success",
      });

      return data;
    } catch (err) {
      pushToast({
        message:
          err.response?._data?.message ||
          `${actionType === "follow" ? "追蹤" : "取消追蹤"}失敗`,
        status: "danger",
      });
      return null;
    } finally {
      closeLoading();
    }
  }

  return {
    authToken,
    userInfo,
    isSignedIn,
    setAuth,
    clearAuth,
    logout,
    updateFollow,
  };
});
