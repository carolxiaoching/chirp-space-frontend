<script setup>
import { postAPI } from "@/apis/post";

useSeoMeta({
  title: "話題總匯 | 啾啾",
});

const route = useRoute();

const { apiGetAllPosts } = postAPI();
const { updateLike, deletePost } = usePostStore();
const { openLoading, closeLoading } = useLoading();
const { pushToast } = useToastStore();
const { intersectionObserver, unobserve } = userIntersectionObserver();

const keyword = ref("");
const posts = ref([]);
const page = ref(1);
const hasMoreData = ref(true);
const loadRef = ref(null);

watch(
  () => route.query.keyword,
  async (newKeyword, oldKeyword) => {
    if (newKeyword !== oldKeyword || oldKeyword === undefined) {
      keyword.value = newKeyword || "";
      posts.value = [];
      page.value = 1;
      hasMoreData.value = true;
      loadRef.value = null;

      unobserve(); // 先取消滾動監聽，避免重複綁定
      await getAllPosts();
      intersectionObserver(loadRef.value, getAllPosts, hasMoreData);
    }
  },
  { immediate: true },
);

// 取得所有貼文
async function getAllPosts() {
  openLoading();

  const params = {
    page: page.value,
    keyword: keyword.value ? keyword.value : null,
  };

  try {
    const { data } = await apiGetAllPosts(params);
    posts.value.push(...data.posts);

    if (data.pagination?.hasNext) {
      page.value += 1;
    } else {
      hasMoreData.value = false;
    }
  } catch (err) {
    pushToast({
      message: err.response?._data?.message || "取得所有貼文失敗",
      status: "danger",
    });
  } finally {
    closeLoading();
  }
}

// 按讚貼文/取消按讚貼文
async function toggleLike({ actionType, postId }) {
  const data = await updateLike({ actionType, postId });

  if (!data) {
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

// 清除搜尋
async function clearSearch() {
  await navigateTo({
    path: route.path,
    query: {},
  });
}
</script>

<template>
  <div>
    <div class="mb-4 flex items-center">
      <div class="text-muted flex items-center">
        <icon-ic-round-forum class="me-2 text-2xl" />
        話題總匯
      </div>
      <div v-if="keyword" class="text-muted ms-2 flex items-center">
        <icon-ic-round-chevron-right class="text-2xl" />
        <a
          href="#"
          class="group hover:bg-light flex items-center rounded-md px-2 py-1"
          @click.prevent="clearSearch"
        >
          {{ keyword }}
          <icon-ic-round-cancel class="group-hover:text-danger ms-2 text-xl" />
        </a>
      </div>
    </div>

    <ul v-if="posts.length">
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

    <!-- 若沒有貼文 -->
    <div v-if="!posts.length && !hasMoreData" class="bg-light rounded-md p-8">
      <p class="text-muted mb-4 text-center text-xl">
        目前還沒有人開啟啾啾話題～ 🤐
      </p>
      <p class="text-muted/70 text-center">你要來當第一個嗎？</p>
    </div>
  </div>
</template>

<style scoped></style>
