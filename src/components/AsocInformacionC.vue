<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AxiosUser } from "../service/instance";
import { Asociacion } from "../interfaces/interfaces";

const dataAsoc = ref({} as Asociacion);

const getData = async () => {
  try {
    const res = await AxiosUser.getDatosAsoc();
    dataAsoc.value = res.data;
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div>
    <div class="text-center my-6">
      <h1 class="text-2xl capitalize font-medium">{{ dataAsoc.nombre }}</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <img
          :src="dataAsoc.foto"
          alt="portada de la asociacion"
          class="rounded-lg md:h-72 mx-auto"
        />
      </div>
      <div class="px-4 py-1">
        <small class="my-2 text-xl text-cyan-500">descripcion:</small>
        <p class="break-all">{{ dataAsoc.descripcion }}</p>
        <small class="my-2 text-xl text-cyan-500">fecha de creacion:</small>
        <p>{{ new Date(dataAsoc.fecha_creacion).toLocaleString() }}</p>
        <small class="my-2 text-xl text-cyan-500"
          >fecha de actualizacion:</small
        >
        <p>
          {{ new Date(dataAsoc.fecha_actualizacion).toLocaleString() }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 xl:grid-cols-3 mt-6 gap-2">
      <div
        class="bg-white flex justify-center items-center flex-col gap-2 shadow-lg rounded-lg dark:bg-gray-700 p-4 w-full h-24"
      >
        <span>
          <svg
            class="w-10 h-10"
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
        </span>
        <p>
          {{ dataAsoc.correo }}
        </p>
      </div>
      <div
        class="bg-white flex justify-center items-center flex-col gap-2 shadow-lg rounded-lg dark:bg-gray-700 p-4 w-full h-24"
      >
        <span
          ><svg
            class="w-10 h-10"
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
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            ></path>
          </svg>
        </span>
        <p v-for="(num, i) in dataAsoc.telefonos" :key="i">
          <span>
            {{ `+51 ${num.numero}` }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
