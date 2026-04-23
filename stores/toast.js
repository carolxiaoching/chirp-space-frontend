import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref([]);

  // 關閉 Toast
  function clearToast(id) {
    const index = toasts.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  }

  // 新增 Toast
  function pushToast(data) {
    const id = Date.now();
    const { status = "success", message } = data;
    toasts.value.push({ id, status, message });

    setTimeout(() => {
      clearToast(id);
    }, 3000);
  }

  return {
    toasts,
    clearToast,
    pushToast,
  };
});
