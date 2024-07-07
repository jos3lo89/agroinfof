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

    <div
      class="flex flex-col md:flex-col xl:flex-row items-center justify-center"
    >
      <div>
        <img
          :src="dataAsoc.foto"
          alt="portada de la asociacion"
          class="rounded-lg md:h-72"
        />
      </div>
      <div>
        <small>descripcion:</small>
        <p>{{ dataAsoc.descripcion }}</p>
        <small>fecha de creacion:</small>
        <p>{{ new Date(dataAsoc.fecha_creacion).toLocaleString("es-PE") }}</p>
        <!-- <p>{{ dataAsoc.fecha_creacion }}</p> -->
        <small>fecha de actualizacion:</small>
        <p>
          {{ new Date(dataAsoc.fecha_actualizacion).toLocaleString("es-PE") }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
