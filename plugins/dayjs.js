import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/zh-tw";

dayjs.extend(weekday);
dayjs.locale("zh-tw");

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("dateTime", {
    mounted(el, binding) {
      const time = dayjs(binding.value).format("YYYY 年 MM 月 DD 日 dddd");
      el.innerHTML = time;
    },
  });
});
