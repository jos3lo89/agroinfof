<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { AxiosUser } from "../../service/instance";
import { onMounted, ref } from "vue";
import { AsocListaI, asocViewI } from "../../interfaces/interfaces";

const router = useRouter();
const route = useRoute();

const asocLista = ref<AsocListaI[]>([]);
const asocData = ref({} as asocViewI);

const getListaAsoc = async () => {
  const res = await AxiosUser.listarAsoc();
  asocLista.value = res.data;

  const nombre = route.params.nombre;
  const exists = asocLista.value.some((item) => item.nombre === nombre);

  if (!exists) {
    router.push({ name: "inicio" });
  } else {
    const res2 = await AxiosUser.getasocByname(route.params.nombre as string);
    asocData.value = res2.data;
  }
};

onMounted(() => {
  getListaAsoc();
});
</script>

<template>
  <h1>{{ asocData.nombre }}</h1>
  <button
    @click="router.push({ name: 'inicio' })"
    class="text-blue-800 px-2 py-1 rounded-lg my-1 bg-white"
  >
    atras
  </button>
  <button
    @click="
      router.push({ name: 'anuncios', params: { titulo: 'fiesta patronal' } })
    "
    class="text-blue-800 px-2 py-1 rounded-lg my-1 bg-white"
  >
    anuncios
  </button>

  <div
    class="flex flex-col md:flex-row items-center justify-center gap-6 px-10 py-6"
  >
    <div>
      <img
        :src="asocData.portada"
        alt="portada de la asociacion"
        class="rounded-lg max-w-[500px]"
      />
    </div>
    <div>
      <p>
        {{ asocData.descripcion }}
      </p>
    </div>
  </div>

  <nav class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 px-10 py-6">
    <button class="bg-indigo-600 px-2 py-1 rounded-lg outline-none border-none">
      publicacion 1
    </button>
    <button class="bg-indigo-600 px-2 py-1 rounded-lg outline-none border-none">
      publicacion 2
    </button>
    <button class="bg-indigo-600 px-2 py-1 rounded-lg outline-none border-none">
      publicacion 3
    </button>
    <button class="bg-indigo-600 px-2 py-1 rounded-lg outline-none border-none">
      publicacion 4
    </button>
  </nav>

  <section>
    <!-- aqui se vera la informacion   -->
     <!-- con props y emits -->
  </section>
</template>

<style scoped></style>
