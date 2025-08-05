import { defineStore } from "pinia";
import { postAPI } from "@/apis/post";
import { useLoading } from "@/composables/useLoading";
import { useModal } from "@/composables/useModal";

export const usePostStore = defineStore("post", () => {
  const { pushToast } = useToastStore();
  const authStore = useAuthStore();
  const { userInfo } = storeToRefs(authStore);
  const { openLoading, closeLoading } = useLoading();
  const { apiLikePost, apiUnlikePost, apiDeletePost } = postAPI();
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

  // 刪除貼文
  async function deletePost(postId) {
    if (!postId) {
      pushToast({
        message: "哎呀~ 資料錯誤",
        status: "danger",
      });
      return null;
    }

    openLoading();

    try {
      const { data } = await apiDeletePost(postId);

      pushToast({
        message: data?.message || "已刪除貼文",
        status: "success",
      });
      return postId;
    } catch (err) {
      pushToast({
        message: err.response?._data?.message || "刪除貼文失敗",
        status: "danger",
      });
      return null;
    } finally {
      closeLoading();
    }
  }

  return {
    updateLike,
    deletePost,
  };
});
