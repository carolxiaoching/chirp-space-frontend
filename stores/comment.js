import { defineStore } from "pinia";
import { commentAPI } from "@/apis/comment";
import { useLoading } from "@/composables/useLoading";
import { useModal } from "@/composables/useModal";

export const useCommentStore = defineStore("comment", () => {
  const { pushToast } = useToastStore();
  const authStore = useAuthStore();
  const { userInfo } = storeToRefs(authStore);
  const { openLoading, closeLoading } = useLoading();
  const { apiDeleteComment } = commentAPI();
  const { openModal } = useModal();

  // 刪除評論
  async function deleteComment(commentId) {
    if (!userInfo?.value) {
      openModal("login");
      return null;
    }

    if (!commentId) {
      pushToast({
        message: "哎呀~ 資料錯誤",
        status: "danger",
      });
      return null;
    }

    openLoading();

    try {
      const { data } = await apiDeleteComment(commentId);

      pushToast({
        message: data?.message || "已刪除評論",
        status: "success",
      });
      return commentId;
    } catch (err) {
      pushToast({
        message: err.response?._data?.message || "刪除評論失敗",
        status: "danger",
      });
      return null;
    } finally {
      closeLoading();
    }
  }

  return {
    deleteComment,
  };
});
