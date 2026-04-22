<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const { closeModal, isModalOpen } = useModal();

const isLoginModalOpen = isModalOpen("login");

function closeLoginModal() {
  closeModal("login");
}
</script>

<template>
  <TransitionRoot appear :show="isLoginModalOpen" as="template">
    <Dialog as="div" class="relative z-[999]" @close="closeLoginModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="relative w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-8 shadow"
            >
              <DialogTitle class="mb-6 flex items-center justify-center">
                <span
                  class="text-warning bg-warning/20 ring-warning/10 me-6 inline-block rounded-full p-2 text-3xl ring-6"
                >
                  <icon-ic-round-warning />
                </span>

                <h2 class="text-xl font-semibold">請先登入啾啾會員</h2>
              </DialogTitle>

              <div class="text-muted mb-8">
                <p class="mb-2 text-center tracking-wide">登入一下吧~</p>
                <p class="text-center tracking-wide">
                  才能使用會員限定的啾啾功能唷！
                </p>
              </div>

              <div class="flex">
                <button
                  type="button"
                  class="btn btn-light me-6 w-full"
                  @click="closeLoginModal"
                >
                  等等再說
                </button>
                <NuxtLink
                  to="/account/signin"
                  class="btn btn-primary w-full"
                  @click="closeLoginModal"
                >
                  馬上登入
                </NuxtLink>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
