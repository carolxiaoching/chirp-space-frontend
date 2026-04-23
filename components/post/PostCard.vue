<script setup>
const { getFormatDate } = useTimeFormat();
const { isSelfContent, isLikedContent } = usePostUserRelation();

defineProps({
  post: {
    type: Object,
    default() {
      return {};
    },
  },
});

defineEmits(["updateLike", "deletePost"]);
</script>

<template>
  <div v-if="post" class="flex flex-col xl:flex-row">
    <div class="bg-light mb-4 rounded-md p-8 xl:me-4 xl:mb-0">
      <div class="flex items-center justify-center text-center xl:flex-col">
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
        <div v-if="isSelfContent(post)">
          <BaseDropdownMenu>
            <li class="mb-2 last:mb-0">
              <a
                href="#"
                class="group hover:bg-danger bg-light flex items-center rounded-md px-10 py-2 hover:text-white"
                @click.prevent="$emit('deletePost', post._id)"
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
        <div
          class="mb-6 line-clamp-3 leading-8 tracking-wide whitespace-pre-line"
        >
          {{ post.content }}
        </div>

        <ul v-if="post.images?.length" class="flex h-[16rem] gap-4">
          <li v-for="image in post.images" :key="image._id" class="flex-1">
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
              v-if="isLikedContent(post)"
              href="#"
              class="text-danger hover:bg-muted/10 flex items-center rounded-md px-3 py-1"
              @click.prevent="
                $emit('updateLike', { actionType: 'unlike', postId: post?._id })
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
                $emit('updateLike', { actionType: 'like', postId: post?._id })
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
        <NuxtLink :to="`/post/${post._id}`" class="btn btn-light btn-sm">
          看更多
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
