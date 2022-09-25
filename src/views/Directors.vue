<template>
  <div class="content">
    <h1 id="pageTitle" class="page-title">
      <span v-if="isOffline">
        {{ $t("directors.offline") }}
      </span>
      {{ $t("directors.title") }}
    </h1>
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
import { useRoute } from "vue-router";

const route = useRoute();
const films = inject("films");
const slugify = inject("slugify");
const isOffline = route.name.startsWith("Offline");
const directors = isOffline
  ? films.offlineDirectors.map((e) => e.name)
  : films.directors.sort();
const directorSlug = (director) => slugify(director);
const directorImage = (director) =>
  `/images/directors/${isOffline ? "offline/" : ""}${slugify(director)
    .split("-")
    .pop()}.jpg`;
</script>
<style lang="postcss">
.grid-dir {
  width: 100%;
  overflow: hidden;
  font-size: 1.5rem;

  display: grid;

  @media (--desktop) {
    text-align: center;
    margin: var(--ws) auto;
    max-width: 700px;
    grid-template-columns: 1fr 1fr;
  }

  @media (--mobile) {
    grid-template-columns: 1fr;
    margin: 0;
  }

  & li {
    line-height: 1.5;

    @media (--desktop) {
      display: inline;
      padding: 0 calc(var(--ws) / 4);
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