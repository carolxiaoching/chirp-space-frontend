<script setup>
definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "啾啾設定 | 啾啾",
});

const route = useRoute();

const tab = ref("account");

// 切換時寫入 URL
function switchTab(value) {
  tab.value = value;
  navigateTo({ path: "/setting", query: { tab: value } }, { replace: true });
}

onMounted(() => {
  if (route.query?.tab) {
    tab.value = route.query?.tab;
  }
});
</script>

<template>
  <div>
    <div class="bg-light relative mb-4 rounded-md p-8">
      <h1 class="mb-8 text-center text-2xl font-semibold">帳號設定</h1>

      <nav class="bg-muted/10 flex gap-3 rounded-md p-1 text-center">
        <a
          :class="[
            'w-full cursor-pointer rounded-md py-2 text-sm font-semibold',
            tab === 'account' ? 'bg-white' : 'text-muted hover:bg-light',
          ]"
          href="#"
          @click.prevent="switchTab('account')"
        >
          個人資料
        </a>
        <a
          :class="[
            'w-full cursor-pointer rounded-md py-2 text-sm font-semibold',
            tab === 'updatePassword' ? 'bg-white' : 'text-muted hover:bg-light',
          ]"
          href="#"
          @click.prevent="switchTab('updatePassword')"
        >
          更新密碼
        </a>
      </nav>

      <div class="absolute top-6 right-8 text-5xl text-gray-200">
        <icon-game-icons-musical-notes />
      </div>
    </div>

    <ul>
      <li v-if="tab === 'account'" class="bg-light relative rounded-md p-8">
        <SettingUpdateAccount />
      </li>
      <li
        v-if="tab === 'updatePassword'"
        class="bg-light relative rounded-md p-8"
      >
        <SettingUpdatePassword />
      </li>
    </ul>
  </div>
</template>
