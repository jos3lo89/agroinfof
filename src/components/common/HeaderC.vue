<script setup lang="ts">
import { ref } from "vue";
import DarkMode from "./DarkMode.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../context/auth.store";
import { AxiosUser } from "../../service/instance";
import { Alert } from "../../utils/sweetAlert";

const authStore = useAuthStore();

const router = useRouter();

const openMenu = ref(false);

const imagenes = [
  {
    src: "user.webp",
    alt: "foto de usuario no registrado",
  },
  {
    src: "http://localhost:3000/uploads/logoAgroInfo.webp",
    alt: "Logo de AgroInfo",
  },
];

const logout = async () => {
  openMenu.value = !openMenu.value;
  try {
    const confirm = await Alert.confirmar(
      "Cerrar sesión",
      "Desea cerrar la sesión?",
      "warning",
      "Cerrar Sesión"
    );

    if (confirm) {
      console.log("OK");

      const res = await AxiosUser.logout();

      authStore.accessToken = false;
      authStore.rol = "visitante";
      authStore.usuario.nombre = "";
      authStore.usuario.foto = null;
      authStore.usuario.id = "";
      authStore.usuario.correo = "";

      // const rutaActula = route.name as string;
      router.push({ name: "inicio" });
      if (res.status == 204) {
      }
    } else {
      console.log("FAIL");
    }

    // await AxiosUser.logout();

    // authStore.accessToken = false;
    // authStore.rol = "visitante";
    // authStore.usuario.nombre = "";
    // authStore.usuario.foto = null;

    // // const rutaActula = route.name as string;
    // router.push({ name: "inicio" });
  } catch (error) {
    console.log(error);
  }
};

const pusher = (name: string) => {
  openMenu.value = !openMenu.value;
  router.push({ name });
};
</script>

<template>
  <header>
    <div class="flex items-center justify-around shadow-lg pb-2">
      <div
        class="text-center px-3 flex items-center justify-center flex-col pt-2"
      >
        <img
          @click="router.push({ name: 'inicio' })"
          :src="imagenes[1].src"
          :alt="imagenes[1].alt"
          class="w-14 h-14 cursor-pointer"
        />
        <h1 class="text-green-600 font-medium text-lg cursor-default">
          Agro<span class="text-yellow-600">Info</span>
        </h1>
      </div>
      <!-- aqui puede ir un brase de texto -->
      <div class="text-center px-3 flex items-center justify-center relative">
        <div class="mx-3">
          <p class="cursor-default">{{ authStore.usuario.nombre }}</p>
        </div>
        <div
          class="w-11 h-1w-11 overflow-hidden rounded-full cursor-pointer p-1 ring-2 ring-gray-300"
        >
          <svg
            v-if="authStore.usuario.foto == null"
            @click="openMenu = !openMenu"
            class=""
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <img
            @click="openMenu = !openMenu"
            :src="authStore.usuario.foto"
            v-else
          />
        </div>
        <div
          v-if="openMenu"
          class="absolute top-16 shadow-2xl p-4 rounded-lg z-10 bg-slate-200 dark:bg-slate-800"
        >
          <ul>
            <li>
              <button
                v-if="!authStore.accessToken"
                @click="pusher('login')"
                class="bg-blue-600 px-2 py-1 rounded-lg my-1 text-white"
              >
                Inicar Sesion
              </button>
            </li>
            <li v-if="authStore.accessToken">
              <button
                @click="pusher('perfil')"
                class="bg-green-600 px-2 py-1 rounded-lg my-1 text-white"
              >
                Mi Perfil
              </button>
            </li>
            <li v-if="authStore.rol == 'admin'">
              <button
                @click="pusher('admin')"
                class="bg-sky-600 px-2 py-1 rounded-lg my-1 text-white capitalize"
              >
                panel de control
              </button>
            </li>
            <li v-if="authStore.rol == 'admin_asoc'">
              <button
                @click="pusher('admin-asociacion')"
                class="bg-amber-600 px-2 py-1 rounded-lg my-1 text-white capitalize"
              >
                panel de control
              </button>
            </li>
            <li v-if="authStore.accessToken">
              <button
                @click="logout"
                class="bg-red-600 px-2 py-1 rounded-lg my-1 text-white"
              >
                Cerar Sesion
              </button>
            </li>
          </ul>
        </div>
        <div class="ml-3">
          <DarkMode />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
