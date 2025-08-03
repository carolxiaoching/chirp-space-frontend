import { defineRule, configure } from "vee-validate";
import { all } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTw from "@vee-validate/i18n/dist/locale/zh_TW.json";

export default defineNuxtPlugin(() => {
  Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule);
  });

  defineRule("nickName", (value) => {
    const isInvalid = !/^[a-zA-Z0-9_]{2,10}$/i.test(value);
    if (isInvalid) {
      return "使用者暱稱只能包含字母、數字或底線，且長度需為 2 至 10 個字元";
    }
    return true;
  });

  defineRule("password", (value) => {
    const isInvalid = !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(value);
    if (value.length < 8 || isInvalid) {
      return "密碼需至少 8 碼以上，且必需包含英文字母與數字";
    }
    return true;
  });

  configure({
    generateMessage: localize({
      // 載入繁體中文語系
      zh_TW: zhTw,
    }),
    // 即時驗證
    validateOnInput: true,
  });

  // 語言為繁體中文
  setLocale("zh_TW");
});
