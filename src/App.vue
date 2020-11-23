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

.content {
  @media (max-width: 991px) {
    padding: var(--mobile-padding);
  }
  @media (min-width: 575px) {
    &.content-small {
      max-width: 30vw;
    }

    & p {
      color: rgba(255, 255, 255, 0.75);
      line-height: 1.5;
    }
  }
}

.isLoading {
  min-height: 100vh;
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

.grid-3 {
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(300px, 1fr));
  grid-gap: 40px;

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

ul {
  cursor: pointer;
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

/* https://css.gg/chevron-left */
.gg-chevron-left {
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;

  &:after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(45deg);
    left: 6px;
    top: 6px;
  }
}
</style>
