export const userAPI = () => {
  const {
    public: { apiUrl },
  } = useRuntimeConfig();

  function apiGetUserProfile(userId) {
    return $fetch(`api/user/${userId}`, {
      baseURL: apiUrl,
      method: "GET",
    });
  }

  function apiGetUserAllPosts(userId, query) {
    return $fetch(`api/user/${userId}/posts`, {
      baseURL: apiUrl,
      method: "GET",
      query,
    });
  }

  function apiGetUserLikedPosts(userId, query) {
    return $fetch(`api/user/${userId}/likes`, {
      baseURL: apiUrl,
      method: "GET",
      query,
    });
  }

  function apiGetUserComments(userId, query) {
    return $fetch(`api/user/${userId}/comments`, {
      baseURL: apiUrl,
      method: "GET",
      query,
    });
  }

  function apiGetUserFollowing(userId, query) {
    return $fetch(`api/user/${userId}/following`, {
      baseURL: apiUrl,
      method: "GET",
      query,
    });
  }

  function apiGetUserFollowers(userId, query) {
    return $fetch(`api/user/${userId}/followers`, {
      baseURL: apiUrl,
      method: "GET",
      query,
    });
  }

  return {
    apiGetUserProfile,
    apiGetUserAllPosts,
    apiGetUserLikedPosts,
    apiGetUserComments,
    apiGetUserFollowing,
    apiGetUserFollowers,
  };
};
