<template>
  <div id="app">
    <Nav />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <Footer />
  </div>
</template>
<script>
import { useRouter } from 'vue-router';

import Nav from './components/navigation.vue'
import Footer from './components/footer.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      router: useRouter(),
      prevHeight: 0,
      transitionName: 'slide',
     };
  },
  watch() {
    () => {
      // document.title =  this.route.params.title ? `${this.route.params.title} | SKOK Film` : (this.route.name != 'Home' ? `${this.route.name} | SKOK Film` : 'SKOK Film Production')
    }
  },
  created() {
    this.router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;
      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }
      this.transitionName = transitionName;
      next();
    });
  },
  methods: {
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
  }
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

@media (max-width: 991px) {
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
  margin-top: 30px;

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
  display: flex;
  flex-direction: column-reverse;

  & .title {
    display: block;
    font-size: clamp(20px, 3.5vw, 48px);
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

    &.blur {
      filter: blur(2px);
    }
  }
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
</style>
