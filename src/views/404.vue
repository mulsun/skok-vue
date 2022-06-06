<template>
  <div class="content content-small">
    <h1 id="pageTitle" class="page-title">404</h1>
    <p>We could not find the page you are looking for :(</p>
  </div>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const meta = document.createElement('meta');
  meta.name = "robots";
  meta.content = "noindex";
  document.head.appendChild(meta);
})
</script>