<template>
  <nav :class="{'is-open': isOpen}">
    <Logo />
    <button @click="menuOpen" class="hamburger"><span class="sr-only">Toggle Menu</span><span class="gg-menu" /></button>
    <ul class="menu" @click="menuOpen">
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
    </ul>
    <Footer />
  </nav>
</template>
<script>
import Logo from './logo.vue'
import Footer from './footer.vue'

export default {
  name: 'App',
  components: {
    Logo,
    Footer
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    menuOpen() {
      if(window.innerWidth < 992)
        this.isOpen = !this.isOpen
        document.getElementsByTagName('body')[0].style = this.isOpen ? 'overflow:hidden' : ''
    }
  }
}
</script>
<style lang="postcss">
nav {
  display: flex;
  margin-bottom: 20px;

  & .social {
    display: none;
  }

  @media (max-width: 991px) {
    padding-top: var(--mobile-padding);
    padding-left: var(--mobile-padding);

    & .menu,
    & .social {
      position: fixed;
      display: block;
      transform: translateX(150%);
      transition: transform ease-in 250ms;
    }

    &.is-open {
      & .menu,
      & .social {
        transform: translateX(0);
      }

      & .social {
        position: fixed;
        left: 20px;
        bottom: 20px;
        z-index: 10;
      }

    & .hamburger {
        position: fixed;
      }
    }
  }

  & h1 {
    margin-right: auto;
    margin-bottom: 0;
  }

  & .hamburger {
    width: 40px;
    height: 52px;
    color: inherit;
    position: absolute;
    top: 27px;
    right: 20px;
    background: transparent;
    appearance: none;
    padding: 0;
    margin: 0;
    border: 0;
    z-index: 9;

    @media (min-width: 992px) {
      display: none;
    }
  }

  & .menu {
    display: flex;
    align-items: center;
    margin-right: -10px;
    font-size: 14px;

    @media (max-width: 991px) {
      display: block;
      background-color: #000;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      min-height: 100vh;
      padding: var(--mobile-padding);
      z-index: 8;
      font-size: 8vw;
    }

    & a {
      text-transform: uppercase;
      font-weight: 900;
      letter-spacing: 1px;
      margin: 16px 10px;
      border-bottom: 3px solid transparent;

      &.router-link-active,
      &:hover,
      &:focus {
        border-bottom-color: #fff;
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
  background: currentColor
  }

  &::after,
  &::before {
  content: "";
  position: absolute;
  top: -6px
  }

  &::after {
  top: 6px
  }
}
</style>