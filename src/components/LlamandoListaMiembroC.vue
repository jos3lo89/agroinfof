<script setup lang="ts">
import { ref, watch } from "vue";
import { ListaMiembroPorReunion } from "../interfaces/interfaces";
import { AxiosUser } from "../service/instance";

const lis = ref<ListaMiembroPorReunion[]>([]);

const props = defineProps<{
  listaMiembros: ListaMiembroPorReunion[];
}>();

watch(
  () => props.listaMiembros,
  (newVal) => {
    lis.value = newVal;
  }
);

const tomarAsistencia = async (
  idMiembro: string,
  estado: "presente" | "falta"
) => {
  try {
    const res = await AxiosUser.tomarAsistencia22(idMiembro, estado);
    console.log(res);
    lis.value = props.listaMiembros;
  } catch (error: any) {
    console.log(error);
  }
};

const emits = defineEmits(["refres"]);

const refreshh = () => {
  emits("refres");
};

/* const abrirOtraPagina = () => {
  const url = "http://localhost:3000/api/miembro/listar-pdf";
  
  // Especifica las características de la ventana emergente
  const características = "width=600,height=400,left=100,top=100";

  // Abre la URL en una ventana emergente
  window.open(url, '_blank', características);
}; */

const getPdf = (id: string) => {
  const url = `http://localhost:3000/api/reuniones/listar-pdf/${id}`;
  const características = "width=800,height=600,left=100,top=100";
  window.open(url, "_blank", características);
};
</script>

<template>
  <div class="text-center my-4">
    <h1 class="capitalize font-semibold text-2xl">
      {{
        lis.length > 0
          ? "llamar lista"
          : "selecione una reunion para llamr lsita"
      }}
    </h1>
  </div>

  <div
    v-if="lis.length > 0"
    class="relative overflow-x-auto shadow-md sm:rounded-lg"
  >
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">nombre</th>
          <th scope="col" class="px-6 py-3">apellido</th>
          <th scope="col" class="px-6 py-3">dni</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(asistencia, i) in lis"
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
            <!-- <button
              @click="
                tomarAsistencia(
                  asistencia.id,
                  asistencia.estado == 'falta' ? 'presente' : 'falta'
                )
              "
              class="text-white px-1 py-1 rounded-lg bg-blue-600 capitalize min-w-16"
            >
              {{ asistencia.estado }}
            </button> -->

            <input
              :id="`asistencia_reu${i}`"
              :name="`asistencia_reu${i}`"
              type="checkbox"
              :checked="asistencia.estado == 'presente'"
              @change="
                tomarAsistencia(
                  asistencia.id,
                  asistencia.estado == 'falta' ? 'presente' : 'falta'
                )
              "
              class="cursor-pointer"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex justify-end items-center py-6 gap-4">
    <button
      v-if="lis.length > 0"
      @click="getPdf(lis[0].reunion_id)"
      class="bg-orange-600 text-white rounded-lg px-2 py-1"
    >
      Ver lista en pdf
    </button>
    <button
      v-if="lis.length > 0"
      @click="refreshh"
      class="bg-indigo-600 text-white rounded-lg px-2 py-1"
    >
      guardar Asistencia
    </button>
  </div>
</template>

<style scoped></style>
