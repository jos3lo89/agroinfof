<script setup lang="ts">
import { ref, defineAsyncComponent, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../context/auth.store";
import DarkMode from "../../components/common/DarkMode.vue";
import { AxiosUser } from "../../service/instance";
import { Alert } from "../../utils/sweetAlert";

const visibleSections = ref<{ [key: string]: boolean }>({});

const toggleSection = (section: string) => {
  visibleSections.value[section] = !visibleSections.value[section];
};

const isSectionVisible = (section: string) => {
  return visibleSections.value[section];
};

const AsocInformacion = defineAsyncComponent(
  () => import("../../components/AsocInformacionC.vue")
);
const AsocEditInfo = defineAsyncComponent(
  () => import("../../components/AsocEditInfoC.vue")
);

const RegistrarAnuncio = defineAsyncComponent(
  () => import("../../components/RegistrarAnunciosC.vue")
);

const ListarAnuncios = defineAsyncComponent(
  () => import("../../components/ListarAnunciosC.vue")
);
const RegistrarPublicaciones = defineAsyncComponent(
  () => import("../../components/RegistraPublicaC.vue")
);

const ListarPublicaciones = defineAsyncComponent(
  () => import("../../components/ListarPublicacionesEditC.vue")
);

const RegistrarMiembros = defineAsyncComponent(
  () => import("../../components/RegistrarMiembrosC.vue")
);

const ListarMiembros = defineAsyncComponent(
  () => import("../../components/ListarMiembrosC.vue")
);

const RegistrarReunion = defineAsyncComponent(
  () => import("../../components/RegistrarReunionC.vue")
);

const ListaReuniones = defineAsyncComponent(
  () => import("../../components/ListaReunionesC.vue")
);

const LlamarLista = defineAsyncComponent(
  () => import("../../components/LlamarListaReuC.vue")
);

const layoutAsoc = shallowRef(AsocInformacion);

const cambiarLayoutAsoc = (cmp: any) => (layoutAsoc.value = cmp);

const router = useRouter();
const authStore = useAuthStore();

const openAside = ref(false);
const openPerfil = ref(false);

const handleClick = () => {
  openAside.value = !openAside.value;
};

const handleClick2 = () => {
  openPerfil.value = !openPerfil.value;
};

const logOut = async () => {
  openPerfil.value = !openPerfil.value;

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
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              class="w-6 h-6"
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
                <p class="text-sm text-gray-900 dark:text-white" role="none">
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
                    role="menuitem"
                  >
                    Perfil
                  </button>
                </li>
                <li>
                  <button
                    @click="logOut"
                    class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-200 dark:text-gray-300 dark:hover:bg-red-600 dark:hover:text-white"
                    role="menuitem"
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
    :class="
      openAside
        ? 'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'
        : 'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
    "
    aria-label="Sidebar"
  >
    <div
      class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 asideBarClassWadafa"
    >
      <ul class="space-y-2 font-medium">
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
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              ></path>
            </svg>
            <span>asociacion</span>
          </button>
          <div
            v-if="isSectionVisible('asociacion')"
            class="bg-gray-300 dark:bg-gray-900 p-3 rounded-lg my-1"
          >
            <button
              @click="cambiarLayoutAsoc(AsocInformacion)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="ms-3">Información</span>
            </button>
            <!-- <button
              @click="cambiarLayoutAsoc(AsocEditInfo)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap"
                >Editar informacion</span
              >
            </button> -->
          </div>
        </li>
        <li>
          <button
            @click="toggleSection('anuncios')"
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
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              ></path>
            </svg>
            <span>anuncios</span>
          </button>
          <div
            v-if="isSectionVisible('anuncios')"
            class="bg-gray-300 dark:bg-gray-900 p-3 rounded-lg my-1"
          >
            <button
              @click="cambiarLayoutAsoc(RegistrarAnuncio)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap"
                >Registrar Anuncios</span
              >
            </button>

            <button
              @click="cambiarLayoutAsoc(ListarAnuncios)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap">Listar anuncios</span>
            </button>
          </div>
        </li>
        <li>
          <button
            @click="toggleSection('pulicaciones')"
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
                d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
              ></path>
            </svg>
            <span>Publicaciones</span>
          </button>
          <div
            v-if="isSectionVisible('pulicaciones')"
            class="bg-gray-300 dark:bg-gray-900 p-3 rounded-lg my-1"
          >
            <button
              @click="cambiarLayoutAsoc(RegistrarPublicaciones)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap"
                >Registrar publicaciones</span
              >
            </button>
            <button
              @click="cambiarLayoutAsoc(ListarPublicaciones)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap"
                >Lista de publicaciones</span
              >
            </button>
          </div>
        </li>

        <li>
          <button
            @click="toggleSection('miembros')"
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
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              ></path>
            </svg>
            <span>Miembros</span>
          </button>
          <div
            v-if="isSectionVisible('miembros')"
            class="bg-gray-300 dark:bg-gray-900 p-3 rounded-lg my-1"
          >
            <button
              @click="cambiarLayoutAsoc(RegistrarMiembros)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap"
                >Registrar miembros</span
              >
            </button>
            <button
              @click="cambiarLayoutAsoc(ListarMiembros)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap"
                >Lista de miembros</span
              >
            </button>
          </div>
        </li>

        <li>
          <button
            @click="toggleSection('reuniones')"
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
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              ></path>
            </svg>
            <span>Reuniones</span>
          </button>
          <div
            v-if="isSectionVisible('reuniones')"
            class="bg-gray-300 dark:bg-gray-900 p-3 rounded-lg my-1"
          >
            <button
              @click="cambiarLayoutAsoc(RegistrarReunion)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap"
                >Registrar Reunión</span
              >
            </button>
            <button
              @click="cambiarLayoutAsoc(ListaReuniones)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap">Lista Reunión</span>
            </button>
            <button
              @click="cambiarLayoutAsoc(LlamarLista)"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 whitespace-nowrap">Llamar lista</span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <div class="">
        <component :is="layoutAsoc" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.asideBarClassWadafa::-webkit-scrollbar {
  background-color: #374151;
  width: 10px;
}

.asideBarClassWadafa::-webkit-scrollbar-thumb {
  background-color: #6b7280;
}
</style>
