<template>
  <div class="content">
    <h1 id="pageTitle" class="page-title directors-title">
      <span v-if="isOffline">
        {{ category || $t("directors.offline") }}
      </span>
      {{ $t("directors.title") }}
    </h1>
    <ul class="grid-dir">
      <li v-for="(director, i) in directors" :key="i">
        <router-link
          :to="{
            name: 'Director',
            params: { directorSlug: directorSlug(director) },
            state: { title: director },
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
const category = route.params?.category;
const directorSlug = (director) => slugify(director);
const directorImage = (director) =>
  `/images/directors/${isOffline ? "offline/" : ""}${slugify(director)
    .split("-")
    .pop()}.jpg`;

let directors;

if (category) {
  const filterByCategory = (arr) =>
    arr.filter((e) => e.category?.includes(category)).map((e) => e.name);
  directors = [
    ...filterByCategory(films.directors),
    ...filterByCategory(films.offlineDirectors),
  ].sort();
} else {
  const filterAndSort = (arr) => arr.map((e) => e.name).sort();
  directors = isOffline
    ? filterAndSort(films.offlineDirectors)
    : filterAndSort(films.directors);
}

if (isOffline) {
  const meta = document.createElement("meta");
  meta.name = "robots";
  meta.content = "noindex";
  document.head.appendChild(meta);
}
</script>
<style lang="postcss">
.directors-title {
  text-transform: capitalize;
}

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
