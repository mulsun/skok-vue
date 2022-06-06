<template>
  <div class="content">
    <h1 id="pageTitle" class="page-title">Directors</h1>
    <ul class="grid-dir">
      <li v-for="(director, i) in directors" :key="i">
        <router-link
          :to="{
            name: 'Director',
            params: { directorSlug: directorSlug(director), title: director },
          }"
        >
          {{ director }}
          <img
            alt=""
            class="director-image"
            loading="lazy"
            :src="directorImage(director)"
          />
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { inject } from "vue";
const films = inject("films");
const slugify = inject("slugify");
const directors = films.directors.sort();
const directorSlug = (director) => slugify(director);
const directorImage = (director) =>
  `images/directors/${slugify(director).split("-").pop()}.jpg`;
</script>
<style lang="postcss">
.grid-dir {
  width: 100%;
  overflow: hidden;
  font-size: 1.5rem;
  max-width: 50vw;

  @media (--desktop) {
    text-align: center;
    margin: var(--padding) auto;
  }

  @media (--mobile) {
    grid-template-columns: 1fr;
    margin: 0;
  }

  & li {
    line-height: 1.5;

    @media (--desktop) {
      display: inline;
      padding: 0 calc(var(--padding) / 4);

      &:after {
        content: "•";
        position: relative;
        left: 3px;
        top: 1px;
      }
    }

    & a {
      color: var(--text-color);

      &:hover,
      &:focus {
        & .director-image {
          opacity: 0.35;
        }
      }
    }
  }

  & .director-image {
    pointer-events: none;
    position: absolute;
    width: 100vw;
    top: 0;
    left: 0;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
    opacity: 0;
    transition: opacity ease-in 125ms;
  }
}
</style>