<script setup lang="ts">
import { reactive } from "vue";
import { AxiosUser } from "../../service/instance";
import { Toast } from "../../utils/toast";
import { useAuthStore } from "../../context/auth.store";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const datosUsuario = reactive({
  correo: "",
  clave: "",
});

const login = async () => {
  try {
    const res = await AxiosUser.login(datosUsuario);
    console.log(res);
    if (res.status == 200) {
      authStore.accessToken = true;
      authStore.rol = res.data.rol;
      authStore.usuario.nombre = res.data.nombre;
      authStore.usuario.id = res.data.id;
      authStore.usuario.correo = res.data.correo;
      authStore.usuario.foto = res.data.foto;
    }

    router.push({ name: "inicio" });
  } catch (error: any) {
    console.log(error);
    error.response.data.message.forEach((error: string) => {
      Toast.error(error);
    });
  }
};
</script>

<template>
  <section class="flex flex-col items-center justify-center mb-32">
    <h3 class="my-4 font-bold text-2xl">Iniciar sesión</h3>
    <form
      @submit.prevent="login"
      class="dark:bg-gray-800 p-4 rounded-lg mb-4 md:w-80 shadow-lg"
    >
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Tu correo electrónico</label
        >
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="nombre@ejemplo.com"
          required
          v-model="datosUsuario.correo"
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Su contraseña</label
        >
        <input
          type="password"
          id="password"
          placeholder="********"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          v-model="datosUsuario.clave"
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Iniciar sesión
      </button>
    </form>
    <div class="mb-5">
      <p>
        No tienes cuenta?
        <RouterLink class="text-blue-600" :to="{ name: 'registrar' }">
          Registrate aqui.</RouterLink
        >
      </p>
    </div>
  </section>
</template>

<style scoped></style>
