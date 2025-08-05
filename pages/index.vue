<script setup>
import { postAPI } from "@/apis/post";

const route = useRoute();

const { apiGetAllPosts } = postAPI();
const { openLoading, closeLoading } = useLoading();
const { pushToast } = useToastStore();
const { intersectionObserver, unobserve } = userIntersectionObserver();
const { getFormatDate } = useTimeFormat();

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
      await getAllPosts();

      unobserve(); // 先取消滾動監聽，避免重複綁定
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
        <div class="flex flex-col xl:flex-row">
          <div class="bg-light mb-4 rounded-md p-8 xl:me-4 xl:mb-0">
            <div
              class="flex items-center justify-center text-center xl:flex-col"
            >
              <p class="me-8 text-4xl font-bold xl:me-0 xl:mb-2">
                {{ getFormatDate(post?.createdAt).day }}
              </p>
              <p>
                <span class="text-muted block">
                  {{ getFormatDate(post?.createdAt).monthYear }}
                </span>
                <span class="text-muted text-sm">
                  {{ getFormatDate(post?.createdAt).weekday }}
                </span>
              </p>
            </div>
          </div>
          <div class="bg-light flex-1 rounded-md p-8">
            <div class="relative flex justify-between">
              <NuxtLink
                :to="`/user/${post.user?._id}`"
                class="group mb-6 flex items-center"
              >
                <img
                  v-if="post.user?.avatar?.imageUrl"
                  :src="post.user?.avatar?.imageUrl"
                  class="avatar me-3"
                />
                <span v-else class="avatar avatar-default me-3">
                  <icon-ic-round-person />
                </span>
                <span class="text-muted group-hover:text-muted/80">
                  {{ post.user?.nickName }}
                </span>
              </NuxtLink>
            </div>

            <div class="mb-6">
              <div
                class="mb-6 line-clamp-3 leading-8 tracking-wide whitespace-pre-line"
              >
                {{ post.content }}
              </div>

              <ul v-if="post.images.length" class="flex h-[16rem] gap-4">
                <li
                  v-for="image in post.images"
                  :key="image._id"
                  class="flex-1"
                >
                  <img
                    :src="image.imageUrl"
                    class="h-full w-full rounded object-cover"
                  />
                </li>
              </ul>
            </div>
            <div class="-ms-3 flex items-end justify-between">
              <ul class="-mb-1 flex items-center">
                <li class="me-1">
                  <a
                    href="#"
                    class="text-danger hover:bg-muted/10 flex items-center rounded-md px-3 py-1"
                  >
                    <icon-ic-round-favorite class="text-md me-2" />
                    <span> {{ post.likesCount }} </span>
                  </a>
                </li>
                <li class="text-muted flex items-center rounded-md px-4 py-1">
                  <icon-ic-outline-chat class="text-md me-2" />
                  <span> {{ post.commentsCount }} </span>
                </li>
              </ul>
              <NuxtLink :to="`/post/${post._id}`" class="btn btn-light btn-sm">
                看更多
              </NuxtLink>
            </div>
          </div>
        </div>
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
