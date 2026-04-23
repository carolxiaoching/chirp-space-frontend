<script setup>
import { userAPI } from "@/apis/user";

useSeoMeta({
  title: "啾友小窩 | 啾啾",
});

const route = useRoute();
const memberId = ref("");
const member = ref({});

const { apiGetUserProfile } = userAPI();
const { isFollowed } = usePostUserRelation();
const { updateFollow } = useAuthStore();
const { pushToast } = useToastStore();
const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);

async function getUserProfile() {
  try {
    const data = await apiGetUserProfile(memberId.value);
    if (data.status === "success") {
      member.value = data.data;
    } else {
      // 跳轉首頁
      await navigateTo("/");
    }
  } catch (err) {
    pushToast({
      message: err.response?._data?.message || "取得用戶資料失敗",
      status: "danger",
    });
    await navigateTo("/");
  }
}

onMounted(async () => {
  const id = route.params?.userId;

  if (id) {
    memberId.value = id;
    await getUserProfile();
  }
});
</script>

<template>
  <div v-if="member._id">
    <div class="bg-light relative mb-8 rounded-md px-4 py-8 xl:px-8">
      <div class="absolute top-6 left-8 text-5xl text-gray-200">
        <img src="~/assets/images/logo-single.svg" alt="logo" class="size-16" />
      </div>

      <div class="mb-4 flex items-center justify-center">
        <img
          v-if="member.avatar?.imageUrl"
          :src="member.avatar?.imageUrl"
          class="avatar avatar-lg me-4"
        />
        <span v-else class="avatar avatar-default avatar-lg me-4">
          <icon-ic-round-person />
        </span>
        <span class="font-semibold">
          {{ member.nickName }}
        </span>
      </div>

      <div v-if="memberId !== userInfo?._id">
        <a
          v-if="isFollowed(memberId)"
          href="#"
          class="btn btn-outline-primary btn-sm absolute top-8 right-8 mb-4"
          @click.prevent="updateFollow({ actionType: 'unfollow', memberId })"
        >
          取消追蹤
        </a>
        <a
          v-else
          href="#"
          class="btn btn-primary btn-sm absolute top-8 right-8 mb-4"
          @click.prevent="updateFollow({ actionType: 'follow', memberId })"
        >
          追蹤對方
        </a>
      </div>
      <div
        class="mx-auto mb-8 flex min-h-16 max-w-2xl items-center justify-center"
      >
        <p
          v-if="member.description"
          class="text-muted leading-8 tracking-wide whitespace-pre-line"
        >
          {{ member.description }}
        </p>
        <p v-else class="text-muted leading-8 tracking-wide">
          這位啾友好像忘了寫自我介紹，還是偷偷藏起來了？
        </p>
      </div>

      <nav class="bg-muted/10 flex gap-3 rounded-md p-1 text-center">
        <NuxtLink
          exact-active-class="bg-white"
          class="text-muted hover:bg-light w-full cursor-pointer rounded-md py-2 text-sm font-semibold"
          :to="`/user/${memberId}`"
        >
          貼文
        </NuxtLink>
        <NuxtLink
          exact-active-class="bg-white"
          class="text-muted hover:bg-light w-full cursor-pointer rounded-md py-2 text-sm font-semibold"
          :to="`/user/${memberId}/likes`"
        >
          按讚
        </NuxtLink>
        <NuxtLink
          exact-active-class="bg-white"
          class="text-muted hover:bg-light w-full cursor-pointer rounded-md py-2 text-sm font-semibold"
          :to="`/user/${memberId}/comments`"
        >
          留言
        </NuxtLink>
        <NuxtLink
          exact-active-class="bg-white"
          class="text-muted hover:bg-light w-full cursor-pointer rounded-md py-2 text-sm font-semibold"
          :to="`/user/${memberId}/following`"
        >
          追蹤
        </NuxtLink>
        <NuxtLink
          exact-active-class="bg-white"
          class="text-muted hover:bg-light w-full cursor-pointer rounded-md py-2 text-sm font-semibold"
          :to="`/user/${memberId}/followers`"
        >
          粉絲
        </NuxtLink>
      </nav>
    </div>

    <NuxtPage />
  </div>
</template>
