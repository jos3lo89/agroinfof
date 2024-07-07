<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AxiosUser } from "../service/instance";
import { ListaAnunciosLista } from "../interfaces/interfaces";
import { Alert } from "../utils/sweetAlert";

const listaAnuncio = ref<ListaAnunciosLista[]>([]);

const getListaAnuncios = async () => {
  try {
    const res = await AxiosUser.listarAnunciosByIdAsoc();
    console.log(res);
    listaAnuncio.value = res.data;
  } catch (error: any) {
    console.log(error);
  }
};

onMounted(() => {
  getListaAnuncios();
});

const handleDeleteAnuncio = async (id: string) => {
  try {
    const confirm = await Alert.confirmar(
      "borrar anuncio",
      "desea borra la anucnio",
      "warning",
      "confirmar",
      "el borrado fue confirmado"
    );

    if (confirm) {
      console.log("OK");
      const res = await AxiosUser.borrarAnuncio(id);
      console.log(res);
      if (res.status == 200) {
        getListaAnuncios();
      }
    } else {
      console.log("FAIL");
    }
  } catch (error: any) {
    console.log(error);
  }
};

const changeStado = async (id: string, estado: string) => {
  try {
    const res = await AxiosUser.cambiarEstadoAnuncio(id, estado);

    if (res.status == 200) {
      getListaAnuncios();
    }
  } catch (error: any) {
    console.log(error);
  }
};
</script>

<template>
  <div class="text-center my-4">
    <h1 class="text-2xl font-semibold capitalize">listar anuncios</h1>
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
          <th scope="col" class="px-6 py-3">estado</th>
          <th scope="col" class="px-6 py-3">fecha creacion</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(anuncio, i) in listaAnuncio"
          :key="i"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ i + 1 }}
          </th>
          <td class="px-6 py-4">{{ anuncio.titulo }}</td>
          <td class="px-6 py-4">{{ anuncio.estado }}</td>
          <td class="px-6 py-4">
            {{ new Date(anuncio.fecha_creacion).toLocaleString() }}
          </td>
          <td class="px-6 py-4 flex justify-start items-center gap-5">
            <button
              @click="handleDeleteAnuncio(anuncio.id)"
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
              class="text-yellow-500 dark:text-yellow-500 hover:underline"
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                ></path>
              </svg>
            </button>
            <button
              v-if="anuncio.estado == 'privado'"
              @click="changeStado(anuncio.id, 'publico')"
              class="text-white bg-blue-500 px-2 py-1 rounded-lg"
            >
              Publicar
            </button>
            <button
              v-if="anuncio.estado == 'publico'"
              @click="changeStado(anuncio.id, 'privado')"
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
