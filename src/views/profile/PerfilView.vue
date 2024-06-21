<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Toast } from "../../utils/toast";
import { useAuthStore } from "../../context/auth.store";
// import { useRouter } from "vue-router";
import { AxiosUser } from "../../service/instance";
import { DatosUsuario } from "../../interfaces/interfaces";

import ModalCambiarClaveC from "../../components/usuario/ModalCambiarClaveC.vue";
import ModalEliminarAcc from "../../components/usuario/ModalEliminarAcc.vue";
import ModalAddTelefonoC from "../../components/usuario/ModalAddTelefonoC.vue";
import ModalEditarDatosC from "../../components/usuario/ModalEditarDatosC.vue";

// const router = useRouter();
const authStore = useAuthStore();

const datosUsuario = ref({} as DatosUsuario);

const openMenuOpciones = ref(false);

const fotoUserNoFoto = {
  src: "user.webp",
  alt: "foto de usuario no registrado",
};

const getUsuario = async () => {
  try {
    const res = await AxiosUser.getUsuario();
    console.log(res);
    datosUsuario.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getUsuario();
});

const photoTemp = ref<File | null>(null);
const fotito = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

const handleChangePhoto = (e: any) => {
  const file = e.target.files[0];
  if (file) {
    photoTemp.value = file;
    fotito.value = URL.createObjectURL(file);
  }
};

