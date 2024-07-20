<script setup lang="ts">
import SliderC from "../components/common/SliderC.vue";
import { RouterLink } from "vue-router";
import { AxiosUser } from "../service/instance";
import { onMounted, ref } from "vue";
import { AsocListaI } from "../interfaces/interfaces";

const asocLista = ref<AsocListaI[]>([]);

const getListaAsoc = async () => {
  const res = await AxiosUser.listarAsoc();
  asocLista.value = res.data;
  console.log(res);
};

onMounted(() => {
  getListaAsoc();
});
</script>

<template>
  <SliderC />

  <div class="text-center py-6">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-sky-600 md:text-5xl lg:text-6xl dark:text-white"
    >
      Cultivando el Futuro de la Agricultura
    </h1>
    <p
      class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
    >
      Descubre todo lo que necesitas saber sobre la agricultura moderna. Aprende
      técnicas innovadoras para el cultivo de papa y quinua. Conecta con una
      comunidad de expertos y aficionados. ¡Únete a AgroInfo y transforma tu
      cosecha!
    </p>
    <!-- <a
      href="#"
      class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
    >
      Mas sobre nosotros
      <svg
        class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a> -->
  </div>

  <div
    class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-16 mt-4 place-items-center px-4"
  >
    <div
      v-for="(item, i) in asocLista"
      :key="i"
      class="w-full h-52 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <RouterLink
        :to="{
          name: 'asociacion',
          params: { nombre: item.nombre },
        }"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2"
        >
          {{ item.nombre }}
        </h5>
      </RouterLink>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
        {{ item.descripcion }}
      </p>

      <RouterLink
        :to="{
          name: 'asociacion',
          params: { nombre: item.nombre },
        }"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Ver asociación
        <svg
          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </RouterLink>
    </div>
  </div>






</template>

<style scoped></style>
