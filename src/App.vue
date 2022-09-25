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
  <SubFooter />
</template>
<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import SiteNav from "./components/navigation.vue";
import SiteFooter from "./components/footer.vue";
import SubFooter from "./components/sub-footer.vue";

const navItems = inject("navItems");
const films = inject("films");
const findDirector = inject("findDirector");
const router = useRouter();
let transitionName = ref("slide-left");

router.beforeEach((to, from) => {
  const toDepth = navItems.findIndex((e) => e === to.name?.toLowerCase());
  const fromDepth = navItems.findIndex((e) => e === from.name?.toLowerCase());
  transitionName.value = from.name
    ? toDepth < fromDepth
      ? "slide-right"
      : "slide-left"
    : "none";

  // spa a11y
  setTimeout(() => {
    document.getElementsByTagName("main")[0].focus({ preventScroll: true });
  }, 1000);

  if (to.name === "Home") {
    document.title = "SKOK Film - Creative Production";
  } else if (to.name != "Video") {
    document.title = `${
      findDirector(films, to.params.directorSlug)?.name ??
      findDirector(films, to.params.directorSlug) ??
      to.params.title ??
      to.name
    } | SKOK Film`;
  }
});
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

#main {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  align-items: flex-start;
  overflow: hidden;
}

:root {
  --ws: 30px;
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

button {
  cursor: pointer;
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
    padding: var(--ws);
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

.preline {
  white-space: pre-line;
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
  min-height: calc(100vh - 208px);

  @media (--desktop) {
    margin-top: var(--ws);
    display: flex;
    flex-direction: column;
    place-content: center;

    &.content-small {
      text-align: center;

      & p {
        max-width: 32vw;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  @media (--mobile) {
    padding: 0 var(--ws);
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

  @media (--desktop) {
    margin-top: var(--ws);
  }

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

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: calc(var(--ws) * 3) calc(var(--ws) * 2);

  @media (--mobile) {
    gap: var(--ws);
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
  line-height: 1;
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
  transition-duration: 1s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;

  & .director-image {
    display: none;
  }
}

.slide-left-enter-to,
.slide-right-enter-to,
.slide-left-leave-active {
  transform: translate(-100%, 0);
}

.slide-right-leave-active {
  transform: translate(100%, 0);
}
</style>
