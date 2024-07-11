<script setup lang="ts">
import { ref, watch } from "vue";
import { AxiosUser } from "../service/instance";
import { ComentariosByIdAsoc, PublicacionById } from "../interfaces/interfaces";
import { useAuthStore } from "../context/auth.store";
import { Alert } from "../utils/sweetAlert";
import { Toast } from "../utils/toast";
// import { routes } from "vue-router/auto-routes";

const authStore = useAuthStore();
const props = defineProps<{
  idPubliDinamico: string;
}>();

const publiciacionById = ref({} as PublicacionById);

const getInfoPubli = async (id: string) => {
  try {
    const res = await AxiosUser.infoPublicacionByid(id);
    console.log(res);
    publiciacionById.value = res.data;
  } catch (error: any) {
    console.log(error);
  }
};

const comentarios = ref<ComentariosByIdAsoc>([]);

const getComentarioByPublic = async (idAsoc: string) => {
  try {
    const res = await AxiosUser.comentariosByIdAsoc(idAsoc);
    console.log(res);
    comentarios.value = res.data;
  } catch (error: any) {
    console.log(error);
  }
};

watch(
  () => props.idPubliDinamico,
  (newID) => {
    getComentarioByPublic(newID);
    getInfoPubli(newID);
  }
);

const respuestaAbierta = ref<Record<string, boolean>>({});

const toggleRespuesta = (id: string) => {
  respuestaAbierta.value[id] = !respuestaAbierta.value[id];
};

const comentario = ref("");
const comentario2 = ref("");
const comentario3 = ref("");

const registrarComentLv1 = async () => {
  try {
    const res = await AxiosUser.guardarComentariosLv1(
      props.idPubliDinamico,
      comentario.value
    );
    console.log(res);

    getComentarioByPublic(props.idPubliDinamico);
    comentario.value = "";
    respuestaAbierta.value = {};
  } catch (error: any) {
    if (error.response.status == 401) {
      Toast.warning("Inicia sesión para poder comentar");
    }

    console.log(error);
  }
};

const registrarComentLv2 = async (padreID: string) => {
  try {
    const res = await AxiosUser.guardarComentariosLv2(
      props.idPubliDinamico,
      padreID,
      comentario2.value
    );
    console.log(res);
    getComentarioByPublic(props.idPubliDinamico);
    comentario2.value = "";
    respuestaAbierta.value = {};
  } catch (error: any) {
    console.log(error);
    if (error.response.status == 401) {
      Toast.warning("Inicia sesión para poder comentar");
    }
  }
};
const registrarComentLv3 = async (padreID: string) => {
  try {
    const res = await AxiosUser.guardarComentariosLv3(
      props.idPubliDinamico,
      padreID,
      comentario3.value
    );
    console.log(res);
    getComentarioByPublic(props.idPubliDinamico);
    comentario3.value = "";
    respuestaAbierta.value = {};
  } catch (error: any) {
    console.log(error);
    if (error.response.status == 401) {
      Toast.warning("Inicia sesión para poder comentar");
    }
  }
};

const handleDeleteComent = async (id: string) => {
  try {
    const confirm = await Alert.confirmar(
      "Borrar comentario",
      "Desea borrar el comentario",
      "warning",
      "confirmar"
    );
    if (confirm) {
      console.log("OK");
      const res = await AxiosUser.borrarComentario(id);

      console.log(res);

      if (res.status == 200) {
        getComentarioByPublic(props.idPubliDinamico);
      }
    } else {
      console.log("FAIL");
    }
  } catch (error: any) {
    console.log(error);
  }
};

