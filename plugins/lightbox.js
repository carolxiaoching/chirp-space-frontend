import VueEasyLightbox from "vue-easy-lightbox/external-css";
import "vue-easy-lightbox/external-css/vue-easy-lightbox.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VueEasyLightbox", VueEasyLightbox);
});
