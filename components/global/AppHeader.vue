<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const { openOffcanvas } = useOffcanvas();
const authStore = useAuthStore();
const { isSignedIn, userInfo } = storeToRefs(authStore);
const { clearAuth } = authStore;

const searchText = ref("");

async function search() {
  const keyword = searchText.value.trim();
  if (!keyword) {
    return;
  }

  searchText.value = "";

  await navigateTo({
    path: "/",
    query: {
      keyword,
    },
  });
}
</script>

<template>
  <header class="border-light fixed inset-x-0 top-0 z-100 border-b bg-white">
    <div class="container mx-auto flex items-center justify-between py-2">
      <NuxtLink to="/" class="block">
        <img src="assets/images/logo.svg" alt="logo" />
      </NuxtLink>

      <div class="relative xl:hidden">
        <a
          href="#"
          class="text-primary hover:bg-light block rounded p-2 text-3xl hover:cursor-pointer"
          @click.prevent="openOffcanvas"
        >
          <icon-ic-round-menu />
        </a>
      </div>

      <div class="hidden items-stretch xl:flex">
        <input
          v-model="searchText"
          type="text"
          class="peer border-muted placeholder:text-muted focus:border-primary focus:ring-primary min-w-80 rounded-s-md bg-white px-3 py-2 focus:outline-none"
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

      <div v-if="!isSignedIn" class="hidden xl:flex">
        <NuxtLink to="/account/signin" class="btn btn-primary me-6 py-2">
          登入
        </NuxtLink>
        <NuxtLink to="/account/signup" class="btn btn-light py-2">
          註冊
        </NuxtLink>
      </div>

      <Menu v-if="isSignedIn" as="div" class="relative hidden xl:block">
        <MenuButton class="flex w-[13.75rem] items-center justify-end">
          <p v-if="userInfo?.nickName" class="text-muted me-4">
            {{ userInfo?.nickName }} 啾啾~
          </p>
          <div
            v-if="userInfo?.avatar?.imageUrl"
            class="group flex cursor-pointer items-center justify-end"
          >
            <img
              :src="userInfo?.avatar?.imageUrl"
              class="block h-12 rounded-full"
            />
            <span class="text-primary group-hover:text-muted text-2xl">
              <icon-ic-round-arrow-drop-down />
            </span>
          </div>
          <div
            v-else
            class="group flex cursor-pointer items-center justify-end"
          >
            <span class="avatar avatar-default">
              <icon-ic-round-person />
            </span>
            <span class="text-primary group-hover:text-muted text-2xl">
              <icon-ic-round-arrow-drop-down />
            </span>
          </div>
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="divide-light absolute right-0 mt-2 w-48 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black/5"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }" as="template">
                <NuxtLink
                  :to="`/user/${userInfo?._id}`"
                  active-class="bg-primary text-white"
                  :class="[
                    active ? 'bg-primary text-white' : 'text-primary',
                    'flex w-full items-center rounded-md px-3 py-2',
                  ]"
                >
                  <icon-ic-round-person class="me-2" />
                  個人檔案
                </NuxtLink>
              </MenuItem>
              <MenuItem v-slot="{ active }" as="template">
                <NuxtLink
                  to="/setting"
                  active-class="bg-primary text-white"
                  :class="[
                    active ? 'bg-primary text-white' : 'text-primary',
                    'flex w-full items-center rounded-md px-3 py-2',
                  ]"
                >
                  <icon-ic-round-settings class="me-2" />
                  帳號設定
                </NuxtLink>
              </MenuItem>
            </div>
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-primary text-white' : 'text-primary',
                    'flex w-full items-center rounded-md px-3 py-2',
                  ]"
                  @click.prevent="clearAuth"
                >
                  <icon-ic-round-logout class="me-2" />
                  登出
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </header>
</template>
