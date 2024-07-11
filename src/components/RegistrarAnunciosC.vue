<script setup lang="ts">
import { reactive, ref } from "vue";
import { AxiosUser } from "../service/instance";
import { Toast } from "../utils/toast";

const inputFoto = ref();

const anuncioData = reactive({
  titulo: "",
  descripcion: "",
});

const handleChange = (e: any) => {
  const file = e.target.files[0];
  if (file) {
    inputFoto.value = file;
    console.log(inputFoto.value);
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("titulo", anuncioData.titulo);
    formData.append("descripcion", anuncioData.descripcion);
    formData.append("foto", inputFoto.value);

    const res = await AxiosUser.registrarAnuncios(formData);
    console.log(res);

    if (res.status == 201) {
      Toast.success("Anuncio creado");

      inputFoto.value = null;
      anuncioData.descripcion = "";
      anuncioData.titulo = "";
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
    <h1 class="text-2xl font-semibold capitalize">Registrar anuncios</h1>
  </div>

  <form @submit.prevent="handleSubmit" class="max-w-sm mx-auto">
    <div class="mb-5">
      <label
        for="anuncio_titulo"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >titulo</label
      >
      <input
        v-model="anuncioData.titulo"
        type="text"
        id="anuncio_titulo"
        name="anuncio_titulo"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-5">
      <label
        for="anuncio_descripcion"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Descripción</label
      >
      <textarea
        v-model="anuncioData.descripcion"
        id="anuncio_descripcion"
        name="anuncio_descripcion"
        rows="2"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Escribe la descripción aquí..."
      ></textarea>
    </div>
    <div>
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for="file_input"
        >fotografia de la asociación</label
      >
      <input
        class="block w-full p-1 file:cursor-pointer text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:border-none file:bg-gray-50 file:text-gray-900 file:dark:text-white file:dark:bg-gray-700 file:dark:border-gray-600 file:focus:ring-0 file:focus:outline-none file:ring-0 file:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        @change="handleChange"
      />
      <p
        class="mt-1 mb-3 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        PNG, JPG, JPEG y WEBP.
      </p>
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Registrar
    </button>
  </form>
</template>

<style scoped></style>
