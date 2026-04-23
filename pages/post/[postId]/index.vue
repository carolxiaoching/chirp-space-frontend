<script setup>
import { postAPI } from "@/apis/post";

useSeoMeta({
  title: "啾文詳情 | 啾啾",
});

const route = useRoute();

const { apiGetPost, apiGetPostComments, apiCreateComment } = postAPI();
const { openLoading, closeLoading } = useLoading();
const { getFormatDate } = useTimeFormat();
const { updateLike, deletePost } = usePostStore();
const { deleteComment } = useCommentStore();
const { pushToast } = useToastStore();
const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);
const { isSelfContent, isLikedContent } = usePostUserRelation();
const { intersectionObserver } = useIntersectionObserver();

const id = ref("");
const post = ref({});
const comments = ref([]);
const formRef = ref(null);
const message = ref("");
const commentPage = ref(1);
const hasMoreData = ref(true);
const loadRef = ref(null);

const visibleRef = ref(false);
const indexRef = ref(0);
const postImages = computed(() => {
  const images = post.value.images.map((item) => item.imageUrl);
  return images;
});
const showImg = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);

// 按讚貼文/取消按讚貼文
async function toggleLike({ actionType, postId }) {
  const data = await updateLike({ actionType, postId });

  if (!data) {
    return;
  }

  // 修改本地 post 資料並修改其 likes 陣列與 likesCount
  const index = post.value.likes.indexOf(data.targetUserId);

  if (actionType === "like" && index === -1) {
    post.value.likes.push(data.targetUserId);
    post.value.likesCount++;
  } else if (actionType === "unlike" && index !== -1) {
    post.value.likes.splice(index, 1);
    post.value.likesCount--;
  }
}

// 刪除貼文
async function deletePostItem(postId) {
  const data = await deletePost(postId);

  if (data) {
    await navigateTo("/");
  }
}

// 刪除評論
async function deleteCommentItem(commentId) {
  const data = await deleteComment(commentId);

  if (!data) {
    return;
  }

  // 修改本地 comments 資料 - 找到指定評論並刪除
  const commentIndex = comments.value.findIndex(
    (item) => item._id === commentId,
  );
  if (commentIndex !== -1) {
    comments.value.splice(commentIndex, 1);
    post.value.commentsCount--;
  }
}

// 新增評論
async function createComment() {
  if (message.value === "") {
    return;
  }

  openLoading();

  try {
    const { data } = await apiCreateComment(id.value, {
      content: message.value,
    });

    // 重置表單
    formRef.value.resetForm();

    comments.value.unshift(data);
    post.value.commentsCount++;
  } catch (err) {
    pushToast({
      message: err.response?._data?.message || "新增評論失敗",
      status: "danger",
    });
  } finally {
    closeLoading();
  }
}

// 取得指定貼文
async function getData() {
  openLoading();

  try {
    const postRes = await apiGetPost(id.value);

    post.value = postRes.data;

    if (post.value.commentsCount > 0) {
      await getPostComments();
    } else {
      hasMoreData.value = false;
    }
  } catch (err) {
    hasMoreData.value = false;
    pushToast({
      message: err.response?._data?.message || "取得貼文失敗",
      status: "danger",
    });
    await navigateTo("/");
  } finally {
    closeLoading();
  }
}

// 取得指定貼文所有評論
async function getPostComments() {
  openLoading();

  try {
    const { data } = await apiGetPostComments(id.value, {
      page: commentPage.value,
    });

    comments.value.push(...data.comments);

    if (data.pagination?.hasNext) {
      commentPage.value += 1;
    } else {
      hasMoreData.value = false;
    }
  } catch (err) {
    hasMoreData.value = false;
    pushToast({
      message: err.response?._data?.message || "取得所有評論失敗",
      status: "danger",
    });
  } finally {
    closeLoading();
  }
}

onMounted(async () => {
  const postId = route.params.postId;

  if (postId) {
    id.value = postId;
    await getData();

    intersectionObserver(loadRef.value, getPostComments, hasMoreData);
  } else {
    await navigateTo("/");
  }
});
</script>

