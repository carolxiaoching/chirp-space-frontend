export const usePostUserRelation = () => {
  const authStore = useAuthStore();
  const { userInfo } = storeToRefs(authStore);

  // 是否已按讚
  const isLikedContent = (content) => {
    const myId = userInfo.value?._id;
    const likes = content?.likes;

    if (!myId || !likes?.length) {
      return false;
    }

    return likes.includes(myId);
  };

  return { isLikedContent };
};
