<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ListaMiembroPorReunion,
  ListarReuniones,
} from "../interfaces/interfaces";
import { AxiosUser } from "../service/instance";
import LlamandoListaMiembroC from "../components/LlamandoListaMiembroC.vue";

const listaReuniones = ref<ListarReuniones[]>([]);

const selectedButtonId = ref<string | null>(null);

const getListReuniones = async () => {
  try {
    const res = await AxiosUser.listarReuniones();
    // console.log(res);

    listaReuniones.value = res.data;
  } catch (error: any) {
    console.log(error);
  }
};

onMounted(() => {
  getListReuniones();
});

const listaDeMiembros = ref<ListaMiembroPorReunion[]>([]);

const getMiembrosReactive = async (id: string) => {
  try {
    // console.log(id);
    const res = await AxiosUser.listarMiembroPorReunion(id);
    // console.log(res);
    listaDeMiembros.value = res.data;
    selectedButtonId.value = id;
  } catch (error: any) {
    console.log(error);
  }
};

const wer = () => {
  listaDeMiembros.value = [];
  selectedButtonId.value = null;
};
</script>

<template>
  <!-- <div class="text-center my-4">
    <h1 class="text-2xl capitalize font-semibold">llamar lista</h1>
  </div> -->

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
    <div v-for="(reu, i) in listaReuniones" :key="i">
      <div
        class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <h5
          class="mb-2 font-medium tracking-tight text-gray-900 dark:text-white"
        >
          {{ reu.titulo }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ reu.lugar }}
        </p>
        <button
          :disabled="listaDeMiembros.length > 0"
          @click="getMiembrosReactive(reu.id)"
          :class="{
            'bg-red-500': selectedButtonId === reu.id,
            'bg-blue-500': selectedButtonId !== reu.id,
          }"
          class="inline-flex items-center px-3 py-2 text-white"
        >
          Llamar lista
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
        </button>
      </div>
    </div>
  </div>

  <!-- aqui llamr  la lista de reus -->
  <LlamandoListaMiembroC :listaMiembros="listaDeMiembros" @refres="wer" />
</template>

<style scoped>
.bgChange {
  background-color: aquamarine;
}
</style>
