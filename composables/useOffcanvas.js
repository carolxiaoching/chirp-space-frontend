export const useOffcanvas = () => {
  const isOffcanvasOpen = useState("isOffcanvasOpen", () => false);

  // 開啟 Offcanvas
  function openOffcanvas() {
    isOffcanvasOpen.value = true;
    document.body.style.overflow = "hidden";
  }

  // 關閉 Offcanvas
  function closeOffcanvas() {
    isOffcanvasOpen.value = false;
    document.body.style.overflow = "";
  }

  return {
    isOffcanvasOpen,
    openOffcanvas,
    closeOffcanvas,
  };
};
