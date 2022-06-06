<template>
  <div class="content">
    <h1 id="pageTitle" class="page-title reel-title">
      {{ title }}
    </h1>
    <div class="grid grid-3">
      <div v-for="(video, i) in data" :key="i" :class="`film ${video.slug}`">
        <router-link
          :to="{
            name: 'Video',
            params: {
              vid: video.id,
              category: $route.name.toLowerCase(),
              title: $route.name,
              slug: video.id,
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
            <span v-if="$route.name !== 'Home'" class="description">
              {{ video.description }}
            </span>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const data = ref(null);
const slugify = inject("slugify");
const route = useRoute();
const title = route.params.title.replace(/-/g, " ");
const vimeoUri = (videoIds, APIKEY) =>
  `https://api.vimeo.com/videos?uris=${videoIds}&access_token=${APIKEY}&fields=uri,name,description,pictures.sizes`;

async function fetchData() {
  return await fetch(
    vimeoUri(
      route.params.ids
        .split(",")
        .map((id) => `/videos/${id}`)
        .toString(),
      "914a40ee66d36987a7b69f8c41e983bd"
    )
  )
    .then((res) => res.json())
    .then((rj) => {
      rj.data.forEach((e) => {
        e.id = Number(e.uri.split("/").pop());
        e.slug = slugify(e.name);
        e.image = e.pictures.sizes[0].link.split("_")[0];
        delete e.pictures;
        delete e.uri;
      });
      return rj.data;
    });
}

onMounted(async () => {
  data.value = await fetchData();
});
</script>
<style lang="postcss">
.reel-title {
  text-transform: capitalize;
}
</style>