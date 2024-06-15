import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { authUserI } from "../interfaces/interfaces";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const accessToken = ref(false);
    const rol = ref("");
    const usuario = reactive({} as authUserI);

    return {
      accessToken,
      rol,
      usuario,
    };
  },
  { persist: true }
);
