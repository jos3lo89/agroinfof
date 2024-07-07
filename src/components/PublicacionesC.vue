<script setup lang="ts">
import { ref, watch } from "vue";
import { AxiosUser } from "../service/instance";
import { ComentariosByIdAsoc, PublicacionById } from "../interfaces/interfaces";

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
</script>

<template>
  <section
    v-if="props.idPubliDinamico.length > 0"
    class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-10"
  >
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

    <div>
      <div v-for="(coment, i) in comentarios" :key="i">
        <p>{{ coment.comentario }}</p>

        <div v-for="(comentHijo, j) in coment.hijo_comentario" :key="j">
          <p>{{ comentHijo.comentario }}</p>

          <div
            v-for="(comentarioHijo2, k) in comentHijo.hijo_comentario"
            :key="k"
          >
            <p>{{ comentarioHijo2.comentario }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
