<template>
  <div class="content content-small">
    <h1 id="pageTitle" class="page-title">{{ $t("error.title") }}</h1>
    <p>{{ $t("error.text") }}</p>
  </div>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const meta = document.createElement("meta");
  meta.name = "robots";
  meta.content = "noindex";
  document.head.appendChild(meta);
});
</script>