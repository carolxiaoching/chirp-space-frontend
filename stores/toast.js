import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref([]);

  // 顯示 Toast
  function showToast() {
    setTimeout(() => {
      toasts.value.shift();
    }, 3000);
  }

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
    showToast();
  }

  return {
    toasts,
    showToast,
    clearToast,
    pushToast,
  };
});
