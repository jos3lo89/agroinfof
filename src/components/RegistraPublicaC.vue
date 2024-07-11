<script setup lang="ts">
import { reactive, ref } from "vue";
import { AxiosUser } from "../service/instance";
import { Toast } from "../utils/toast";

const imagen_uno = ref();
const imagen_dos = ref();

const publicacionData = reactive({
  titulo: "",
  texto_uno: "",
  texto_dos: "",
  estado: "",
});

const handleChange_1 = (e: any) => {
  const file = e.target.files[0];
  if (file) {
    imagen_uno.value = file;
    console.log(imagen_uno);
  }
};

const handleChange_2 = (e: any) => {
  const file2 = e.target.files[0];
  if (file2) {
    imagen_dos.value = file2;
    console.log(imagen_dos);
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("estado", publicacionData.estado);
    formData.append("titulo", publicacionData.titulo);

    if (publicacionData.texto_uno.length >= 1) {
      formData.append("texto_uno", publicacionData.texto_uno);
      console.log("texto 1 OK");
    }
    if (publicacionData.texto_dos.length >= 1) {
      formData.append("texto_dos", publicacionData.texto_dos);
      console.log("texto 2 OK");
    }

    if (imagen_uno.value) {
      formData.append("imagen_uno", imagen_uno.value);
      console.log("Imagen uno OK");
    }
    if (imagen_dos.value) {
      formData.append("imagen_dos", imagen_dos.value);
      console.log("Imagen dos OK");
    }

    const res = await AxiosUser.registrarPublicaciones(formData);
    console.log(res);

    if (res.status == 201) {
      Toast.success("Publiacion creada");

      imagen_uno.value = null;
      imagen_dos.value = null;

      publicacionData.estado = "";
      publicacionData.texto_dos = "";
      publicacionData.texto_uno = "";
      publicacionData.titulo = "";
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
    <h1 class="text-2xl font-semibold capitalize">registra publicaciones</h1>
  </div>
  <form @submit.prevent="handleSubmit" class="max-w-sm mx-auto">
    <div class="mb-5">
      <label
        for="publicacion_titulo"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >titulo</label
      >
      <input
        v-model="publicacionData.titulo"
        type="text"
        id="publicacion_titulo"
        name="publicacion_titulo"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="mb-5">
      <label
        for="texto_1"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >parrafo 1</label
      >
      <textarea
        v-model="publicacionData.texto_uno"
        id="texto_1"
        name="texto_1"
        rows="2"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Escribe el parrafo 1 aqui..."
      ></textarea>
    </div>
    <div class="mb-5">
      <label
        for="texto_2"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >parrafo 2</label
      >
      <textarea
        v-model="publicacionData.texto_dos"
        id="texto_2"
        name="texto_2"
        rows="2"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Escribe el parrafo 2 aqui..."
      ></textarea>
    </div>
    <div class="mb-5">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for="foto_1_publicacion"
        >Imagen 1</label
      >
      <input
        class="block w-full p-1 file:cursor-pointer text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:border-none file:bg-gray-50 file:text-gray-900 file:dark:text-white file:dark:bg-gray-700 file:dark:border-gray-600 file:focus:ring-0 file:focus:outline-none file:ring-0 file:placeholder-gray-400"
        id="foto_1_publicacion"
        type="file"
        @change="handleChange_1"
      />
      <p
        class="mt-1 mb-3 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        PNG, JPG, JPEG y WEBP.
      </p>
    </div>
    <div class="mb-5">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for="foto_2_publicacion"
        >Imagen 2</label
      >
      <input
        class="block w-full p-1 file:cursor-pointer text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:border-none file:bg-gray-50 file:text-gray-900 file:dark:text-white file:dark:bg-gray-700 file:dark:border-gray-600 file:focus:ring-0 file:focus:outline-none file:ring-0 file:placeholder-gray-400"
        id="foto_2_publicacion"
        type="file"
        @change="handleChange_2"
      />
      <p
        class="mt-1 mb-3 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help2"
      >
        PNG, JPG, JPEG y WEBP.
      </p>
    </div>
    <div class="mb-5">
      <form class="max-w-sm mx-auto">
        <label
          for="estado_publicacion"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Estado de la publicación</label
        >
        <select
          v-model="publicacionData.estado"
          id="estado_publicacion"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <!-- <option selected disabled>Selecione un estado</option> -->
          <option value="privado">Privado</option>
          <option value="publico">Publico</option>
        </select>
      </form>
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Registrar publicación
    </button>
  </form>
</template>

<style scoped></style>
