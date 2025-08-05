import { defineStore } from "pinia";
import { postAPI } from "@/apis/post";
import { useLoading } from "@/composables/useLoading";
import { useModal } from "@/composables/useModal";

export const usePostStore = defineStore("post", () => {
  const { pushToast } = useToastStore();
  const authStore = useAuthStore();
  const { userInfo } = storeToRefs(authStore);
  const { openLoading, closeLoading } = useLoading();
  const { apiLikePost, apiUnlikePost } = postAPI();
  const { openModal } = useModal();

  // 按讚貼文/取消按讚貼文
  async function updateLike({ actionType, postId }) {
    if (!userInfo?.value) {
      openModal("login");
      return null;
    }

    if (!actionType || !postId) {
      pushToast({
        message: "哎呀~ 資料錯誤",
        status: "danger",
      });
      return null;
    }

    openLoading();

    const apiMethod = actionType === "like" ? apiLikePost : apiUnlikePost;

    try {
      const { data } = await apiMethod(postId);
      return data;
    } catch (err) {
      pushToast({
        message:
          err.response?._data?.message ||
          `${actionType === "like" ? "按讚" : "取消按讚"}失敗`,
        status: "danger",
      });
      return {
        status: "error",
        message:
          err.response?._data?.message ||
          `${actionType === "like" ? "按讚" : "取消按讚"}失敗`,
      };
    } finally {
      closeLoading();
    }
  }

  return {
    updateLike,
  };
});