// reaciones
const handleReacciones = async (
  tipo: "like" | "dislike",
  idPublicacion: string
) => {
  try {
    if (!authStore.usuario.id) {
      Toast.warning("necesitas iniciar sesión para reaccionar");
      return;
    }

    const res = await AxiosUser.registrarReacciones(
      idPublicacion,
      authStore.usuario.id,
      tipo
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section
    v-if="props.idPubliDinamico.length > 0"
    class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-10 relative"
  >
    <div class="absolute top-2 left-2">
      <button @click="handleReacciones('like', publiciacionById.id)">
        <svg
          class="w-10 h-10 text"
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
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          ></path>
        </svg>
      </button>
      <button @click="handleReacciones('dislike', publiciacionById.id)">
        <svg
          class="w-10 h-10"
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
            d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
          ></path>
        </svg>
      </button>
    </div>
    <div class="text-center my-4">
      <h3 class="text-xl font-semibold">{{ publiciacionById.titulo }}</h3>
    </div>
    <div
      v-if="publiciacionById.texto_uno"
      class="p-4 border-2 border-gray-200 border-dashed dark:border-gray-700 rounded-lg m-4"
    >
      <p class="break-all">
        {{ publiciacionById.texto_uno }}
      </p>
    </div>
    <div
      v-if="publiciacionById.texto_dos"
      class="p-4 border-2 border-gray-200 border-dashed dark:border-gray-700 rounded-lg m-4"
    >
      <p class="break-all">
        {{ publiciacionById.texto_dos }}
      </p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
      <img
        v-if="publiciacionById.imagen_uno"
        :src="`http://localhost:3000${publiciacionById.imagen_uno}`"
        alt="iamgen 1"
        class="rounded-lg"
      />
      <img
        v-if="publiciacionById.imagen_dos"
        :src="`http://localhost:3000${publiciacionById.imagen_dos}`"
        alt="imagen 2"
        class="rounded-lg"
      />
    </div>

    <div class="text-center my-4">
      <h4 class="capitalize text-xl">comentarios</h4>
    </div>
    <div
      class="flex flex-col gap-1 max-h-[500px] overflow-y-auto rounded-lg claseBarra border-2 border-gray-600 border-solid mb-3"
    >
      <div
        v-for="(coment, i) in comentarios"
        :key="i"
        class="p-4 rounded-lg mt-2 border-2 border-gray-600 border-solid mx-4 mb-2"
      >
        <div>
          <div class="flex justify-start items-center gap-3">
            <div>
              <svg
                v-if="coment.usuario.foto == null"
                class="w-10 h-10 rounded-full border-2 border-gray-100 border-solid"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              <img
                v-else
                class="w-10 h-10 rounded-full"
                :src="`http://localhost:3000${coment.usuario.foto}`"
                alt="foto user"
              />
            </div>
            <div class="bg-gray-700 px-2 py-1 rounded-xl">
              <span class="font-normal">{{ coment.usuario.nombre }}</span>
              <p class="text-sm p-2 font-extralight">
                {{ coment.comentario }}
              </p>
            </div>
          </div>
          <div class="space-x-3">
            <button
              @click="toggleRespuesta(coment.id)"
              class="text-blue-600 font-light hover:underline ml-14"
            >
              Responder
            </button>
            <button
              v-if="authStore.usuario.id == coment.usuario.id"
              @click="handleDeleteComent(coment.id)"
              class="text-red-600 font-light hover:underline"
            >
              borrar comentario
            </button>
          </div>
        </div>

        <div v-if="respuestaAbierta[coment.id]" class="mt-2">
          <form @submit.prevent="registrarComentLv2(coment.id)">
            <label for="respuesta" class="sr-only">Tu respuesta</label>
            <div
              class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <textarea
                v-model="comentario2"
                id="respuesta"
                rows="1"
                class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tu respuesta..."
              ></textarea>
              <button
                type="submit"
                class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  class="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path
                    d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
                  />
                </svg>
                <span class="sr-only">Enviar respuesta</span>
              </button>
            </div>
          </form>
        </div>

        <div
          v-for="(comentHijo, j) in coment.hijo_comentario"
          :key="j"
          class="pl-10 mt-2"
        >
          <div>
            <div class="flex justify-start items-center gap-3">
              <div>
                <svg
                  v-if="comentHijo.usuario.foto == null"
                  class="w-10 h-10 rounded-full border-2 border-gray-100 border-solid"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>

                <img
                  v-else
                  class="w-10 h-10 rounded-full"
                  :src="`http://localhost:3000${comentHijo.usuario.foto}`"
                  alt="foto user"
                />
              </div>
              <div class="bg-gray-700 px-2 py-1 rounded-xl">
                <span class="font-normal">{{ comentHijo.usuario.nombre }}</span>
                <p class="text-sm p-2 font-extralight">
                  {{ comentHijo.comentario }}
                </p>
              </div>
            </div>
            <div class="space-x-3">
              <button
                @click="toggleRespuesta(comentHijo.id)"
                class="text-blue-600 font-light hover:underline ml-14"
              >
                Responder
              </button>
              <button
                v-if="authStore.usuario.id == comentHijo.usuario.id"
                @click="handleDeleteComent(comentHijo.id)"
                class="text-red-600 font-light hover:underline"
              >
                borrar comentario
              </button>
            </div>
          </div>

          <div v-if="respuestaAbierta[comentHijo.id]" class="mt-2">
            <form @submit.prevent="registrarComentLv3(comentHijo.id)">
              <label for="respuesta" class="sr-only">Tu respuesta</label>
              <div
                class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <textarea
                  v-model="comentario3"
                  id="respuesta"
                  rows="1"
                  class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tu respuesta..."
                ></textarea>
                <button
                  type="submit"
                  class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    class="w-5 h-5 rotate-90 rtl:-rotate-90"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path
                      d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
                    />
                  </svg>
                  <span class="sr-only">Enviar respuesta</span>
                </button>
              </div>
            </form>
          </div>

          <div
            v-for="(comentarioHijo2, k) in comentHijo.hijo_comentario"
            :key="k"
            class="pl-10 mt-2"
          >
            <div>
              <div class="flex justify-start items-center gap-3">
                <div>
                  <svg
                    v-if="comentarioHijo2.usuario.foto == null"
                    class="w-10 h-10 rounded-full border-2 border-gray-100 border-solid"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>

                  <img
                    v-else
                    class="w-10 h-10 rounded-full"
                    :src="`http://localhost:3000${comentarioHijo2.usuario.foto}`"
                    alt="foto user"
                  />
                </div>
                <div class="bg-gray-700 px-2 py-1 rounded-xl">
                  <span class="font-normal">{{
                    comentarioHijo2.usuario.nombre
                  }}</span>
                  <p class="text-sm p-2 font-extralight">
                    {{ comentarioHijo2.comentario }}
                  </p>
                </div>
              </div>

              <div>
                <button
                  v-if="authStore.usuario.id == comentarioHijo2.usuario.id"
                  @click="handleDeleteComent(comentarioHijo2.id)"
                  class="text-red-600 font-light hover:underline ml-14"
                >
                  borrar comentario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="registrarComentLv1">
      <label for="chat" class="sr-only">Tu comentario</label>
      <div
        class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"
      >
        <div class="">
          <svg
            v-if="authStore.usuario.foto == null"
            class="w-10 h-10 rounded-full border-2 border-gray-100 border-solid"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <img
            v-else
            :src="authStore.usuario.foto"
            alt="foto_mio_user"
            class="w-10 h-10 rounded-full"
          />
        </div>
        <textarea
          v-model="comentario"
          id="chat"
          rows="1"
          class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Escribe tu comentario..."
        ></textarea>
        <button
          type="submit"
          class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <svg
            class="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path
              d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
            />
          </svg>
          <span class="sr-only">Enviar comentario</span>
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.claseBarra::-webkit-scrollbar {
  background-color: #1e293b;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.claseBarra::-webkit-scrollbar-thumb {
  background-color: #334155;
}
</style>
