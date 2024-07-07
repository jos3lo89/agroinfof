<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { AxiosUser } from "../../service/instance";
import { onMounted, ref } from "vue";
import {
  AsocListaI,
  asocViewI,
  ListaDePublicaiconesView,
} from "../../interfaces/interfaces";
import PublicacionesC from "../../components/PublicacionesC.vue";

const router = useRouter();
const route = useRoute();

const asocLista = ref<AsocListaI[]>([]);
const asocData = ref({} as asocViewI);

const listaPublicaicones = ref<ListaDePublicaiconesView[]>([]);

const getListaAsoc = async () => {
  const res = await AxiosUser.listarAsoc();
  asocLista.value = res.data;

  const nombre = route.params.nombre;
  const exists = asocLista.value.some((item) => item.nombre === nombre);

  if (!exists) {
    router.push({ name: "inicio" });
  } else {
    const res2 = await AxiosUser.getasocByname(route.params.nombre as string);
    asocData.value = res2.data;
    // console.log(res2);
  }
};

const getLisPublicaciones = async () => {
  try {
    const res = await AxiosUser.listarPublicaciones(
      route.params.nombre as string
    );
    console.log(res);

    listaPublicaicones.value = res.data;
  } catch (error: any) {
    console.log(error);
  }
};

const numeroMiembrosAsoc = ref<number | null>(null);

const getNumberMiembrosASoc = async (nombre: string) => {
  try {
    const res = await AxiosUser.numeroDeMiembrosAsoc(nombre);
    console.log(res);

    numeroMiembrosAsoc.value = res.data.numeroDeMiembros;
  } catch (error: any) {
    console.log(error);
  }
};

onMounted(() => {
  getListaAsoc();
  getLisPublicaciones();
  getNumberMiembrosASoc(route.params.nombre as string);
});

const idPubliDinamico = ref("");

const changeDinamicId = (id: string) => {
  idPubliDinamico.value = id;
};
</script>

<template>
  <div class="flex justify-start items-center p-2 mt-2 gap-4 py-3 pl-6">
    <button
      @click="router.push({ name: 'inicio' })"
      class="border-2 border-gray-400 border-solid rounded-lg px-2 py-1 hover:bg-indigo-600 hover:border-indigo-600"
    >
      Volver al inicio
    </button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mx-6">
    <div class="">
      <img
        :src="asocData.foto"
        alt="portada de la asociacion"
        class="rounded-lg"
      />
    </div>
    <div class="">
      <h3
        class="text-center capitalize text-2xl font-semibold my-2 line-clamp-2"
      >
        {{ asocData.nombre }}
      </h3>
      <p class="p-4 break-all line-clamp-4">
        {{ asocData.descripcion }}
      </p>

      <div class="grid grid-cols-3 gap-3 p-3">
        <div
          class="w-full p-4 bg-white text-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex justify-center items-center">
            <svg
              class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
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
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              ></path>
            </svg>
          </div>

          <a :href="`mailto:${asocData.correo}`">
            <h5
              class="mb-2 font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Contactanos por correo
            </h5>
          </a>
        </div>

        <div
          class="w-full p-4 bg-white text-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex justify-center items-center">
            <svg
              class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
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
          </div>

          <button>
            <h5
              class="mb-2 cursor-default font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Miembros {{ numeroMiembrosAsoc ? numeroMiembrosAsoc : "" }}
            </h5>
          </button>
        </div>

        <div
          class="w-full p-4 bg-white text-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex justify-center items-center">
            <svg
              class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
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
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
              ></path>
            </svg>
          </div>

          <button @click="router.push({ name: 'anuncios' })">
            <h5
              class="mb-2 font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Ver todos los anuncios
            </h5>
          </button>
        </div>
      </div>
    </div>
  </div>

  <nav class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 px-10 py-6">
    <div v-for="(publicacion, i) in listaPublicaicones" :key="i">
      <button
        @click="changeDinamicId(publicacion.id)"
        class="p-6 w-full h-36 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2"
        >
          {{ publicacion.titulo }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
          {{ publicacion.texto_uno }}
        </p>
      </button>
    </div>
  </nav>

  <section>
    <PublicacionesC :idPubliDinamico="idPubliDinamico" />
  </section>
</template>

<style scoped></style>
