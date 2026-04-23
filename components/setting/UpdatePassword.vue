<script setup>
import { authAPI } from "@/apis/auth";

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);
const formRef = ref(null);
const errorMsg = ref("");
const userData = ref({
  password: "",
  confirmPassword: "",
});

const { apiUpdatePassword } = authAPI();
const { openLoading, closeLoading } = useLoading();
const { pushToast } = useToastStore();

async function updatePassword() {
  openLoading();

  try {
    errorMsg.value = "";
    await apiUpdatePassword(userData.value);

    // 重置表單
    formRef.value.resetForm();

    pushToast({
      message: "更新密碼成功，下次請使用新密碼登入",
      status: "success",
    });
  } catch (err) {
    errorMsg.value = err.response?._data?.message || "更新密碼失敗";

    pushToast({
      message: "更新密碼失敗",
      status: "danger",
    });
  } finally {
    closeLoading();
  }
}
</script>

<template>
  <div>
    <VForm
      v-slot="{ errors, meta }"
      ref="formRef"
      class="mx-auto lg:max-w-3/4"
      @submit="updatePassword"
    >
      <p v-if="errorMsg" class="alert alert-danger mb-8">
        <icon-ic-round-warning class="me-4 text-2xl" />

        {{ errorMsg }}
      </p>

      <div class="mb-4">
        <label for="password" class="form-label">
          <span class="text-danger">*</span>
          新密碼：
        </label>

        <!-- 避免瀏覽器警告：Password forms 需有 username 欄位 -->
        <input
          type="text"
          name="username"
          :value="userInfo?.email"
          autocomplete="username"
          hidden
        />

        <VField
          id="password"
          v-model="userData.password"
          type="password"
          name="新密碼"
          class="form-control"
          :class="{
            'border-danger border-2': errors['新密碼'],
          }"
          placeholder="請輸入新密碼"
          rules="password|required"
          required
          autocomplete="new-password"
        />
        <ErrorMessage name="新密碼" class="text-danger" />
      </div>

      <div class="mb-11">
        <label for="confirmPassword" class="form-label">
          <span class="text-danger">*</span>
          確認密碼：
        </label>

        <VField
          id="confirmPassword"
          v-model="userData.confirmPassword"
          type="password"
          name="確認密碼"
          class="form-control"
          :class="{
            'border-danger border-2': errors['確認密碼'],
          }"
          placeholder="請輸入確認密碼"
          rules="confirmed:@新密碼|required"
          required
          autocomplete="new-password"
        />
        <ErrorMessage name="確認密碼" class="text-danger" />
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary px-12 xl:px-32"
          :class="{ disabled: !meta.valid }"
          :disabled="!meta.valid"
        >
          更新密碼
        </button>
      </div>
    </VForm>
  </div>
</template>
