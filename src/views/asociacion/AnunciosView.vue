<script setup lang="ts">
// import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const route = useRoute();

const params = route.params;

console.log(params);
</script>

<template>
  <button
    @click="router.push({ name: 'asociacion' })"
    class="text-blue-800 px-2 py-1 rounded-lg my-1 bg-white"
  >
    asociacion
  </button>
</template>

<style scoped></style>
