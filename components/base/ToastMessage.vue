<script setup>
const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);
const { clearToast } = toastStore;
</script>

<template>
  <TransitionGroup
    tag="ul"
    name="toast"
    class="fixed top-4 left-1/2 z-[990] flex w-80 -translate-x-1/2 flex-col gap-3 xl:right-4 xl:left-auto xl:translate-x-0"
  >
    <li
      v-for="toast in toasts"
      :key="toast.id"
      :class="{
        'bg-success': toast.status === 'success',
        'bg-danger': toast.status === 'danger',
        'bg-warning': toast.status === 'warning',
      }"
      class="border-light flex items-center justify-between rounded-md p-3 text-white shadow"
    >
      <p class="text-semibold text-sm">
        {{ toast.message }}
      </p>
      <a
        href="#"
        class="hover:bg-light/20 rounded-full text-2xl"
        @click.prevent="clearToast(toast.id)"
      >
        <icon-ic-round-close />
      </a>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.8s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
