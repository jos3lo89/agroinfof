<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ListaUserAdmin } from "../interfaces/interfaces";
import { AxiosUser } from "../service/instance";
import { Toast } from "../utils/toast";

const listaUsers = ref<ListaUserAdmin[]>([]);

const newUser = ref<ListaUserAdmin[]>([]);

const getUsers = async () => {
  try {
    const res = await AxiosUser.listaUsuario();
    listaUsers.value = res.data;

    newUser.value = listaUsers.value.filter(
      (user) => user.rol !== "admin" && user.rol !== "admin_asoc"
    );
  } catch (error: any) {
    console.log(error);
  }
};

onMounted(() => {
  getUsers();
});

const asocDatos = reactive({
  idAdmin: "",
  nombre: "",
  descripcion: "",
  correo: "",
  telefono: "",
});

const inputFoto = ref();

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

    formData.append("admin_id", asocDatos.idAdmin);
    formData.append("nombre", asocDatos.nombre);
    formData.append("descripcion", asocDatos.descripcion);
    formData.append("correo", asocDatos.correo);
    formData.append("numero", asocDatos.telefono);
    formData.append("foto", inputFoto.value);

    const res = await AxiosUser.registrarAsociacion(formData);
    console.log(res);
    if (res.status == 201) {
      Toast.success("Asociacion registrada");

      inputFoto.value = null;
      asocDatos.nombre = "";
      asocDatos.correo = "";
      asocDatos.descripcion = "";
      asocDatos.idAdmin = "";
      asocDatos.telefono = "";
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
    <h1 class="font-semibold text-2xl capitalize">Registrar asociación</h1>
  </div>

  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="asocDatos.nombre"
        type="text"
        name="nombre_asociacion"
        id="nombre_asociacion"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="nombre_asociacion"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Nombre de asociación</label
      >
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label
        for="message"
        class="block mb-2 text-sm text-gray-400 dark:text-gray-400"
        >Descripción</label
      >
      <textarea
        v-model="asocDatos.descripcion"
        id="message"
        rows="2"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Escribe la descripción..."
      ></textarea>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="asocDatos.correo"
        type="email"
        name="correo_asociacion"
        id="correo_asociacion"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="correo_asociacion"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Correo electronico</label
      >
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label
        class="block mb-2 text-sm text-gray-400 dark:text-gray-400"
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

    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="asocDatos.telefono"
        type="number"
        name="telefono_asociacion"
        id="telefono_asociacion"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="telefono_asociacion"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Número de Telefono</label
      >
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label
        for="countries"
        class="block mb-2 text-sm text-gray-400 dark:text-gray-400"
        >Seleccione al Administrador</label
      >
      <select
        v-model="asocDatos.idAdmin"
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option v-for="(user, i) in newUser" :key="i" :value="user.id">
          {{ user.nombre }}
        </option>
      </select>
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
