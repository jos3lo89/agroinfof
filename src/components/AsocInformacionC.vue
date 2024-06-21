<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AxiosUser } from "../service/instance";

interface Asociacion {
  admin_id: string;
  descripcion: string;
  fechaActualizacion: string;
  fechaCreacion: string;
  id: string;
  nombre: string;
  portada: string;
  portada_id: null | string;
}

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

    <div
      class="flex flex-col md:flex-col xl:flex-row items-center justify-center"
    >
      <div>
        <img
          :src="dataAsoc.portada"
          alt="portada de la asociacion"
          class="rounded-lg md:h-72"
        />
      </div>
      <div>
        <small>descripcion:</small>
        <p>{{ dataAsoc.descripcion }}</p>
        <small>fecha de creacion:</small>
        <p>{{ dataAsoc.fechaCreacion }}</p>
        <small>fecha de actualizacion:</small>
        <p>{{ dataAsoc.fechaActualizacion }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
