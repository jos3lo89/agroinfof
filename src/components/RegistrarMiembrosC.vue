<script setup lang="ts">
import { reactive, ref } from "vue";
import { AxiosUser } from "../service/instance";
import { Toast } from "../utils/toast";

const fechasNac = reactive({
  anio: "",
  mes: "",
  dia: "",
});

const dniMiembro = ref("");

const datosMimbro = reactive({
  nombre: "",
  apellido: "",
  correo: "",
  direccion: "",
  genero: "",
  telefono: "",
});

const handleSubmit = async () => {
  try {
    const datos = {
      ...datosMimbro,
      dni: parseInt(dniMiembro.value),
      fecha_nacimiento: `${fechasNac.anio}-${fechasNac.mes}-${fechasNac.mes}`,
    };

    console.log(datos);

    const res = await AxiosUser.registrarMiembro(datos);
    console.log(res);
    if (res.status == 201) {
      Toast.success("miembro registrado");

      datosMimbro.nombre = "";
      datosMimbro.apellido = "";
      datosMimbro.correo = "";
      dniMiembro.value = "";
      datosMimbro.direccion = "";
      datosMimbro.telefono = "";
      fechasNac.anio = "";
      fechasNac.mes = "";
      fechasNac.dia = "";
      datosMimbro.genero = "";
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
    <h1 class="text-2xl font-semibold capitalize">RegistrarMiembros</h1>
  </div>

  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="datosMimbro.nombre"
        type="text"
        name="nombre_miembro"
        id="nombre_miembro"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="nombre_miembro"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >nombre</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="datosMimbro.apellido"
        type="text"
        name="apellido_miembro"
        id="apellido_miembro"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="apellido_miembro"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >apellido</label
      >
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <input
        v-model="datosMimbro.correo"
        type="email"
        name="correo_miembro"
        id="correo_miembro"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="correo_miembro"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Correo electronico</label
      >
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="dniMiembro"
          type="text"
          name="dni_miembro"
          pattern="[0-9]{8}"
          id="dni_miembro"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="dni_miembro"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Dni</label
        >
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="datosMimbro.direccion"
          type="text"
          name="direccion_miembro"
          id="direccion_miembro"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="direccion_miembro"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >direccion</label
        >
      </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-5 group">
        <input
          v-model="datosMimbro.telefono"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
          name="telefono_miembro"
          id="telefono_miembro"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="telefono_miembro"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Telfefono (999-999-999)</label
        >
      </div>
      <div class="flex gap-3">
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="fechasNac.anio"
            type="text"
            pattern="[0-9]{4}"
            name="anio_nac"
            id="anio_nac"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="anio_nac"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >año</label
          >
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="fechasNac.mes"
            type="text"
            pattern="[0-9]{2}"
            name="mes_nac"
            id="mes_nac"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="mes_nac"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Mes</label
          >
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="fechasNac.dia"
            type="text"
            pattern="[0-9]{2}"
            name="dia_nac"
            id="dia_nac"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="dia_nac"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >dia</label
          >
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-5 group">
        <label
          for="countries"
          class="block mb-2 text-sm text-gray-500 dark:text-gray-400"
          >Genero</label
        >
        <select
          v-model="datosMimbro.genero"
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <!-- <option selected disabled>Elija un genera</option> -->
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Registrar Miembro
    </button>
  </form>
</template>

<style scoped></style>
