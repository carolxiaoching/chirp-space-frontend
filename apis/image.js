export const imageAPI = () => {
  const {
    public: { apiUrl },
  } = useRuntimeConfig();
  const authStore = useAuthStore();
  const { authToken } = storeToRefs(authStore);

  function apiUploadImages(data, type = "photo") {
    return $fetch(`api/images?type=${type}`, {
      baseURL: apiUrl,
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      body: data,
    });
  }

  function apiDeleteImages(imageId) {
    return $fetch(`api/images/${imageId}`, {
      baseURL: apiUrl,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  }

  return {
    apiDeleteImages,
    apiUploadImages,
  };
};
