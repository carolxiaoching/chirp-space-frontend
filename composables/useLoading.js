export const useLoading = () => {
  const isLoading = useState("isLoading", () => false);

  // 開啟 Loading
  function openLoading() {
    isLoading.value = true;
  }

  // 關閉 Loading
  function closeLoading() {
    isLoading.value = false;
  }

  return {
    isLoading,
    openLoading,
    closeLoading,
  };
};
