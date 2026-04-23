export const useModal = () => {
  const modalState = useState("modalState", () => ({
    login: false,
  }));

  const isModalOpen = (name) => computed(() => modalState.value[name]);

  const openModal = (name) => {
    modalState.value[name] = true;
  };

  const closeModal = (name) => {
    modalState.value[name] = false;
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
