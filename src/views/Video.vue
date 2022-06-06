<template>
  <div class="content video-content">
    <div
      id="vimeoContainer"
      :style="`background-image:url(${page.image})`"
      :data-vimeo-id="page.id"
    />
    <h1 id="pageTitle" class="page-title">{{ page.name }}</h1>
    <h2 v-if="page.director">
      {{ page.director }}
    </h2>
    <p class="page-description">{{ page.description }}</p>
  </div>
</template>
<script setup>
import { reactive, inject, onMounted } from "vue";
import { useRoute } from "vue-router";
import Player from "@vimeo/player";

const route = useRoute();
const films = inject("films");
const findDirector = inject("findDirector");
const fetchData = inject("fetchData");

const page = reactive({
  director: findDirector(films.director, route.params.directorSlug),
  category:
    route.params.directorSlug != ""
      ? route.params.directorSlug
      : route.params.category,
});

function createVimeo(id) {
  const player = new Player("vimeoContainer", {
    id,
    dnt: true,
    title: false,
    byline: false,
    portrait: false,
    color: "ffffff",
    playsinline: false,
    autoplay: window.location.search.substring(1) === "autoplay",
  });

  player.on("loaded", () => {
    document.getElementById("vimeoContainer").removeAttribute("style");
  });
}

onMounted(async () => {
  console.log(page.category);
  if (page.category != "reel") {
    await fetchData(page.category)
      .then((e) => {
        return e.find((e) => route.params.slug === e.slug);
        // compare arrays split(-)   ?? e.find(e => e.slug.startsWith(route.params.slug.split('-',4).join('-')));
      })
      .then((e) => {
        page.id = e.id;
        page.name = e.name.replace(/( \/ )/, "\n");
        page.image = e.image;
        page.description = e.description;
      })
      .catch((e) => {
        // return router.push('/404')
        console.log(e);
      });
  }

  createVimeo(page.id || route.params.vid);
  document.title = `${page.name}${
    page.director ? " - " + page.director : ""
  } | SKOK Film`;
});
</script>
<style lang="postcss">
.video-content {
  & .page-title,
  & .page-description {
    max-width: 480px;
  }

  & .page-title {
    text-align: left;
    font-size: 2rem;
    margin: 2rem 0 0.5rem;
  }

  & .page-description {
    white-space: break-spaces;

    @media (--desktop) {
      max-width: 40vw;
    }
  }
}

#vimeoContainer {
  aspect-ratio: 16/9;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #000;
  line-height: 0;

  & iframe {
    width: 100%;
    height: 100%;

    &:focus {
      outline: 1px solid var(--site-bg);
    }
  }
}
</style>
