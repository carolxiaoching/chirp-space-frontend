/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        muted: "#7c7c7c",
        light: "#f6f6f6",
        danger: "#ef4444",
        warning: "#ffd230",
        success: "#007595",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};
