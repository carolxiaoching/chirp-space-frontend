<script setup>
import { userAPI } from "@/apis/user";

const route = useRoute();

const { apiGetUserLikedPosts } = userAPI();
const { openLoading, closeLoading } = useLoading();
const { pushToast } = useToastStore();
const { updateLike, deletePost } = usePostStore();
const { intersectionObserver } = userIntersectionObserver();
const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);

const memberId = ref("");
const posts = ref([]);
const page = ref(1);
const hasMoreData = ref(true);
const loadRef = ref(null);

// 取得會員所有按讚貼文
async function getUserLikedPosts() {
  openLoading();

  try {
    const { data } = await apiGetUserLikedPosts(memberId.value, {
      page: page.value,
    });

    posts.value.push(...data.posts);

    if (data.pagination?.hasNext) {
      page.value += 1;
    } else {
      hasMoreData.value = false;
    }
  } catch (err) {
    pushToast({
      message: err.response?._data?.message || "取得所有按讚貼文失敗",
      status: "danger",
    });
  } finally {
    closeLoading();
  }
}

// 取消按讚貼文
async function toggleLike({ actionType, postId }) {
  const data = await updateLike({ actionType, postId });
  if (!data) {
    return;
  }

  // 如果是本人的帳號 - 刪除 posts 資料中此篇貼文
  if (memberId.value === userInfo.value._id) {
    const postIndex = posts.value.findIndex((item) => item._id === postId);
    if (postIndex !== -1) {
      posts.value.splice(postIndex, 1);
    }

    return;
  }

  // 修改本地 posts 資料，找到指定貼文並修改其 likes 陣列與 likesCount
  const post = posts.value.find((item) => item._id === postId);
  const index = post.likes.indexOf(data.targetUserId);

  if (actionType === "like" && index === -1) {
    post.likes.push(data.targetUserId);
    post.likesCount++;
  } else if (actionType === "unlike" && index !== -1) {
    post.likes.splice(index, 1);
    post.likesCount--;
  }
}

// 刪除貼文
async function deletePostItem(postId) {
  const data = await deletePost(postId);

  if (!data) {
    return;
  }

  // 修改本地 posts 資料 - 找到指定貼文並刪除
  const postIndex = posts.value.findIndex((item) => item._id === postId);
  if (postIndex !== -1) {
    posts.value.splice(postIndex, 1);
  }
}

onMounted(async () => {
  const id = route.params?.userId;

  if (id) {
    memberId.value = id;
    await getUserLikedPosts();

    intersectionObserver(loadRef.value, getUserLikedPosts, hasMoreData);
  } else {
    await navigateTo("/");
  }
});
</script>

<template>
  <div>
    <ul v-if="posts?.length">
      <li v-for="post in posts" :key="post._id" class="mb-8 last:mb-0">
        <PostCard
          :post="post"
          @update-like="toggleLike"
          @delete-post="deletePostItem"
        />
      </li>
    </ul>

    <div v-if="hasMoreData" ref="loadRef" class="py-8 text-center">
      <p class="text-muted">資料正在飛來的路上 🕊️⋯⋯</p>
    </div>

    <div v-if="!posts.length && !hasMoreData" class="bg-light rounded-md p-8">
      <p class="text-muted mb-4 text-center text-xl">
        他還沒有對任何貼文啾啾心動 💓
      </p>
      <p class="text-muted/70 text-center">沒有喜歡，不代表沒有在看唷</p>
    </div>
  </div>
</template>

<style scoped></style>
