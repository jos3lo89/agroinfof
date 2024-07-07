<script setup lang="ts">
import { Alert } from "../utils/sweetAlert";
import { AxiosUser } from "../service/instance";
import { onMounted, ref } from "vue";
import { ListaUserAdmin } from "../interfaces/interfaces";
import { Toast } from "../utils/toast";

const listaUsers = ref<ListaUserAdmin[]>([]);

const getUsers = async () => {
  try {
    const res = await AxiosUser.listaUsuario();
    listaUsers.value = res.data;
  } catch (error: any) {
    console.log(error);
  }
};

onMounted(() => {
  getUsers();
});

// const handleClick = async () => {
//   try {
//     const confirm = await Alert.confirmar(
//       "borrar usuario",
//       "desea borra el uisser",
//       "warning",
//       "confirmar",
//       "el borrado fue confirmado"
//     );

//     if (confirm) {
//       console.log("OK");
//     } else {
//       console.log("FAIL");
//     }
//   } catch (error: any) {
//     console.log(error);
//   }
// };

const handleDeleteUser = async (id: string) => {
  try {
    const confirm = await Alert.confirmar(
      "borrar usuario",
      "desea borra el uisser",
      "warning",
      "confirmar",
      "el borrado fue confirmado"
    );

    if (confirm) {
      console.log("OK");
      const res = await AxiosUser.eliminarUsuarioById(id);
      console.log(res);

      if (res.status == 200) {
        getUsers();
        Toast.success("Usuario borrado");
      }
    } else {
      console.log("FAIL");
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
    <h1 class="capitalize text-2xl font-semibold">eliminar usuarios</h1>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">Nombre</th>
          <th scope="col" class="px-6 py-3">Apellido</th>
          <th scope="col" class="px-6 py-3">Correo</th>
          <th scope="col" class="px-6 py-3">Rol</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, i) in listaUsers"
          :key="i"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ i + 1 }}
          </th>
          <td class="px-6 py-4">{{ user.nombre }}</td>
          <td class="px-6 py-4">{{ user.apellido }}</td>
          <td class="px-6 py-4">{{ user.correo }}</td>
          <td class="px-6 py-4">
            {{ user.rol == "admin_asoc" ? "admin asoc" : user.rol }}
          </td>
          <td class="px-6 py-4 text-right">
            <button
              v-if="!(user.rol === 'admin' || user.rol === 'admin_asoc')"
              @click="handleDeleteUser(user.id)"
              class="text-red-600 dark:text-red-500 hover:underline"
            >
              <svg
                class="w-6 h-6"
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
