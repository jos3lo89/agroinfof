<script setup lang="ts">
import { ref, defineAsyncComponent, shallowRef } from "vue";
import DarkMode from "../../components/common/DarkMode.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../context/auth.store";
import EliminarUserC from "../../components/EliminarUserC.vue";
import { AxiosUser } from "../../service/instance";
import { Alert } from "../../utils/sweetAlert";

const authStore = useAuthStore();
const router = useRouter();

const AdminDeleteUser = defineAsyncComponent(
  () => import("../../components/EliminarUserC.vue")
);

const RegistrarAsoc = defineAsyncComponent(
  () => import("../../components/RegistrarAsocC.vue")
);

const layoutAdmin = shallowRef(AdminDeleteUser);

const cambiarLayoutAdmin = (cmp: any) => (layoutAdmin.value = cmp);

const openAside = ref(false);
const openPerfil = ref(false);

const handleClick = () => {
  openAside.value = !openAside.value;
};

const handleClick2 = () => {
  openPerfil.value = !openPerfil.value;
};

const visibleSections = ref<{ [key: string]: boolean }>({});

const toggleSection = (section: string) => {
  visibleSections.value[section] = !visibleSections.value[section];
};

const isSectionVisible = (section: string) => {
  return visibleSections.value[section];
};

const logOut = async () => {
  try {
    // wqerk
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
    // wqerk

    // const res = await AxiosUser.logout();

    // console.log(res);

    // authStore.accessToken = false;
    // authStore.rol = "visitante";
    // authStore.usuario.nombre = "";
    // authStore.usuario.foto = null;
    // authStore.usuario.id = "";
    // authStore.usuario.correo = "";

    // router.push({ name: "inicio" });
  } catch (error: any) {
    console.log(error);
  }
};
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            @click="handleClick"
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <!-- <span class="sr-only">Open sidebar</span> -->
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <button
            @click="router.push({ name: 'inicio' })"
            class="flex ms-2 md:me-24"
          >
            <img
              src="http://localhost:3000/uploads/logoAgroInfo.webp"
              class="h-8 me-3"
              alt="Logo de AgroInfo"
            />
            <span
              class="self-center text-green-600 text-xl font-semibold sm:text-2xl whitespace-nowrap"
              >Agro<span class="text-orange-600">Info</span></span
            >
          </button>
        </div>

        <div class="flex items-center">
          <div class="flex items-center ms-3">
            <div class="flex items-center gap-4">
              <button
                @click="handleClick2"
                type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <svg
                  v-if="authStore.usuario.foto == null"
                  class="w-8 h-8"
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
                  v-else
                  class="w-8 h-8 rounded-full"
                  :src="authStore.usuario.foto"
                  alt="user photo"
                />
              </button>
              <DarkMode />
            </div>
            <div
              v-if="openPerfil"
              class="z-50 absolute top-16 right-4 shadow-2xl p-4 rounded-lg bg-white dark:bg-gray-800"
            >
              <div class="px-4 py-3" role="none">
                <p
                  class="text-sm text-gray-900 dark:text-white my-2"
                  role="none"
                >
                  {{ authStore.usuario.nombre }}
                </p>
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  {{ authStore.usuario.correo }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <button
                    @click="router.push({ name: 'perfil' })"
                    class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 dark:text-gray-300 dark:hover:bg-blue-600 dark:hover:text-white"
                  >
                    Mi perfil
                  </button>
                </li>
                <li>
                  <button
                    @click="logOut"
                    class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-200 dark:text-gray-300 dark:hover:bg-red-600 dark:hover:text-white"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside
    id="logo-sidebar"
    :class="
      openAside
        ? 'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'
        : 'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
    "
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <button
            @click="toggleSection('usuarios')"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              class="w-5 h-5 mr-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              data-slot="icon"
              data-darkreader-inline-stroke=""
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              ></path>
            </svg>
            <span>Usuarios</span>
          </button>

          <div
            v-if="isSectionVisible('usuarios')"
            class="bg-gray-300 dark:bg-gray-900 p-3 rounded-lg my-1"
          >
            <button
              @click="cambiarLayoutAdmin(EliminarUserC)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                data-slot="icon"
                data-darkreader-inline-stroke=""
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
              <span class="ms-3">Listar usuarios</span>
            </button>
          </div>
        </li>

        <li>
          <button
            @click="toggleSection('asociacion')"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              class="flex-shrink-0 w-5 h-5 mr-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              data-slot="icon"
              data-darkreader-inline-stroke=""
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              ></path>
            </svg>
            <span>Asociación</span>
          </button>

          <div
            v-if="isSectionVisible('asociacion')"
            class="bg-gray-300 dark:bg-gray-900 p-3 rounded-lg my-1"
          >
            <button
              @click="cambiarLayoutAdmin(RegistrarAsoc)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                data-slot="icon"
                data-darkreader-inline-stroke=""
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                ></path>
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap"
                >Registrar asociación</span
              >
            </button>
          </div>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">
    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="">
        <component :is="layoutAdmin"></component>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
