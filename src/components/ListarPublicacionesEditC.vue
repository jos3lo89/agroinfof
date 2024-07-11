<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AxiosUser } from "../service/instance";
import { PublicacionesListAsoc } from "../interfaces/interfaces";
import { Alert } from "../utils/sweetAlert";

const listaPublicaciones = ref<PublicacionesListAsoc[]>([]);

const getListPublicaciones = async () => {
  try {
    const res = await AxiosUser.listarPublicacionesAsoc();

    console.log(res);
    listaPublicaciones.value = res.data;
  } catch (error: any) {
    console.log(error);
  }
};

onMounted(() => {
  getListPublicaciones();
});

const changeStado = async (estado: string, id: string) => {
  try {
    const res = await AxiosUser.cambiarEstadoPublicacion(estado, id);
    if (res.status == 200) {
      getListPublicaciones();
    }
  } catch (error: any) {
    console.log(error);
  }
};

const borrarPubli = async (id: string) => {
  try {
    const confirm = await Alert.confirmar(
      "Borrar publicación",
      "desea borrar la Publicación",
      "warning",
      "confirmar",
    );

    if (confirm) {
      console.log("OK");
      const res = await AxiosUser.borrarPublicacion(id);
      if (res.status == 204) {
        getListPublicaciones();
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
  <div class="text-center my-6">
    <h1 class="text-2xl font-semibold capitalize">Publicaciones</h1>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">titulo</th>
          <th scope="col" class="px-6 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(publi, i) in listaPublicaciones"
          :key="i"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ i + 1 }}
          </th>
          <td class="px-6 py-4">{{ publi.titulo }}</td>
          <td class="px-6 py-4 flex justify-start items-center gap-5">
            <button
              @click="borrarPubli(publi.id)"
              class="text-red-600 dark:text-red-500 hover:underline"
            >
              <svg
                class="w-6 h-6"
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
            </button>
            <button
              v-if="publi.estado == 'privado'"
              @click="changeStado('publico', publi.id)"
              class="text-white bg-blue-500 px-2 py-1 rounded-lg"
            >
              Publicar
            </button>
            <button
              v-if="publi.estado == 'publico'"
              @click="changeStado('privado', publi.id)"
              class="text-white bg-red-500 px-2 py-1 rounded-lg"
            >
              Ocultar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
