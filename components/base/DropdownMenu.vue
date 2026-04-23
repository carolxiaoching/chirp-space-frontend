<template>
  <Popover v-slot="{ open }">
    <PopoverButton
      :class="{ 'bg-muted/10': open }"
      class="text-muted/80 hover:bg-muted/10 -me-2 -mt-2 cursor-pointer rounded-full p-2 text-4xl transition outline-none"
    >
      <icon-ic-round-more-horiz />
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute top-12 right-0 z-[800] transform">
        <ul class="overflow-hidden rounded-lg bg-white p-2 shadow">
          <slot />
        </ul>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
</script>
