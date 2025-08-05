<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  previewImageUrl: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "photo",
  },
});

const emit = defineEmits(["updateImage", "removeImage"]);

// 更換並瀏覽圖片
function changeImage(event) {
  const file = event.target.files[0];

  if (file) {
    emit("updateImage", { index: props.index, file });
  }
}
</script>

<template>
  <div>
    <div v-if="previewImageUrl" class="relative h-full">
      <img
        :src="previewImageUrl"
        class="bg-light block h-full w-full object-cover"
        :class="[props.type === 'avatar' ? 'rounded-full' : 'rounded']"
      />
      <a
        href="#"
        class="text-danger bg-light/30 absolute top-2 left-2 rounded-full text-2xl transition hover:scale-125"
        @click.prevent="emit('removeImage', props.index)"
      >
        <icon-ic-round-cancel />
      </a>
    </div>
    <div v-else class="relative h-full">
      <input
        :id="`image-${index}`"
        type="file"
        accept="image/*"
        name="image"
        class="hidden"
        @change="changeImage"
      />

      <label
        :for="`image-${index}`"
        class="hover:bg-muted/10 hover:border-muted/10 border-primary/50 text-primary/50 flex h-full min-h-36 cursor-pointer items-center justify-center border-4 border-dashed font-semibold transition"
        :class="[props.type === 'avatar' ? 'rounded-full' : 'rounded']"
      >
        <icon-ic-round-add-circle class="me-4 text-2xl" />
        <span class="text-lg">
          新增{{ props.type === "avatar" ? "頭像" : "圖片" }}
        </span>
      </label>
    </div>
  </div>
</template>
<style scoped></style>
