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
            src="images/directors/martins.jpg"
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
      &:hover,
      &:focus {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  & img {
    display: none;
  }
}
</style>