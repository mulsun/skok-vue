<template>
  <div>
    <Nav />
    <router-view v-slot="{ Component }">
      <transition
        :name="transitionName"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  <Footer />
  </div>
</template>
<script>
import Nav from './components/navigation.vue'
import Footer from './components/footer.vue'

const DEFAULT_TRANSITION = 'fade';

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      prevHeight: 0,
      transitionName: DEFAULT_TRANSITION,
    };
  },
  watchEffect: {
    '$route' (to) {
      document.title =  to.params.title ? `${to.params.title} | SKOK Film` : (to.meta.title ? `${to.meta.title} | SKOK Film` : 'SKOK Film')
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;
  
      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION;
      next();
    });
  },
  methods: {
    /*
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
    */
  },
}
</script>
<style lang="postcss">
:root {
  --mobile-padding: 30px;
}

@font-face {
  font-family: 'FuturaEB';
  src: url('/fonts/FuturaEB.ttf') format('truetype');
}

@font-face {
  font-family: 'FuturaB';
  src: url('/fonts/FuturaB.ttf') format('truetype');
}

@font-face {
  font-family: 'FuturaM';
  src: url('/fonts/FuturaM.ttf') format('truetype');
}

html {
  box-sizing: border-box;
}

body {
  font-family: FuturaB, Futura, -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #000;
  color: #fff;
  margin: 0;
  padding: 0;

  @media (min-width: 992px) {
    padding: 80px;
  }
}

h1 {
  margin-top: 0;
}

h3 {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
  transition: color ease-in 150ms;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media(max-width: 991px) {
  .mobile-overflow-hidden {
    overflow: hidden;
  }
}

.content {
  @media (max-width: 991px) {
    padding: 0 var(--mobile-padding);
    height: auto !important;
  }

  &.content-small {
    max-width: 420px;
  }

  & p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
  }
}

/* Common Grid */
.grid {
  display: grid;

  & figure {
    padding: 0;
    margin: 0;
  }

  & .film {
    @media (min-width: 992px) {
      opacity: 0.5;
      transition: opacity ease-out 175ms;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }
  }
}

.grid-1 {
  & .title {
    display: block;
    font-size: clamp(20px, 3.5vw, 48px);;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 10px;
  }

  & .film {
    @media (min-width: 992px) {
      min-height: 360px;
    }
  }

  & .description {
    display: flex;
  }

  & .details {
    display: block;
    position: relative;
    z-index: 1;
    max-width: 480px;
    background-color: #000;
    margin-top: -40px;
    padding: var(--mobile-padding) var(--mobile-padding) var(--mobile-padding) 0;
  }

  & .thumbnail {
    width: 100%;
    object-fit: cover;
  }
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(300px, 1fr));
  grid-gap: 40px;

  & .description {
    display: none;
  }

  & .film,
  & .thumbnail {
    margin-bottom: 20px;
  }

  & .film {
    &:hover,
    &:focus {
      opacity: 1;
    }
  }

  & figure {
    @media (min-width: 992px) {
      min-height: 225px;
    }
  }

  & .thumbnail {
    width: 100%;
  }
}

.page-title {
  margin-top: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;

  & .director-image {
    display: none;
  }
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

.d-inline-block {
  display: inline-block;
}

.isLoading {
  min-height: 100vh;
}

/* https://codepen.io/nzbin/pen/GGrXbp */
.dot-pulse {
  --dot-color: #fff;
  margin-left: 20px;
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--dot-color);
  color: var(--dot-color);
  box-shadow: 9999px 0 0 -5px var(--dot-color);
  animation: dotPulse 1.5s infinite linear;
  animation-delay: .25s;
}

.dot-pulse::before, .dot-pulse::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--dot-color);
  color: var(--dot-color);
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px var(--dot-color);
  animation: dotPulseBefore 1.5s infinite linear;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px var(--dot-color);
  animation: dotPulseAfter 1.5s infinite linear;
  animation-delay: .5s;
}

@keyframes dotPulseBefore {
  0% {
    box-shadow: 9984px 0 0 -5px var(--dot-color);
  }
  30% {
    box-shadow: 9984px 0 0 2px var(--dot-color);
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px var(--dot-color);
  }
}

@keyframes dotPulse {
  0% {
    box-shadow: 9999px 0 0 -5px var(--dot-color);
  }
  30% {
    box-shadow: 9999px 0 0 2px var(--dot-color);
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px var(--dot-color);
  }
}

@keyframes dotPulseAfter {
  0% {
    box-shadow: 10014px 0 0 -5px var(--dot-color);
  }
  30% {
    box-shadow: 10014px 0 0 2px var(--dot-color);
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px var(--dot-color);
  }
}

</style>
