<template>
  <div>
    <Film :grid="grid" />
    <button
      @click="grid = !grid"
      class="toggle-grid"
    >
      <span
        class="gg-display-grid"
        :class="grid ? 'multi' : 'single'"
      ></span>
      <span class="sr-only">Change View</span>
    </button>
  </div>
</template>
<script>
  import Film from './Film.vue'

  export default {
    components: {Film},
    data() {
      return {
        grid: false,
      }
    },
  }
</script>
<style lang="postcss" scoped>
.toggle-grid {
  padding: 0;
  border: 0;
  position: fixed;
  left: 16px;
  top: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 991px) {
    display: none;
  }
}

/* https://css.gg/ */
.gg-display-grid {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  height: 14px;
  width: 14px;
  border: 2px solid transparent;
  box-shadow: 0 0 0 2px;

  &.single {
    &:before,
    &:after {
      border-right-width: 6px;
    }
  }

  &:before,
  &:after {
    transition: border-width ease-in 125ms;
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 4px;
    border-right: 4px solid;
    border-left: 4px solid;
    top: 0;
    left: 0;
  }

  &:before {
    top: 6px;
  }
}
</style>