const subirFoto = async () => {
  if (photoTemp.value) {
    const formData = new FormData();
    formData.append("foto", photoTemp.value);

    try {
      const res = await AxiosUser.agregarFoto(formData);
      console.log(res);

      if (res.status == 200) {
        authStore.usuario.foto = res.data.foto;
        Toast.success("Foto de perfil subida");

        photoTemp.value = null;
        fotito.value = "";
        if (fileInput.value) {
          fileInput.value.value = "";
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status == 400) {
        Toast.success("Ya tienes una foto de perfil");
      }
    }
  }
};

const actualizarFoto = async () => {
  if (photoTemp.value) {
    const formData = new FormData();
    formData.append("foto", photoTemp.value);

    try {
      const res = await AxiosUser.actualizarFoto(formData);
      console.log(res);

      if (res.status == 200) {
        authStore.usuario.foto = res.data.foto;

        Toast.success("Foto de perfil actualizada");

        photoTemp.value = null;
        fotito.value = "";
        if (fileInput.value) {
          fileInput.value.value = "";
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status == 400) {
        error.response.data.message.forEach((error: any) => {
          Toast.success(error);
        });
      }
    }
  }
};

const eliminarFoto = async () => {
  try {
    const res = await AxiosUser.eliminarFoto();
    console.log(res);

    if (res.status == 204) {
      authStore.usuario.foto = null;
      Toast.success("foto de perfil eliminada");
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.status == 400) {
      Toast.success("No tienes una foto de perfil");
    }
  }
};

const openModalEliminarAcc = ref(false);
const openModalCambiarClave = ref(false);
const openModalAddTelefono = ref(false);
const openModalEditarDatos = ref(false);

const showModales = () => {
  openModalEliminarAcc.value = !openModalEliminarAcc.value;
  openMenuOpciones.value = !openMenuOpciones.value;
};

const showModalCambiarClave = () => {
  openModalCambiarClave.value = !openModalCambiarClave.value;
  openMenuOpciones.value = !openMenuOpciones.value;
};

const showModalAddTelefono = () => {
  openModalAddTelefono.value = !openModalAddTelefono.value;
  openMenuOpciones.value = !openMenuOpciones.value;
};

const showModalEditarDatos = () => {
  openModalEditarDatos.value = !openModalEditarDatos.value;
  // openMenuOpciones.value = !openMenuOpciones.value;
};
</script>

<template>
  <section class="flex flex-col md:flex-row justify-around gap-3 mt-11">
    <div class="bg-gray-100 shadow-lg p-4 rounded-lg dark:bg-gray-800">
      <!-- <div class="absolute bottom-0 right-0 flex items-center gap-2.5"> -->

      <!-- </div> -->

      <div class="text-center mb-3">
        <h3 class="text-2xl">Mis Datos</h3>
      </div>
      <div>
        <p class="text-orange-600">
          Nombre:
          <span class="text-black dark:text-white">{{
            datosUsuario.nombre
          }}</span>
        </p>
        <p class="text-orange-600">
          Apellido:
          <span class="text-black dark:text-white">{{
            datosUsuario.apellido
          }}</span>
        </p>
        <p class="text-orange-600">
          Correo:
          <span class="text-black dark:text-white">{{
            datosUsuario.correo
          }}</span>
        </p>
        <p class="text-orange-600">
          Rol:
          <span class="text-black dark:text-white">{{ datosUsuario.rol }}</span>
        </p>
        <p
          v-for="(n, i) in datosUsuario.telefonos"
          :key="i"
          class="text-orange-600"
        >
          Telefono {{ i + 1 }}:
          <span class="text-black dark:text-white">{{ n.numero }}</span>
        </p>
        <p class="text-orange-600">
          Fecha creación:
          <span class="text-black dark:text-white">{{
            new Date(datosUsuario.fechaCreacion).toLocaleString("es-PE")
          }}</span>
        </p>
        <p class="text-orange-600">
          Fecha actualización:
          <span class="text-black dark:text-white">{{
            new Date(datosUsuario.fechaActualizacion).toLocaleString("es-PE")
          }}</span>
        </p>
      </div>
      <div class="mt-3 relative flex justify-start items-center">
        <button
          @click="showModalEditarDatos"
          type="button"
          class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Editar
        </button>
        <button
          @click="openMenuOpciones = !openMenuOpciones"
          type="button"
          class="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-900"
        >
          Opciones
        </button>
        <div
          v-if="openMenuOpciones"
          class="z-10 absolute left-0 right-0 -top-32 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <button
                @click="showModalCambiarClave"
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Eliminar cuenta
              </button>
            </li>
            <li>
              <button
                @click="showModales"
                type="button"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                cambiar contraseña
              </button>
            </li>
            <li>
              <button
                @click="showModalAddTelefono"
                type="button"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Agregar Telefono
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 shadow-lg p-4 rounded-lg dark:bg-gray-800">
      <div class="text-center mb-3">
        <h3 class="text-2xl">Mi foto</h3>
      </div>
      <div>
        <div class="flex items-center justify-center">
          <div>
            <img
              v-if="authStore.usuario.foto == null"
              :src="fotoUserNoFoto.src"
              :alt="fotoUserNoFoto.alt"
              class="w-32 h-32 rounded-lg"
            />
            <img
              v-else
              :src="authStore.usuario.foto"
              :alt="datosUsuario.foto ?? 'Foto de usuario no registrado'"
              class="w-32 h-32 rounded-lg"
            />
          </div>
          <div>
            <img
              v-if="fotito != ''"
              :src="fotito"
              class="w-32 h-32 rounded-lg"
            />
          </div>
        </div>

        <div>
          <div class="py-3">
            <input
              class="block w-full p-1 file:cursor-pointer text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:border-none file:bg-gray-50 file:text-gray-900 file:dark:text-white file:dark:bg-gray-700 file:dark:border-gray-600 file:focus:ring-0 file:focus:outline-none file:ring-0 file:placeholder-gray-400"
              id="file_input"
              type="file"
              ref="fileInput"
              @change="handleChangePhoto"
            />
          </div>

          <button
            v-if="authStore.usuario.foto == null"
            @click="subirFoto"
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Subir foto
          </button>

          <button
            v-else
            @click="actualizarFoto"
            type="button"
            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Cambiar
          </button>
          <button
            @click="eliminarFoto"
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </section>

  <ModalCambiarClaveC
    v-if="openModalEliminarAcc"
    :abrir="openModalEliminarAcc"
    @close="openModalEliminarAcc = !openModalEliminarAcc"
  />

  <ModalEliminarAcc
    v-if="openModalCambiarClave"
    :abrir2="openModalCambiarClave"
    @close2="openModalCambiarClave = !openModalCambiarClave"
  />

  <ModalAddTelefonoC
    v-if="openModalAddTelefono"
    :abrir3="openModalAddTelefono"
    @close3="openModalAddTelefono = !openModalAddTelefono"
  />

  <ModalEditarDatosC
    v-if="openModalEditarDatos"
    :abrir4="openModalEditarDatos"
    @close4="openModalEditarDatos = !openModalEditarDatos"
    @refresh="getUsuario"
  />
</template>

<style scoped></style>
