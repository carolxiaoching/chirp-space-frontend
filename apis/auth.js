export const authAPI = () => {
  const {
    public: { apiUrl },
  } = useRuntimeConfig();
  const authStore = useAuthStore();
  const { authToken } = storeToRefs(authStore);

  function apiSignIn(data) {
    return $fetch("api/user/signin", {
      baseURL: apiUrl,
      method: "POST",
      body: data,
    });
  }

  function apiSignUp(data) {
    return $fetch("api/user/signup", {
      baseURL: apiUrl,
      method: "POST",
      body: data,
    });
  }

  function apiGetMyProfile() {
    return $fetch("api/user/me", {
      baseURL: apiUrl,
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  }

  function apiUpdateMyProfile(data) {
    return $fetch("api/user/me", {
      baseURL: apiUrl,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      body: data,
    });
  }

  function apiUpdatePassword(data) {
    return $fetch("api/user/updatePassword", {
      baseURL: apiUrl,
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      body: data,
    });
  }

  function apiFollowUser(userId) {
    return $fetch(`api/user/${userId}/follow`, {
      baseURL: apiUrl,
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  }

  function apiUnfollowUser(userId) {
    return $fetch(`api/user/${userId}/follow`, {
      baseURL: apiUrl,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  }

  return {
    apiSignIn,
    apiSignUp,
    apiGetMyProfile,
    apiUpdateMyProfile,
    apiUpdatePassword,
    apiFollowUser,
    apiUnfollowUser,
  };
};
