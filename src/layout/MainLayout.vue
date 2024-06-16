<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderC from "../components/common/HeaderC.vue";
import FooterC from "../components/common/FooterC.vue";
</script>

<template>
  <HeaderC />
  <main>
    <RouterView />
  </main>
  <FooterC />
</template>

<style scoped></style>
