
<template>
  <transition @after-enter="$refs.close.focus()">
    <div class="modal" v-show="show" @keydown.esc="$emit('close')">
      <button ref="close" class="modal-close" @click="$emit('close')">
        <span class="sr-only">Close</span>
      </button>
      <img class="modal-image" :src="src" />
      <div class="modal-caption">
        <a :href="`/photos/${slugify(photographer)}`">
          {{ photographer }}
        </a>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { inject } from "vue";
const slugify = inject("slugify");

defineProps({
  src: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: false,
  },
  photographer: {
    type: String,
    default: null,
  },
});
</script>
<style lang="postcss" scoped>
.modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--opaque);
  color: var(--text-color);
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.modal-caption {
  margin-top: var(--ws);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;

  & a {
    color: var(--constant-black);
  }
}

.modal-image {
  max-height: 80vh;
  border-radius: 0.2rem;
}

.modal-close {
  --size: 36px;

  position: absolute;
  right: var(--ws);
  top: var(--ws);
  width: calc(var(--size) + var(--size) / 4);
  height: var(--size);
  opacity: 0.7;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  transition: opacity 0.5s;

  &:hover,
  &:focus {
    opacity: 1;
    outline: none;
  }

  &:before,
  &:after {
    position: absolute;
    top: 0;
    left: var(--ws);
    content: " ";
    height: var(--size);
    width: calc(var(--size) / 8);
    border-radius: 1rem;
    background-color: var(--constant-black);
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
