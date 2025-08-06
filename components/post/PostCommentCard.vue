<script setup>
const { getTimeDiff } = useTimeFormat();

defineProps({
  comment: {
    type: Object,
    default() {
      return {};
    },
  },
});
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
    </div>

    <p class="ms-14 leading-8 tracking-wide">
      {{ comment.content }}
    </p>
  </div>
</template>

<style scoped></style>
