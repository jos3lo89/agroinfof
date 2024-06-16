<script setup lang="ts">
import { reactive } from "vue";
import { AxiosUser } from "../../service/instance";
import { Toast } from "../../utils/toast";

const props = defineProps({
  abrir4: Boolean,
});

const emits = defineEmits(["close4", "refresh"]);

const close4 = () => {
  emits("close4");
};

const refresh = () => {
  emits("refresh");
};

const datos = reactive({
  nombre: "",
  apellido: "",
});

const editarDatos = async () => {
  try {
    const res = await AxiosUser.editarDatos(datos);
    console.log(res);
    close4();
    refresh();
    if (res.status == 200) {
      Toast.success("Datos actualizados");
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.status == 400) {
      error.response.data.message.forEach((err: any) => {
        Toast.warning(err);
      });
    }
  }
};
</script>

<template>
  <div
    v-if="props.abrir4"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div @click="close4" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <dialog
      :open="props.abrir4"
      class="z-60 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg relative"
    >
      <button
        @click="close4"
        class="absolute p-2 rounded shadow-xl bg-gray-300 dark:bg-slate-600 right-0 top-0 hover:bg-red-500 hover:text-white"
      >
        <svg
          class="w-5 h-5"
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
            d="M6 18 18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <div class="text-center mb-3 mt-10 md:mt-4">
        <strong class="text-xl font-semibold">Editar Datos</strong>
      </div>

      <form
        @submit.prevent="editarDatos"
        class="dark:bg-gray-800 p-4 rounded-lg mb-4"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nombre</label
            >
            <input
              v-model="datos.nombre"
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Rem"
              required
              autocomplete="off"
            />
          </div>
          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Apellido</label
            >
            <input
              v-model="datos.apellido"
              type="text"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ram"
              required
              autocomplete="off"
            />
          </div>
        </div>

        <button
          type="submit"
          class="bg-transparent border hover:text-white hover:border-blue-600 hover:bg-blue-600 mt-2 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-transparent dark:hover:bg-blue-800"
        >
          Actualizar
        </button>
      </form>
    </dialog>
  </div>
</template>

<style scoped></style>
