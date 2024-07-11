<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <section
    class=" fixed top-0 left-0 right-0 bottom-0  flex items-center  p-16 dark:bg-gray-50 dark:text-gray-800"
  >
    <div
      class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
    >
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-400">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">
          Lo sentimos, no pudimos encontrar esta página..
        </p>
        <p class="mt-4 mb-8 dark:text-gray-600">
          Pero no te preocupes, puedes encontrar muchas otras cosas en nuestra página de inicio.
        </p>
        <button
          @click="router.push({ name: 'inicio' })"
          rel="noopener noreferrer"
          class="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
