<template>
  <div class="content">
    <h2 class="page-title">Directors</h2>
    <ul class="dir-grid">
      <li
        v-for="(director, i) in directors"
        :key="i"
        :lang="/^Fa|Gö|Vu|Me|Or|Ba|Re/.test(director) ? 'tr' : undefined"
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
    const directors = Object.keys(films.director)

    return { 
      directors, 
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
      color: rgba(255, 255, 255, 0.5);
      &:hover,
      &:focus {
        text-decoration: underline;
        color: rgba(255, 255, 255, 1);

        & .director-image {
          opacity: 0.45;
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