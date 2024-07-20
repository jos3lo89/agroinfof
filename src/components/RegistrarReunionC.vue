<script setup lang="ts">
import { reactive } from "vue";
import { AxiosUser } from "../service/instance";
import { Toast } from "../utils/toast";

const reuData = reactive({
  titulo: "",
  descripcion: "",
  lugar: "",
});

const reufecha = reactive({
  dia: "",
  mes: "",
  anio: "",
  hora: "",
  minuto: "",
});

const handleSubmit = async () => {
  try {
    const data = {
      ...reuData,
      // "fecha_hora": "05/25/2023 10:30",
      fecha_hora: `${reufecha.mes}/${reufecha.dia}/${reufecha.anio} ${reufecha.hora}:${reufecha.minuto}`,
    };

    const res = await AxiosUser.registrarReunion(data);
    console.log(res);

    if (res.status == 201) {
      Toast.success("Reunion creada");

      reuData.titulo = "";
      reuData.descripcion = "";
      reuData.lugar = "";

      reufecha.dia = "";
      reufecha.mes = "";
      reufecha.anio = "";
      reufecha.hora = "";
      reufecha.minuto = "";
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.status == 400) {
      error.response.data.message.forEach((error: any) => {
        Toast.warning(error);
      });
    }
  }
};
</script>

<template>
  <div class="text-center my-6">
    <h1 class="text-2xl capitalize font-semibold">Registrar reunión</h1>
  </div>

  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="reuData.titulo"
        type="text"
        name="titulo_reunion"
        id="titulo_reunion"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="titulo_reunion"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >titulo</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="reuData.descripcion"
        type="text"
        name="descripcion_reunion"
        id="descripcion_reunion"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="descripcion_reunion"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >descripción</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="reuData.lugar"
        type="text"
        name="lugar_reunion"
        id="lugar_reunion"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="lugar_reunion"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >lugar de reunion</label
      >
    </div>

    <div class="flex gap-4">
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="reufecha.dia"
          type="text"
          name="dia_reu"
          id="dia_reu"
          pattern="[0-9]{2}"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="dia_reu"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >dia</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="reufecha.mes"
          type="text"
          name="mes_reu"
          id="mes_reu"
          pattern="[0-9]{2}"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="mes_reu"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >mes</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="reufecha.anio"
          type="text"
          name="anio_reu"
          id="anio_reu"
          pattern="[0-9]{4}"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="anio_reu"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >año</label
        >
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="reufecha.hora"
          type="text"
          name="hora_reu"
          id="hora_reu"
          pattern="[0-9]{2}"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="hora_reu"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Hora</label
        >
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="reufecha.minuto"
          type="text"
          name="minuto_reu"
          id="minuto_reu"
          pattern="[0-9]{2}"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="minuto_reu"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >minuto</label
        >
      </div>
    </div>

    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Registrar reunión
    </button>
  </form>
</template>

<style scoped></style>
