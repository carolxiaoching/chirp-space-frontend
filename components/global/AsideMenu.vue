<script setup>
const userInfo = ref({
  _id: "",
  nickName: "",
  avatar: {
    imageUrl: "",
  },
});

const isSignedIn = ref(false);
</script>

<template>
  <div
    class="bg-light sticky top-[65px] hidden min-w-[20rem] self-start rounded-md px-8 py-8 xl:block"
  >
    <div v-if="!isSignedIn || !userInfo?._id">
      <h2 class="mb-4 text-2xl">請先登入或註冊</h2>
      <p class="text-muted mb-8">啾友們正在熱烈分享中~ 快加入你的聲音吧！</p>
      <a href="#" class="btn btn-primary mb-4 block py-3"> 登入啾啾 </a>
      <a href="#" class="btn btn-light block py-3"> 註冊啾啾 </a>
    </div>
    <div v-else>
      <NuxtLink
        to="/post-edit/new"
        class="btn btn-primary mb-8 flex items-center justify-center py-3"
      >
        <icon-ic-round-add-circle class="me-4 text-2xl" />
        <span> 寫啾啾文 </span>
      </NuxtLink>
      <NuxtLink
        :to="`/user/${userInfo?._id}`"
        class="group mb-6 flex items-center"
      >
        <img
          v-if="userInfo?.avatar?.imageUrl"
          :src="userInfo?.avatar?.imageUrl"
          class="avatar me-4"
        />
        <span v-else class="avatar avatar-default me-4">
          <icon-ic-round-person />
        </span>
        <span class="underline-offset-2 group-hover:underline">
          {{ userInfo?.nickName }}
        </span>
      </NuxtLink>
      <NuxtLink
        :to="`/user/${userInfo?._id}/following`"
        class="group mb-6 flex items-center"
      >
        <span
          class="bg-warning/50 group-hover:bg-warning/80 border-warning/50 me-4 flex size-12 items-center justify-center rounded-full border text-3xl text-white"
        >
          <icon-ic-round-notifications-active class="stroke-warning/50" />
        </span>
        <span class="underline-offset-2 group-hover:underline"> 關注啾友 </span>
      </NuxtLink>
      <NuxtLink
        :to="`/user/${userInfo?._id}/likes`"
        class="group mb-6 flex items-center"
      >
        <span
          class="group-hover:bg-danger/80 bg-danger/50 border-danger/50 me-4 flex size-12 items-center justify-center rounded-full border text-3xl text-white"
        >
          <icon-ic-round-favorite class="stroke-danger/50" />
        </span>
        <span class="underline-offset-2 group-hover:underline"> 啾啾按讚 </span>
      </NuxtLink>
      <NuxtLink
        :to="`/user/${userInfo?._id}/comments`"
        class="group flex items-center"
      >
        <span
          class="bg-primary/50 group-hover:bg-primary/80 border-primary/50 me-4 flex size-12 items-center justify-center rounded-full border text-3xl text-white"
        >
          <icon-ic-round-sms class="stroke-primary/50" />
        </span>
        <span class="underline-offset-2 group-hover:underline"> 啾啾回應 </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
