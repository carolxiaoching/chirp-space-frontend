<script setup>
import { authAPI } from "@/apis/auth";

const { apiSignUp } = authAPI();
const { openLoading, closeLoading } = useLoading();
const { pushToast } = useToastStore();
const { setAuth } = useAuthStore();

const formRef = ref(null);
const errorMsg = ref("");
const userData = ref({
  email: "",
  password: "",
  confirmPassword: "",
  nickName: "",
});

// 註冊
async function signup() {
  openLoading();

  try {
    const data = await apiSignUp(userData.value);
    const { user, token } = data.data;

    setAuth(user);

    const auth = useCookie("auth", {
      path: "/",
      // 期限為一天
      maxAge: 60 * 60 * 24,
    });
    auth.value = token;

    // 重置表單
    formRef.value.resetForm();

    // 跳轉首頁
    await navigateTo("/");

    pushToast({
      message: "註冊成功",
      status: "success",
    });
  } catch (err) {
    errorMsg.value = err.response?._data?.message || "註冊失敗";

    pushToast({
      message: "註冊失敗",
      status: "danger",
    });
  } finally {
    closeLoading();
  }
}
</script>

<template>
  <VForm
    v-slot="{ errors, meta }"
    ref="formRef"
    class="w-full max-w-xl bg-white px-4 sm:px-6 lg:px-8"
    @submit="signup"
  >
    <h1 class="mb-4 text-center text-2xl font-bold">註冊</h1>
    <p class="text-muted mb-11 text-center">
      歡迎來到啾啾的世界，一起分享生活點滴吧 ~
    </p>
    <p v-if="errorMsg" class="alert alert-danger mb-11">
      <icon-ic-round-warning class="me-4 text-2xl" />

      {{ errorMsg }}
    </p>
    <div class="mb-4">
      <label for="email" class="form-label">
        <span class="text-danger">*</span>
        電子信箱：
      </label>
      <VField
        id="email"
        v-model="userData.email"
        type="email"
        name="電子信箱"
        class="form-control"
        :class="{
          'border-danger border-2': errors['電子信箱'],
        }"
        placeholder="請輸入電子信箱"
        rules="email|required"
        required
      />
      <ErrorMessage name="電子信箱" class="text-danger mt-1 block" />
    </div>

    <div class="mb-4">
      <label for="nickName" class="form-label">
        <span class="text-danger">*</span>
        暱稱：
      </label>
      <VField
        id="nickName"
        v-model="userData.nickName"
        type="text"
        name="暱稱"
        class="form-control"
        :class="{
          'border-danger border-2': errors['暱稱'],
        }"
        placeholder="請輸入暱稱"
        rules="nickName|required"
        required
        autocomplete="username"
      />
      <ErrorMessage name="暱稱" class="text-danger mt-1 block" />
    </div>
    <div class="mb-4">
      <label for="password" class="form-label">
        <span class="text-danger">*</span>
        密碼：
      </label>

      <VField
        id="password"
        v-model="userData.password"
        type="password"
        name="密碼"
        class="form-control"
        :class="{
          'border-danger border-2': errors['密碼'],
        }"
        placeholder="請輸入密碼"
        rules="password|required"
        required
        autocomplete="new-password"
      />
      <ErrorMessage name="密碼" class="text-danger" />
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
        rules="confirmed:@密碼|required"
        required
        autocomplete="new-password"
      />
      <ErrorMessage name="確認密碼" class="text-danger" />
    </div>
    <div class="mb-11 text-center">
      <button
        type="submit"
        class="btn btn-primary px-32"
        :class="{ disabled: !meta.valid }"
        :disabled="!meta.valid"
      >
        立即註冊
      </button>
    </div>
    <p class="text-end text-sm">
      已經有帳號了？
      <NuxtLink to="/account/signin" class="underline underline-offset-2">
        立即登入
      </NuxtLink>
    </p>
  </VForm>
</template>

<style scoped></style>
