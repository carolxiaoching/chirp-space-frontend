export const usePostUserRelation = () => {
  const authStore = useAuthStore();
  const { userInfo } = storeToRefs(authStore);

  // 是否是自己所有
  const isSelfContent = (content) => {
    const myId = userInfo.value?._id;
    const userId = content?.user?._id;

    if (!myId || !userId) {
      return false;
    }

    return userId === myId;
  };

  // 是否已按讚
  const isLikedContent = (content) => {
    const myId = userInfo.value?._id;
    const likes = content?.likes;

    if (!myId || !likes?.length) {
      return false;
    }

    return likes.includes(myId);
  };

  // 是否已追蹤
  const isFollowed = (memberId) => {
    const following = userInfo.value?.following;

    if (!memberId || !following?.length) {
      return false;
    }

    return following.some((item) => item.user === memberId);
  };

  return { isSelfContent, isLikedContent, isFollowed };
};
