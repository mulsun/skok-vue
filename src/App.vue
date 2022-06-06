<template>
  <SiteNav />
  <main id="main" aria-labelledby="pageTitle" tabindex="-1">
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" :key="$router.currentRoute.value.fullPath" />
      </transition>
    </router-view>
  </main>
  <SiteFooter />
  <button
    :title="`Toggle ${lightTheme ? 'Dark' : 'Light'} Theme`"
    class="toggle-theme"
    :aria-pressed="lightTheme"
    @click="lightTheme = !lightTheme"
  >
    <span aria-hidden="true">{{ lightTheme ? "🌑" : "🌕" }}</span>
    <span class="sr-only">{{ lightTheme ? "Light" : "Dark" }} theme</span>
  </button>
</template>
<script setup>
import { ref, inject, watch } from "vue";
import { useRouter } from "vue-router";
import SiteNav from "./components/navigation.vue";
import SiteFooter from "./components/footer.vue";

/* watch() {() => {document.title =  this.route.params.title ? `${this.route.params.title} | SKOK Film` : (this.route.name != 'Home' ? `${this.route.name} | SKOK Film` : 'SKOK Film Production')};},
function beforeLeave(element) {this.prevHeight = getComputedStyle(element).height;}
function enter(element) {const { height } = getComputedStyle(element);element.style.height = this.prevHeight;setTimeout(() => {element.style.height = height;});} 
*/
const films = inject("films");
const findDirector = inject("findDirector");
const router = useRouter();
let transitionName = ref();
let lightTheme = ref(localStorage.getItem("theme") === "light");

router.beforeEach((to, from) => {
  // transitionName.value = to.meta.transitionName || from.meta.transitionName;
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  transitionName.value = toDepth < fromDepth ? "slide-right" : "slide-left";

  // spa a11y
  setTimeout(() => {
    document.getElementsByTagName("main")[0].focus({ preventScroll: true });
  }, 1000);

  if (to.name === "Home") {
    document.title = "SKOK Film";
  } else if (to.name != "Video") {
    document.title = `${
      findDirector(films.director, to.params.directorSlug) ??
      to.params.title ??
      to.name
    } | SKOK Film`;
  }
});

watch(
  () => lightTheme.value,
  () => {
    localStorage.setItem("theme", lightTheme.value ? "light" : "dark");
    document.documentElement.setAttribute(
      "theme",
      localStorage.getItem("theme")
    );
  },
  { immediate: true }
);
</script>

<style lang="postcss">
@font-face {
  font-family: "Work Sans";
  src: url("/fonts/WorkSans-VariableFont_wght.ttf")
      format("truetype supports variations"),
    url("/fonts/WorkSans-VariableFont_wght.ttf") format("truetype-variations");
  font-weight: 100 900;
}

@custom-media --mobile (max-width: 991px);
@custom-media --desktop (min-width: 992px);

:root {
  --padding: 30px;
  --site-bg: #000;
  --text-color: #fff;
  --logo-color: var(--text-color);
}

[theme="light"] {
  --site-bg: #fff;
  --text-color: #000;
}

:focus-visible {
  outline: 4px solid blue;
}

main:focus {
  outline: none;
}

.toggle-theme {
  background: transparent;
  border: 0;
  cursor: pointer;
  margin: 0 var(--padding) var(--padding);
  padding: 0;

  @media (--desktop) {
    margin: var(--padding) 0 0 0;
  }
}

html {
  box-sizing: border-box;
}

body {
  font-size: 16px;
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--site-bg);
  color: var(--text-color);
  margin: 0;

  @media (--desktop) {
    padding: var(--padding);
  }
}

h1 {
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: 900;
}

h2 {
  font-size: 3rem;
  letter-spacing: 2px;
  font-weight: 900;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  color: var(--text-color);
  text-decoration: none;
  transition: color ease-in 150ms;

  &:hover,
  &:focus,
  &.has-underline {
    text-decoration: underline;
  }

  &.has-underline:hover {
    text-decoration: none;
  }
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

@media (--mobile) {
  .mobile-overflow-hidden {
    overflow: hidden;
  }
}

.content {
  @media (--desktop) {
    margin-top: var(--padding);
    min-height: 80vh;

    &.content-small {
      max-width: 420px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }

  @media (--mobile) {
    padding: 0 var(--padding);
    height: auto !important;
  }

  & p {
    color: var(--text-color);
    line-height: 1.5;
  }
}

/* Common Grid */
.grid {
  display: grid;
  margin-top: var(--padding);

  & figure {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  & .film {
    & .details {
      display: inline-grid;
      text-align: center;
      width: 100%;
    }

    &:hover,
    &:focus,
    &:focus-within {
      & .title {
        text-decoration: underline;
      }

      & .thumbnail {
        /* hover effect */
      }
    }

    & .title {
      margin-top: 0.5rem;
      white-space: break-spaces;
    }
  }
}

.grid-home {
  gap: calc(var(--padding) * 1);

  @media (--desktop) {
    margin-top: 100vh;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: auto;
    /*
    grid-template-areas: 
      "c0 c0 c0 c0 c0 c0"
      ". c1 c2 c2 . ."
      "c3 c4 c4 c4 c4 c4"
      "c5 c6 . . . ."
      ". c7 c8 . . ."
      "c9 c10 c10 c10 c10 c10"
      "c11 c11 c11 c12 c12 c12"
      ". c13 . . . ."
      ". c14 c15 c15 c15 c15"
      "c16 c17 c18 c18 c18 c18";
    */
  }

  & .title {
    display: block;
    font-size: clamp(1rem, 18px, 2rem);
    line-height: 1.2;
    letter-spacing: -1px;
  }

  & .film {
    grid-area: auto !important;

    @media (--mobile) {
      grid-area: auto !important;
    }

    @media (--desktop) {
      min-height: 320px;
    }

    &:hover {
      opacity: 0.9;
    }
  }

  & .description {
    display: flex;
  }

  & .details {
    width: 100%;
  }

  & .thumbnail {
    width: 100%;
    object-fit: cover;
    transition: all ease-in 0.25s;
  }
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: calc(var(--padding) * 3) calc(var(--padding) * 2);

  @media (--mobile) {
    gap: var(--padding);
  }

  & .description {
    display: none;
  }

  & figure {
    @media (--desktop) {
      min-height: 196px;
    }
  }

  & .thumbnail {
    width: 100%;
  }
}

.page-title {
  margin: 0;
  font-size: 6rem;
  line-height: 0.9;
  white-space: break-spaces;

  @media (--desktop) {
    text-align: center;
  }

  @media (--mobile) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
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
  transform: translate(5em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-5em, 0);
}
</style>
