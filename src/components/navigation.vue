<template>
  <nav :class="{ 'is-open': isOpen, 'is-scrolled': isScrolled }">
    <div class="nav-logo">
      <router-link to="/">
        <SiteLogo />
        <span class="sr-only">SKOK Film</span>
      </router-link>
    </div>
    <button @click="toggleMenu" class="hamburger">
      <span class="sr-only">Toggle Menu</span><span class="gg-menu" />
    </button>
    <ul class="menu" @click.capture="toggleMenu">
      <li class="skip-nav">
        <a href="#main">Skip Nav</a>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/film">Film</router-link>
      </li>
      <li>
        <router-link to="/directors">Directors</router-link>
      </li>
      <li>
        <router-link to="/animation">Animation</router-link>
      </li>
      <li>
        <router-link to="/interactive">Interactive</router-link>
      </li>
      <li>
        <router-link to="/jobs">Jobs</router-link>
      </li>
      <li>
        <router-link to="/contact">Contact</router-link>
      </li>
      <li>
        <SiteFooter />
      </li>
    </ul>
  </nav>
</template>
<script setup>
import { ref, onMounted } from "vue";
import SiteLogo from "./logo.vue";
import SiteFooter from "./footer.vue";
let isOpen = ref(false);
let isScrolled = ref(false);

function toggleMenu() {
  if (window.innerWidth < 992) {
    isOpen.value = !isOpen.value;
    document.body.classList.toggle("mobile-overflow-hidden");
  }
}

onMounted(() => {
  window.addEventListener(
    "scroll",
    () => {
      isScrolled.value = window.scrollY > 200;
    },
    { passive: true }
  );
});
</script>
<style lang="postcss">
nav {
  --nav-color: var(--text-color);

  display: flex;
  position: sticky;
  z-index: 10;
  top: var(--padding);

  @media (--desktop) {
    &.is-scrolled {
      & .nav-logo,
      & ul {
        position: relative;
        z-index: 11;
      }

      &:after {
        content: "";
        background-color: var(--site-bg);
        width: 100%;
        height: 86px;
        position: fixed;
        top: 0;
        left: 0;
      }
    }
  }

  & .skip-nav {
    & a {
      opacity: 0;
    }

    &:focus-within {
      & a {
        opacity: 1;
      }
    }

    @media (--mobile) {
      display: none;
    }
  }

  & .nav-logo {
    flex: 1;
    margin: 0;
    line-height: 0;

    & a {
      display: inline-flex;
      height: 28px;

      & svg {
        width: 100px;
      }
    }
  }

  & .social {
    display: none;
  }

  @media (--mobile) {
    padding: var(--padding);
    margin-bottom: 0;
    position: relative;
    top: 0;

    & .social {
      display: flex;
      padding: 0;
    }

    & .menu {
      position: fixed;
      display: flex;
      transform: translateX(100%);
      transition: transform ease-out 175ms;
      will-change: transform;
    }

    &.is-open {
      & .menu {
        transform: translateX(0);
        transition-timing-function: ease-in;
        transition-duration: 350ms;
      }

      & .hamburger {
        position: fixed;
      }
    }
  }

  & .hamburger {
    width: 40px;
    height: 52px;
    color: inherit;
    position: absolute;
    top: 18px;
    right: var(--padding);
    background: transparent;
    appearance: none;
    padding: 0;
    margin: 0;
    border: 0;
    z-index: 9;
    cursor: pointer;
    display: none;

    @media (--mobile) {
      display: block;
    }
  }

  & .menu {
    display: flex;
    align-items: center;

    @media (--mobile) {
      display: block;
      background-color: var(--site-bg);
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      min-height: 100vh;
      padding: var(--padding);
      z-index: 8;
      font-size: clamp(1rem, 8vw, 3rem);
    }

    & > li > a {
      border-bottom: 2px solid transparent;
      color: var(--nav-color);

      @media (--desktop) {
        margin: calc(var(--padding) / 3);
      }

      &.router-link-active,
      &:hover,
      &:focus {
        border-bottom-color: var(--nav-color);
        text-decoration: none;
      }
    }
  }
}

.gg-menu {
  position: relative;
  left: 10px;
  transform: scale(1.5);

  &,
  &::after,
  &::before {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 3px;
    background: currentColor;
  }

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: -6px;
  }

  &::after {
    top: 6px;
  }
}
</style>