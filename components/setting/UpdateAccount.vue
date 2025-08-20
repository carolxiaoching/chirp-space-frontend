<script setup>
import { authAPI } from "@/apis/auth";
import { imageAPI } from "@/apis/image";

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);
const { setAuth } = authStore;

const { apiUpdateMyProfile } = authAPI();
const { apiUploadImages } = imageAPI();
const { openLoading, closeLoading } = useLoading();
const { pushToast } = useToastStore();

const formRef = ref(null);
const errorMsg = ref("");
const user = ref({
  email: "",
  nickName: "",
  avatar: null,
  description: "",
  gender: "secret",
});
const image = ref({ file: null, previewImageUrl: "" });

async function updateAccount() {
  openLoading();

  const userData = {
    nickName: user.value.nickName,
    description: user.value.description,
    gender: user.value.gender,
  };

  try {
    // 如果有更新頭像，則上傳圖片
    const file = image.value.file;
    if (file) {
      const formData = new FormData();
      formData.append("images", file);

      const imageData = await apiUploadImages(formData, "avatar");

      userData.avatar = imageData.data[0].imageId;
    }

    // 會員資料更新
    const profileData = await apiUpdateMyProfile(userData);

    setAuth(profileData.data);

    // 重置表單
    image.value.file = null;

    pushToast({
      message: "修改個人資料成功",
      status: "success",
    });
  } catch (err) {
    pushToast({
      message: err.response?._data?.message || "修改個人資料失敗",
      status: "danger",
    });
  } finally {
    closeLoading();
  }
}

watch(
  userInfo,
  (newVal) => {
    if (!newVal || !newVal.email) return;

    user.value = {
      email: newVal.email,
      nickName: newVal.nickName,
      description: newVal.description,
      gender: newVal.gender,
      avatar: newVal.avatar,
    };
    // 如果有頭像資料，則顯示頭像圖片
    image.value.previewImageUrl = newVal.avatar?.imageUrl || "";
  },
  { immediate: true },
);

function updatePrevieImage(data) {
  const url = URL.createObjectURL(data.file);
  image.value = { file: data.file, previewImageUrl: url };
}

function removePrevieImage() {
  if (image.value.previewImageUrl) {
    URL.revokeObjectURL(image.value.previewImageUrl);
  }

  image.value = { file: null, previewImageUrl: "" };
}
</script>

<template>
  <VForm
    v-slot="{ errors, meta }"
    ref="formRef"
    class="mx-auto lg:max-w-3/4"
    @submit="updateAccount"
  >
    <p v-if="errorMsg" class="alert alert-danger mb-8">
      <icon-ic-round-warning class="me-4 text-2xl" />

      {{ errorMsg }}
    </p>

    <div class="mx-auto mb-8 size-[16rem]">
      <BaseUploadImage
        :index="0"
        :preview-image-url="image.previewImageUrl"
        type="avatar"
        class="h-full"
        @update-image="updatePrevieImage"
        @remove-image="removePrevieImage"
      />
    </div>

    <div class="mb-4">
      <label for="email" class="form-label"> 電子信箱： </label>
      <input
        id="email"
        type="email"
        name="email"
        class="form-control"
        :value="user.email"
        disabled
      />
    </div>

    <div class="mb-4">
      <label for="nickName" class="form-label">
        <span class="text-danger">*</span>
        暱稱：
      </label>
      <VField
        id="nickName"
        v-model="user.nickName"
        type="text"
        name="暱稱"
        class="form-control"
        :class="{
          'border-danger border-2': errors['暱稱'],
        }"
        placeholder="請輸入暱稱"
        rules="min:2|max:10|required"
        required
      />
      <ErrorMessage name="暱稱" class="text-danger mt-1 block" />
    </div>

    <div class="mb-4">
      <label for="gender" class="form-label">
        <span class="text-danger">*</span>
        性別：
      </label>
      <VField
        id="gender"
        v-model="user.gender"
        as="select"
        name="性別"
        class="form-control"
        :class="{ 'border-danger border-2': errors['性別'] }"
        placeholder="請選擇性別"
        rules="required"
        required
      >
        <option value="secret">秘密</option>
        <option value="female">女生</option>
        <option value="male">男生</option>
      </VField>
      <ErrorMessage name="性別" class="text-danger mt-1 block" />
    </div>

    <div class="mb-11">
      <label for="description" class="form-label">
        <span class="text-danger">*</span>
        自我介紹
      </label>

      <VField
        id="description"
        v-model="user.description"
        as="textarea"
        type="text"
        rows="5"
        placeholder="請輸入自我介紹"
        class="form-control resize-none"
        name="自我介紹"
        :class="{
          'border-danger border-2': errors['自我介紹'],
        }"
        rules="required"
        required
      />

      <ErrorMessage name="自我介紹" class="text-danger mt-1 block" />
    </div>

    <div class="text-center">
      <button
        type="submit"
        class="btn btn-primary px-12 xl:px-32"
        :class="{ disabled: !meta.valid }"
        :disabled="!meta.valid"
      >
        更新個人資料
      </button>
    </div>
  </VForm>
</template>
