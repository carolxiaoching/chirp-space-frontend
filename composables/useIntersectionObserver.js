// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

export const useIntersectionObserver = () => {
  // IntersectionObserver 實體
  const observer = ref(null);
  // 是否已進入可視範圍
  const isIntersection = ref(false);
  // 被觀察的 DOM 元素
  const elRef = ref(null);

  const intersectionObserver = (el, loadMoreFn, hasMoreRef) => {
    // 若已存在 IntersectionObserver 實體，先斷開以避免重複綁定
    if (observer.value) {
      observer.value.disconnect();
    }

    // 如果沒有傳入 DOM 元素就不執行
    if (!el) return;

    // 儲存被觀察的 DOM 元素
    elRef.value = el;

    // 建立 IntersectionObserver 實體
    observer.value = new IntersectionObserver(
      async (entries) => {
        // 改用 for...of 使 await 生效，避免 forEach 不等待 async 造成重複請求
        for (const item of entries) {
          // 是否進入可視範圍
          const isVisible = item.isIntersecting;
          isIntersection.value = isVisible;

          // 未進入可視範圍就不執行
          if (!isVisible) return;

          // 若沒有更多資料就不執行
          if (!hasMoreRef?.value) return;

          // 執行傳入的函式
          await loadMoreFn();

          // 若沒有資料了，則停止觀察
          if (!hasMoreRef.value) {
            unobserve();
          }
        }
      },
      {
        root: null, // 監控整個頁面
        threshold: 1, // 完全進入畫面才會觸發
      },
    );

    // 開始觀察
    observer.value.observe(el);
  };

  // 停止觀察
  const unobserve = () => {
    if (observer.value) {
      observer.value.disconnect();
      observer.value = null;
    }
  };

  // 當元件卸載時自動取消觀察
  onUnmounted(() => {
    unobserve();
  });

  return {
    elRef, // 被觀察 DOM 元素
    isIntersection, // 是否進入可視範圍
    intersectionObserver, // 開始觀察的函式
    unobserve, // 停止觀察的函式
  };
};