<template>
  <div v-if="post._id">
    <NuxtLink to="/" class="text-muted mb-4 flex items-center">
      <icon-ic-round-keyboard-backspace class="me-2 text-2xl" />
      回到貼文列表
    </NuxtLink>

    <div class="bg-light relative mb-4 rounded-md p-8">
      <div class="flex items-center justify-center">
        <p class="me-4 block text-4xl font-bold">
          {{ getFormatDate(post?.createdAt).day }}
        </p>
        <p class="text-center">
          <span class="text-muted block"
            >{{ getFormatDate(post?.createdAt).monthYear }}
          </span>
          <span class="text-muted text-sm">
            {{ getFormatDate(post?.createdAt).weekday }}
          </span>
        </p>
      </div>
      <div class="absolute top-8 right-8 text-5xl text-gray-200">
        <icon-game-icons-musical-notes />
      </div>
    </div>

    <div class="bg-light relative mb-4 rounded-md p-8">
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
        <div v-if="isSelfContent(post)">
          <BaseDropdownMenu>
            <li class="mb-2 last:mb-0">
              <a
                href="#"
                class="group hover:bg-danger bg-light flex items-center rounded-md px-10 py-2 hover:text-white"
                @click.prevent="deletePostItem(post._id)"
              >
                <icon-ic-round-cancel
                  class="text-danger me-4 text-2xl group-hover:text-white"
                />
                刪除貼文
              </a>
            </li>
          </BaseDropdownMenu>
        </div>
      </div>

      <div class="mb-6">
        <div class="mb-6 leading-8 tracking-wide whitespace-pre-line">
          {{ post.content }}
        </div>

        <ul v-if="post.images.length" class="flex h-[16rem] gap-4">
          <li
            v-for="(image, index) in post.images"
            :key="image._id"
            class="flex-1"
          >
            <a href="#" class="" @click.prevent="() => showImg(index)">
              <img
                :src="image.imageUrl"
                class="h-full w-full rounded object-cover"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="-ms-3 flex items-end justify-between">
        <ul class="-mb-1 flex items-center">
          <li class="me-1">
            <a
              v-if="isLikedContent(post)"
              href="#"
              class="text-danger hover:bg-muted/10 flex items-center rounded-md px-3 py-1"
              @click.prevent="
                toggleLike({
                  actionType: 'unlike',
                  postId: post._id,
                })
              "
            >
              <icon-ic-round-favorite class="text-md me-2" />
              <span> {{ post.likesCount }} </span>
            </a>
            <a
              v-else
              href="#"
              class="text-muted hover:bg-muted/10 flex items-center rounded-md px-3 py-1"
              @click.prevent="
                toggleLike({
                  actionType: 'like',
                  postId: post._id,
                })
              "
            >
              <icon-ic-round-favorite-border class="text-md me-2" />
              <span> {{ post.likesCount }} </span>
            </a>
          </li>
          <li class="text-muted flex items-center rounded-md px-4 py-1">
            <icon-ic-outline-chat class="text-md me-2" />
            <span> {{ post.commentsCount }} </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-light relative rounded-md p-8">
      <h3 class="mb-8 text-2xl font-semibold">留言</h3>
      <VForm
        v-slot="{ errors, meta }"
        ref="formRef"
        class="border-muted/50 items-bottom mb-8 flex border-b-1 pb-14"
        @submit="createComment"
      >
        <div class="hidden xl:block">
          <img
            v-if="userInfo?.avatar?.imageUrl"
            :src="userInfo?.avatar?.imageUrl"
            class="avatar me-6"
          />
          <span v-else class="avatar avatar-default me-6">
            <icon-ic-round-person />
          </span>
        </div>

        <div v-if="userInfo?._id" class="me-8 flex-1">
          <VField
            id="message"
            v-model.trim="message"
            type="text"
            name="留言"
            class="placeholder:text-muted bg-light block w-full border-0 border-b-2 border-gray-300 px-2 py-2 focus:ring-0 focus:outline-none"
            :class="{
              'border-danger border-2': errors['留言'],
            }"
            placeholder="請輸入留言"
            rules="min:2|required"
            required
          />
          <ErrorMessage name="留言" class="text-danger mt-1 block" />
        </div>

        <button
          v-if="userInfo?._id"
          type="submit"
          class="btn btn-primary self-start text-sm"
          :class="{ disabled: !meta.valid }"
          :disabled="!meta.valid"
        >
          送出留言
        </button>

        <div v-else class="me-8 flex-1">
          <NuxtLink
            to="/account/signin"
            class="text-muted hover:text-primary block border-b border-gray-300 py-2 text-center"
          >
            快點擊登入！啾啾們等你一起開聊~
          </NuxtLink>
        </div>
      </VForm>

      <ul v-if="comments.length">
        <li
          v-for="comment in comments"
          :key="comment._id"
          class="relative mb-8 last:mb-0"
        >
          <PostCommentCard
            :comment="comment"
            @delete-comment-item="deleteCommentItem"
          />
        </li>
      </ul>

      <div v-if="hasMoreData" ref="loadRef" class="py-8 text-center">
        <p class="text-muted">啾友們的真心話傳送中... 📡</p>
      </div>

      <div
        v-if="!comments.length && !hasMoreData"
        class="text-muted py-6 text-center"
      >
        評論區空空的，就像沒啾啾的天空 ☁️
      </div>
    </div>

    <div v-if="postImages.length">
      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="postImages"
        :index="indexRef"
        :move-disabled="true"
        :rotate-disabled="true"
        @hide="onHide"
      />
    </div>
  </div>
</template>

<style scoped></style>
