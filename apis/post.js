export const postAPI = () => {
  const {
    public: { apiUrl },
  } = useRuntimeConfig();
  const authStore = useAuthStore();
  const { authToken } = storeToRefs(authStore);

  function apiGetAllPosts(query) {
    return $fetch(`api/posts`, {
      baseURL: apiUrl,
      method: "GET",
      query,
    });
  }

  function apiGetPost(postId) {
    return $fetch(`api/post/${postId}`, {
      baseURL: apiUrl,
      method: "GET",
    });
  }

  function apiCreatePost(data) {
    return $fetch(`api/post`, {
      baseURL: apiUrl,
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      body: data,
    });
  }

  function apiDeletePost(postId) {
    return $fetch(`api/post/${postId}`, {
      baseURL: apiUrl,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  }

  function apiLikePost(postId) {
    return $fetch(`api/post/${postId}/like`, {
      baseURL: apiUrl,
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  }

  function apiUnlikePost(postId) {
    return $fetch(`api/post/${postId}/like`, {
      baseURL: apiUrl,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  }

  function apiGetPostComments(postId, query) {
    return $fetch(`api/post/${postId}/comments`, {
      baseURL: apiUrl,
      method: "GET",
      query,
    });
  }

  function apiCreateComment(postId, data) {
    return $fetch(`api/post/${postId}/comment`, {
      baseURL: apiUrl,
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      body: data,
    });
  }

  return {
    apiGetAllPosts,
    apiGetPost,
    apiCreatePost,
    apiLikePost,
    apiUnlikePost,
    apiDeletePost,
    apiGetPostComments,
    apiCreateComment,
  };
};
