<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ListaMiembroPorReunion,
  ListarReuniones,
} from "../interfaces/interfaces";
import { AxiosUser } from "../service/instance";
// import LlamandoListaMiembroC from "../components/LlamandoListaMiembroC.vue";

const listaReuniones = ref<ListarReuniones[]>([]);

const selectedButtonId = ref<string | null>(null);

const getListReuniones = async () => {
  try {
    const res = await AxiosUser.listarReuniones();
    // console.log(res);

    listaReuniones.value = res.data;

    console.log("reus ->", listaReuniones.value);
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
    const res = await AxiosUser.listarMiembroPorReunion(id);
    listaDeMiembros.value = res.data;
    selectedButtonId.value = id;
  } catch (error: any) {
    console.log(error);
  }
};

const handleCerrarLista = () => {
  listaDeMiembros.value = [];
  selectedButtonId.value = null;
};

const tomarAsistencia = async (
  idMiembro: string,
  estado: "presente" | "falta",
  idReu: string
) => {
  try {
    const res = await AxiosUser.tomarAsistencia22(idMiembro, estado);
    console.log(res);
    getMiembrosReactive(idReu);
  } catch (error: any) {
    console.log(error);
  }
};

const getPdf = (id: string) => {
  const url = `http://localhost:3000/api/reuniones/listar-pdf/${id}`;
  const características = "width=800,height=600,left=100,top=100";
  window.open(url, "_blank", características);
};
</script>

<template>
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
        <!-- :disabled="listaDeMiembros.length > 0" -->
        <button
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
  <!-- <LlamandoListaMiembroC :listaMiembros="listaDeMiembros" @refres="wer" /> -->

  <div
    v-if="listaDeMiembros.length > 0"
    class="relative overflow-x-auto shadow-md sm:rounded-lg mt-6"
  >
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3 capitalize">#</th>
          <th scope="col" class="px-6 py-3 capitalize">nombre</th>
          <th scope="col" class="px-6 py-3 capitalize">apellido</th>
          <th scope="col" class="px-6 py-3 capitalize">dni</th>
          <th scope="col" class="px-6 py-3 capitalize">Acciónes</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(asistencia, i) in listaDeMiembros"
          :key="i"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ i + 1 }}
          </th>
          <td class="px-6 py-4">{{ asistencia.miembro.nombre }}</td>
          <td class="px-6 py-4">{{ asistencia.miembro.apellido }}</td>
          <td class="px-6 py-4">{{ asistencia.miembro.dni }}</td>
          <td class="px-6 py-4">
            <button
              v-if="asistencia.estado == 'presente'"
              @click="
                tomarAsistencia(asistencia.id, 'falta', asistencia.reunion_id)
              "
            >
              <svg
                class="w-10 h-10"
                fill="#479ef0"
                viewBox="-51.2 -51.2 614.40 614.40"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#479ef0"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="11.264"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>box-tick</title>
                  <path
                    d="M96 448Q82 448 73 439 64 430 64 416L64 96Q64 82 73 73 82 64 96 64L416 64Q430 64 439 73 448 82 448 96L448 416Q448 430 439 439 430 448 416 448L96 448ZM367 192L331 160 230 282 177 229 145 261 234 350 367 192Z"
                  ></path>
                </g>
              </svg>
            </button>
            <button
              v-if="asistencia.estado == 'falta'"
              @click="
                tomarAsistencia(
                  asistencia.id,
                  'presente',
                  asistencia.reunion_id
                )
              "
            >
              <svg
                class="w-10 h-10"
                fill="#fd6363"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#fd6363"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>box-cross</title>
                  <path
                    d="M96 448Q82 448 73 439 64 430 64 416L64 96Q64 82 73 73 82 64 96 64L416 64Q430 64 439 73 448 82 448 96L448 416Q448 430 439 439 430 448 416 448L96 448ZM256 288L320 352 352 320 288 256 352 192 320 160 256 224 192 160 160 192 224 256 160 320 192 352 256 288Z"
                  ></path>
                </g>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-end items-center py-6 gap-4">
      <button
        v-if="listaDeMiembros.length > 0"
        @click="getPdf(listaDeMiembros[0].reunion_id)"
        class="bg-orange-600 text-white rounded-lg px-2 py-1"
      >
        Reporte en PDF
      </button>
      <button
        v-if="listaDeMiembros.length > 0"
        @click="handleCerrarLista"
        class="bg-indigo-600 text-white rounded-lg px-2 py-1"
      >
        Cerrar lista
      </button>
    </div>
  </div>
  <div v-else class="text-center my-4">
    <h1 class="font-semibold text-2xl">
      Seleccione una reunión para llamar lista
    </h1>
  </div>
</template>

<style scoped>
.bgChange {
  background-color: aquamarine;
}
</style>
