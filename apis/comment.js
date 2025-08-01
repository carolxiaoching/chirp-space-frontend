export const commentAPI = () => {
  const {
    public: { apiUrl },
  } = useRuntimeConfig();
  const authToken = ref("");

  function apiDeleteComment(commentId) {
    return $fetch(`api/comment/${commentId}`, {
      baseURL: apiUrl,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  }

  return {
    apiDeleteComment,
  };
};
