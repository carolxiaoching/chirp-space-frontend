<script setup>
const { isOffcanvasOpen, closeOffcanvas } = useOffcanvas();

const authStore = useAuthStore();
const { isSignedIn, userInfo } = storeToRefs(authStore);
const { logout } = authStore;

const searchText = ref("");

async function search() {
  const keyword = searchText.value.trim();
  if (!keyword) {
    return;
  }

  searchText.value = "";
  closeOffcanvas();

  await navigateTo({
    path: "/",
    query: {
      keyword,
    },
  });
}

onMounted(() => {
  // 來源：https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia

  // 使用 matchMedia 監聽螢幕寬度
  const mediaQuery = window.matchMedia("(min-width: 1280px)");

  // 初始先檢查螢幕寬度，如果大於 1280 px 則關閉 Offcanvas
  if (mediaQuery.matches) {
    closeOffcanvas();
  }

  // 當 >= 1280px 時關閉 Offcanvas
  function handleMediaQuery(event) {
    if (event.matches) {
      closeOffcanvas();
    }
  }

  // 監聽螢幕寬度變化
  mediaQuery.addEventListener("change", handleMediaQuery);

  // 離開頁面時關閉監聽
  onBeforeUnmount(() => {
    mediaQuery.removeEventListener("change", handleMediaQuery);
  });
});
</script>

<template>
  <div class="xl:hidden">
    <transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOffcanvasOpen"
        class="fixed inset-0 z-[990] bg-black/40"
        @click="closeOffcanvas"
      />
    </transition>

    <transition
      enter-active-class="transition-transform duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isOffcanvasOpen"
        class="fixed top-0 right-0 z-[995] flex h-full w-82 flex-col overflow-auto bg-white px-4 py-6 shadow-lg"
      >
        <a
          href="#"
          class="text-muted hover:bg-light mb-4 ml-auto inline-block rounded p-2 text-3xl hover:cursor-pointer"
          @click.prevent="closeOffcanvas"
        >
          <icon-ic-outline-close />
        </a>
        <div class="flex flex-1 flex-col">
          <div class="mb-8 flex items-stretch">
            <input
              v-model="searchText"
              type="text"
              class="peer border-muted placeholder:text-muted focus:border-primary focus:ring-primary flex-1 rounded-s-md bg-white px-3 py-2 focus:outline-none"
              placeholder="關鍵字"
              @keydown.enter="search"
            />
            <a
              href=""
              class="bg-primary hover:bg-primary/80 peer-focus:border-primary peer-focus:ring-primary flex items-center rounded-e-md px-1 text-3xl text-white peer-focus:ring-1"
              @click.prevent="search"
            >
              <icon-ic-round-search />
            </a>
          </div>

          <div v-if="!isSignedIn">
            <NuxtLink
              to="/account/signin"
              class="btn btn-primary mb-4 block"
              @click="closeOffcanvas"
            >
              登入
            </NuxtLink>
            <NuxtLink
              to="/account/signup"
              class="btn btn-light block"
              @click="closeOffcanvas"
            >
              註冊
            </NuxtLink>
          </div>
          <ul v-else class="flex h-full flex-col">
            <li class="mb-8">
              <div class="flex items-center justify-center">
                <img
                  v-if="userInfo?.avatar?.imageUrl"
                  :src="userInfo?.avatar?.imageUrl"
                  class="me-4 block h-12 rounded-full"
                />
                <span v-else class="avatar avatar-default me-4">
                  <icon-ic-round-person />
                </span>
                <p>
                  {{ userInfo?.nickName ? userInfo?.nickName : "匿名啾啾" }}
                </p>
              </div>
            </li>
            <li class="mb-4">
              <NuxtLink
                to="/post-edit/new"
                active-class="bg-primary text-white"
                class="hover:bg-muted bg-light flex items-center justify-center rounded-md p-4 hover:text-white"
                @click="closeOffcanvas"
              >
                <icon-ic-round-add-circle class="me-4 text-2xl" />
                寫啾啾文
              </NuxtLink>
            </li>
            <li class="mb-4">
              <NuxtLink
                :to="`/user/${userInfo?._id}/following`"
                active-class="bg-primary text-white"
                class="hover:bg-muted bg-light flex items-center justify-center rounded-md p-4 hover:text-white"
                @click="closeOffcanvas"
              >
                <icon-ic-round-notifications-active class="me-4 text-2xl" />
                關注啾友
              </NuxtLink>
            </li>
            <li class="mb-4">
              <NuxtLink
                :to="`/user/${userInfo?._id}/likes`"
                active-class="bg-primary text-white"
                class="hover:bg-muted bg-light flex items-center justify-center rounded-md p-4 hover:text-white"
                @click="closeOffcanvas"
              >
                <icon-ic-round-favorite class="me-4 text-2xl" />
                啾啾按讚
              </NuxtLink>
            </li>
            <li class="">
              <NuxtLink
                :to="`/user/${userInfo?._id}/comments`"
                active-class="bg-primary text-white"
                class="hover:bg-muted bg-light flex items-center justify-center rounded-md p-4 hover:text-white"
                @click="closeOffcanvas"
              >
                <icon-ic-round-sms class="me-4 text-2xl" />
                啾啾回應
              </NuxtLink>
            </li>
            <li class="my-6">
              <hr class="text-light" />
            </li>
            <li class="mb-4">
              <NuxtLink
                :to="`/user/${userInfo?._id}`"
                exact-active-class="bg-primary text-white"
                class="hover:bg-muted bg-light flex items-center justify-center rounded-md p-4 hover:text-white"
                @click="closeOffcanvas"
              >
                <icon-ic-round-person class="me-4 text-2xl" />
                個人檔案
              </NuxtLink>
            </li>
            <li class="mb-4">
              <NuxtLink
                to="/setting"
                active-class="bg-primary text-white"
                class="hover:bg-muted bg-light flex items-center justify-center rounded-md p-4 hover:text-white"
                @click="closeOffcanvas"
              >
                <icon-ic-round-settings class="me-4 text-2xl" />
                帳號設定
              </NuxtLink>
            </li>
            <li class="mt-auto">
              <a
                href="#"
                class="hover:bg-muted bg-light flex items-center justify-center rounded-md p-4 hover:text-white"
                @click.prevent="(closeOffcanvas(), logout())"
              >
                <icon-ic-round-logout class="me-2" />
                登出
              </a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped></style>
