<script setup lang="ts">
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();

// Observa los cambios en los parámetros de la ruta
watch(
  () => route.params.codeAsoc,
  (newCodeAsoc, _oldCodeAsoc) => {
    const nombres = ["papa", "maiz", "quinua"];

    if (nombres.includes(newCodeAsoc as string)) {
      console.log(newCodeAsoc);
    } else {
      console.log(`codiog de asociacion no válido`);
    }
  },
  { immediate: true } // Ejecutar el watcher inmediatamente con el valor actual
);
</script>

<template>
  <h1>Asociacion vista</h1>
  <button
    @click="router.push({ name: 'inicio' })"
    class="text-blue-800 px-2 py-1 rounded-lg my-1 bg-white"
  >
    atras
  </button>
  <button
    @click="
      router.push({ name: 'anuncios', state: { idAsoc: route.name as string } })
    "
    class="text-blue-800 px-2 py-1 rounded-lg my-1 bg-white"
  >
    anuncios
  </button>
</template>

<style scoped></style>
