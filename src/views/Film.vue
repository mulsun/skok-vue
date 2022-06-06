<template>
  <div class="content">
    <h1
      id="pageTitle"
      :class="[{ 'sr-only': $route.name === 'Home' }, 'page-title']"
    >
      {{ title }}
    </h1>
    <div v-if="data" class="grid" :class="`grid-${grid}`">
      <div
        v-for="(video, i) in data"
        :key="i"
        :class="`film ${video.slug}`"
        :style="$route.name === 'Home' ? `grid-area: c${i}` : ''"
      >
        <router-link
          :to="{
            name: 'Video',
            params: {
              vid: video.id,
              category: to ?? $route.name.toLowerCase(),
              title: $route.name,
              slug: video.slug,
              directorSlug: $route.params.directorSlug,
              vidName: video.name,
            },
          }"
        >
          <figure>
            <img :src="video.image" alt="" class="thumbnail" loading="lazy" />
          </figure>
          <span class="details">
            <span class="title">
              {{ video.name }}
            </span>
            <span v-if="$route.name !== 'Home'" class="description">{{
              video.description
            }}</span>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const props = defineProps({
  to: {
    type: String,
    default: null,
  },
  grid: {
    type: String,
    default: "3",
  },
});

const slugify = inject("slugify");
const route = useRoute();
const router = useRouter();
const films = inject("films");
const findDirector = inject("findDirector");
const fetchData = inject("fetchData");
const data = ref(null);
const { t } = useI18n();
let title = ref();

if (
  route.params.directorSlug &&
  !films.directors.find((e) => slugify(e) === route.params.directorSlug)
) {
  router.push("/404");
}

watchEffect(async (onInvalidate) => {
  onInvalidate(() => {
    data.value = null;
  }); // register cleanup function before Promise resolves

  title.value =
    findDirector(films.director, route.params.directorSlug) ??
    t(`nav.${route.name.toLowerCase()}`);

  data.value = await fetchData(
    route.params.directorSlug ?? route.name.toLowerCase()
  );
  console.log(data.value);
});
</script>