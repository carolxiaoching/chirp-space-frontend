<script setup>
const { getTimeDiff } = useTimeFormat();
const { isSelfContent } = usePostUserRelation();

defineProps({
  comment: {
    type: Object,
    default() {
      return {};
    },
  },
});

defineEmits(["deleteCommentItem"]);
</script>

<template>
  <div v-if="comment">
    <div class="relative flex justify-between">
      <NuxtLink
        :to="`/user/${comment.user?._id}`"
        class="mb-3 flex items-center"
      >
        <img
          v-if="comment.user?.avatar?.imageUrl"
          :src="comment.user?.avatar?.imageUrl"
          class="avatar avatar-sm me-4"
        />
        <span v-else class="avatar avatar-default avatar-sm me-4">
          <icon-ic-round-person />
        </span>

        <div class="text-muted">
          <a href="#" class="hover:text-muted/80 mb-2 block">
            {{ comment.user?.nickName }}
          </a>
          <p class="text-sm">{{ getTimeDiff(comment.createdAt) }}</p>
        </div>
      </NuxtLink>

      <div v-if="isSelfContent(comment)">
        <BaseDropdownMenu>
          <li class="mb-2 last:mb-0">
            <a
              href="#"
              class="group hover:bg-danger bg-light flex items-center rounded-md px-10 py-2 hover:text-white"
              @click.prevent="$emit('deleteCommentItem', comment._id)"
            >
              <icon-ic-round-cancel
                class="text-danger me-4 text-2xl group-hover:text-white"
              />
              刪除評論
            </a>
          </li>
        </BaseDropdownMenu>
      </div>
    </div>

    <p class="ms-14 leading-8 tracking-wide">
      {{ comment.content }}
    </p>
  </div>
</template>

<style scoped></style>
