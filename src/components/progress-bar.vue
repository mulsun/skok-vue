<template>
  <div class="progress-bar" />
</template>
<script setup>
defineProps({
  duration: {
    type: String,
    default: "30s",
  },
});
</script>
<style lang="postcss">
.progress-bar {
  display: none; /* todo */
  width: 100%;
  height: 2px;
  background-size: 200% 100%;
  background-image: linear-gradient(
    to right,
    var(--site-bg) 50%,
    var(--text-color) 50%
  );
  animation: fill v-bind(duration) ease infinite;
  position: absolute;
  z-index: 1;
  bottom: 2px;
  left: 0;
  opacity: 0.4;
}

@keyframes fill {
  to {
    background-position: -100% 0;
  }
}
</style>