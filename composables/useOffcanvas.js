export const useOffcanvas = () => {
  const isOffcanvasOpen = useState("isOffcanvasOpen", () => false);

  // 開啟 Offcanvas
  function openOffcanvas() {
    isOffcanvasOpen.value = true;
    // 伺服器端不存在 document，需確認為客戶端才執行
    if (import.meta.client) {
      document.body.style.overflow = "hidden";
    }
  }

  // 關閉 Offcanvas
  function closeOffcanvas() {
    isOffcanvasOpen.value = false;
    // 伺服器端不存在 document，需確認為客戶端才執行
    if (import.meta.client) {
      document.body.style.overflow = "";
    }
  }

  return {
    isOffcanvasOpen,
    openOffcanvas,
    closeOffcanvas,
  };
};
