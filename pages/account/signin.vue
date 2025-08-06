<script setup>
import { authAPI } from "@/apis/auth";

definePageMeta({
  middleware: "guest",
});

useSeoMeta({
  title: "登入啾啾 | 啾啾",
});

const { apiSignIn } = authAPI();
const { openLoading, closeLoading } = useLoading();
const { pushToast } = useToastStore();
const { setAuth } = useAuthStore();

const formRef = ref(null);
const errorMsg = ref("");
const userData = ref({
  email: "",
  password: "",
});

// 登入
async function signin() {
  openLoading();

  try {
    const data = await apiSignIn(userData.value);

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
      message: "登入成功",
      status: "success",
    });
  } catch (err) {
    errorMsg.value = err.response?._data?.message || "登入失敗";

    pushToast({
      message: "登入失敗",
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
    @submit="signin"
  >
    <h1 class="mb-4 text-center text-2xl font-bold">登入</h1>
    <p class="text-muted mb-11 text-center">
      快進入啾啾的世界，一起分享生活點滴吧 ~
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
        autocomplete="username"
      />
      <ErrorMessage name="電子信箱" class="text-danger mt-1 block" />
    </div>

    <div class="mb-11">
      <div class="flex items-end justify-between">
        <label for="password" class="form-label">
          <span class="text-danger">*</span>
          密碼：
        </label>
        <a href="#" class="mb-3 text-sm underline-offset-2 hover:underline">
          忘記密碼？
        </a>
      </div>

      <VField
        id="password"
        v-model="userData.password"
        type="password"
        name="密碼"
        class="form-control"
        :class="{
          'border-danger': errors['密碼'],
        }"
        placeholder="請輸入密碼"
        rules="password|required"
        required
        autocomplete="current-password"
      />
      <ErrorMessage name="密碼" class="text-danger" />
    </div>
    <div class="mb-11 text-center">
      <button
        type="submit"
        class="btn btn-primary px-32"
        :class="{ disabled: !meta.valid }"
        :disabled="!meta.valid"
      >
        立即登入
      </button>
    </div>
    <p class="text-end text-sm">
      還未註冊會員？
      <NuxtLink to="/account/signup" class="underline underline-offset-2">
        立即註冊
      </NuxtLink>
    </p>
  </VForm>
</template>

<style scoped></style>
