<script setup>
import { postAPI } from "@/apis/post";
import { imageAPI } from "@/apis/image";

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "寫啾啾文 | 啾啾",
});

const { apiCreatePost } = postAPI();
const { apiUploadImages } = imageAPI();
const { openLoading, closeLoading } = useLoading();
const { pushToast } = useToastStore();

const formRef = ref(null);
const content = ref("");
const images = ref([
  { file: null, previewImageUrl: "" },
  { file: null, previewImageUrl: "" },
]);

function updatePrevieImage({ index, file }) {
  const url = URL.createObjectURL(file);
  images.value[index] = { file, previewImageUrl: url };
}

function removePrevieImage(index) {
  const image = images.value[index];
  if (image.previewImageUrl) {
    URL.revokeObjectURL(image.previewImageUrl);
  }
  images.value[index] = { file: null, previewImageUrl: "" };
}

async function createPost() {
  openLoading();

  const postData = {
    content: content.value.trim(),
  };

  try {
    // 圖片上傳
    const files = images.value
      .filter((item) => item.file)
      .map((item) => item.file);

    if (files.length) {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const { data } = await apiUploadImages(formData);
      postData.images = data.map((item) => item.imageId);
    }

    await apiCreatePost(postData);

    // 重置表單
    formRef.value.resetForm();
    images.value = [
      { file: null, previewImageUrl: "" },
      { file: null, previewImageUrl: "" },
    ];

    // 跳轉首頁
    await navigateTo("/");

    pushToast({
      message: "建立貼文成功",
      status: "success",
    });
  } catch (err) {
    pushToast({
      message: err.response?._data?.message || "新增貼文失敗",
      status: "danger",
    });
  } finally {
    closeLoading();
  }
}
</script>
<template>
  <div>
    <div class="bg-light relative mb-4 rounded-md p-8">
      <h1 class="text-center text-2xl font-semibold">新增貼文</h1>
      <div class="absolute top-6 right-8 text-5xl text-gray-200">
        <icon-game-icons-musical-notes />
      </div>
    </div>

    <VForm
      v-slot="{ errors, meta }"
      ref="formRef"
      class="bg-light relative rounded-md p-8"
      @submit="createPost"
    >
      <div class="mb-6">
        <label for="content" class="form-label">
          <span class="text-danger">*</span>
          貼文內容：
        </label>

        <VField
          id="content"
          v-model="content"
          as="textarea"
          type="text"
          rows="8"
          placeholder="請輸入貼文內容"
          class="form-control resize-none"
          name="貼文內容"
          :class="{
            'border-danger border-2': errors['貼文內容'],
          }"
          rules="required"
          required
        />

        <ErrorMessage name="貼文內容" class="text-danger" />
      </div>

      <ul class="mb-10 flex flex-col gap-4 xl:h-[16rem] xl:flex-row">
        <li v-for="(image, index) in images" :key="index" class="flex-1">
          <BaseUploadImage
            :index="index"
            :preview-image-url="image.previewImageUrl"
            class="h-full"
            @update-image="updatePrevieImage"
            @remove-image="removePrevieImage"
          />
        </li>
      </ul>

      <div class="flex flex-col xl:flex-row">
        <NuxtLink
          to="/"
          class="btn btn-light me-auto mb-4 flex w-full items-center justify-center px-16 py-3 xl:mb-0 xl:w-auto"
        >
          <icon-ic-twotone-turn-left class="me-4 text-2xl" />
          返回所有貼文
        </NuxtLink>
        <button
          type="submit"
          class="btn btn-primary w-full py-3 text-nowrap xl:w-auto xl:px-48"
          :class="{ disabled: !meta.valid }"
          :disabled="!meta.valid"
        >
          新增貼文
        </button>
      </div>
    </VForm>
  </div>
</template>
<style scoped></style>
