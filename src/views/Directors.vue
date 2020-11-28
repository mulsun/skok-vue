<template>
  <div class="content">
    <h2 class="page-title">Directors</h2>
    <ul
      class="dir-grid"
      lang="tr"
    >
      <li
        v-for="(director, i) in directorList"
        :key="i"
      >
        <router-link :to="{ name: 'Director', params: { slug: slugify(director), title: director }}">
          {{director}}
          <img
            class="director-image"
            :src="`images/directors/${slugify(director).split('-').pop()}.jpg`"
          >
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { inject } from 'vue';

export default {
  setup() {
    const slugify = inject('slugify')
    const films = inject('films')
    const directorList = Object.keys(films.director)

    return { 
      directorList, 
      slugify
    }
  }
}
</script>
<style lang="postcss" scoped>
.dir-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1280px;
  width: 100%;
  overflow: hidden;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }

  & li {
    text-transform: uppercase;
    font-size: 36px;
    font-weight: 900;

    @media (max-width: 575px) {
      font-size: 25px;
    }

    & a {
      opacity: .5;
      &:hover,
      &:focus {
        text-decoration: underline;
        opacity: 1;

        & .director-image {
          opacity: .45;
        }
      }
    }
  }

  & .director-image {
    pointer-events: none;
    position: absolute;
    width: 100%;
    top: 127px;
    left: 0;
    height: 70vh;
    object-fit: cover;
    z-index: -1;
    opacity: 0;
    transition: opacity ease-in 125ms;
  }
}
</style>