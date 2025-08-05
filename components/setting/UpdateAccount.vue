<script setup>
import { authAPI } from "@/apis/auth";

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);
const { setAuth } = authStore;

const { apiUpdateMyProfile } = authAPI();
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
const previewImageUrl = ref("");

async function updateAccount() {
  openLoading();

  const userData = {
    nickName: user.value.nickName,
    description: user.value.description,
    gender: user.value.gender,
  };

  try {
    // 會員資料更新
    const profileData = await apiUpdateMyProfile(userData);

    setAuth(profileData.data);

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
    if (!newVal || !newVal.email) {
      return;
    }

    user.value = {
      email: newVal.email,
      nickName: newVal.nickName,
      description: newVal.description,
      gender: newVal.gender,
      avatar: newVal.avatar,
    };
    // 如果有頭像資料，則顯示頭像圖片
    previewImageUrl.value = newVal.avatar?.imageUrl || "";
  },
  { immediate: true },
);

// 更換圖片
function changeImage(event) {
  const file = event.target.files[0];
  console.log(file);
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
      <div v-if="previewImageUrl" class="relative h-full">
        <img
          :src="previewImageUrl"
          class="bg-light block h-full w-full rounded-full object-cover"
        />
        <a
          href="#"
          class="text-danger bg-light/30 absolute top-2 left-2 rounded-full text-2xl transition hover:scale-125"
        >
          <icon-ic-round-cancel />
        </a>
      </div>
      <div v-else class="relative h-full">
        <input
          id="image"
          type="file"
          accept="image/*"
          name="image"
          class="hidden"
          @change="changeImage"
        />

        <label
          for="image"
          class="hover:bg-muted/10 hover:border-muted/10 border-primary/50 text-primary/50 flex h-full min-h-36 cursor-pointer items-center justify-center rounded-full border-4 border-dashed font-semibold transition"
        >
          <icon-ic-round-add-circle class="me-4 text-2xl" />
          <span class="text-lg"> 新增頭像 </span>
        </label>
      </div>
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
        rules="nickName|required"
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
