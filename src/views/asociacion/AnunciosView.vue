<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { AxiosUser } from "../../service/instance";
import { onMounted, ref } from "vue";
import { AnunciosViewLista } from "../../interfaces/interfaces";

const router = useRouter();

const route = useRoute();

const params = route.params.nombre ? (route.params.nombre as string) : "";

console.log(params);

const listaAnuncios = ref<AnunciosViewLista[]>([]);

const getAnunciosList = async () => {
  try {
    const res = await AxiosUser.listarAnuncioByNombreAsoc(params);
    console.log(res);
    listaAnuncios.value = res.data;
  } catch (error: any) {
    console.log(error);
  }
};

onMounted(() => {
  getAnunciosList();
});
</script>

<template>
  <div class="flex justify-start items-center p-2 mt-2 gap-4 py-3 pl-6 ">
    <button
      @click="router.push({ name: 'asociacion' })"
      class="border-2 border-gray-400 border-solid rounded-lg px-2 py-1 hover:bg-indigo-600 hover:border-indigo-600"
    >
      Volver a la asociación
    </button>
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-gray-600 border-dashed rounded-lg mx-6 my-4 p-6 gap-4"
  >
    <div
      v-if="listaAnuncios.length >= 1"
      v-for="(anuncio, i) in listaAnuncios"
      :key="i"
      class="bg-white dark:bg-gray-800 rounded-lg w-full flex justify-center items-center flex-col px-4 pt-4 pb-8 shadow-lg relative"
    >
      <h3 class="text-xl font-semibold capitalize">{{ anuncio.titulo }}</h3>
      <p class="p-2 break-all">{{ anuncio.descripcion }}</p>
      <img
        class="w-52 h-auto rounded-lg"
        :src="`http://localhost:3000${anuncio.foto}`"
        :alt="anuncio.titulo"
      />

      <div class="absolute right-1 bottom-1 bg-slate-200 rounded-lg dark:bg-gray-900">
        <span>{{ new Date(anuncio.fecha_creacion).toLocaleString() }}</span>
      </div>
    </div>
    <div v-else>
      <p>No hay anuncios</p>
    </div>
  </div>
</template>

<style scoped></style>
