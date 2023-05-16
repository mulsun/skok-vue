<template>
  <div class="content video-content">
    <div v-if="page.id" id="vimeoContainer" :data-vimeo-id="page.id">
      <iframe
        :src="`https://player.vimeo.com/video/${page.id}?badge=0&amp;autopause=0&amp;title=0&amp;byline=0&amp;portrait=0&amp;amp;playsinline=0&amp;dnt=1&amp;app_id=58479`"
        allowfullscreen
        frameborder="0"
        :title="page.name"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
      />
    </div>
    <h1 id="pageTitle" class="page-title">{{ page.name }}</h1>
    <span class="page-dir-title sr-only" v-if="page.director">
      {{ page.director }}
    </span>
  </div>
</template>
<script setup>
import { reactive, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// import Player from "@vimeo/player";

const route = useRoute();
const router = useRouter();
const films = inject("films");
const findDirector = inject("findDirector");
const fetchData = inject("fetchData");

const page = reactive({});

/*
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
    const vc = document.getElementById("vimeoContainer");
    vc.setAttribute("crossorigin", "anonymous");
    vc.children[0].remove();
  });
}
*/

onMounted(async () => {
  router.isReady().then(async () => {
    const { category, directorSlug } = route.params;
    if (directorSlug || (category && category != "reel")) {
      await fetchData(directorSlug || category)
        .then((item) => {
          const e = item.find((item) => route.params.slug === item.slug);
          page.id = e.id;
          page.name = e.name.replace(/( \/ )/, "\n");
          page.image = e.image;
          page.description = e.description;
          page.director = findDirector(films, directorSlug)?.name;
        })
        .catch((e) => {
          return e;
        });
    }
    // createVimeo(page.id || history.state.vid);
    document.title = `${page.name}${
      page.director ? " - " + page.director : ""
    } | SKOK Film`;
  });
});
</script>
<style lang="postcss">
.video-content {
  & .page-title,
  & .page-description {
    max-width: 500px;
  }

  & .page-title {
    text-align: left;
    font-size: 2rem;
    margin: 2rem 0 0.5rem;
  }

  & .page-dir-title {
    margin: 0;
  }

  & .page-description {
    white-space: break-spaces;

    @media (--desktop) {
      max-width: 40vw;
    }
  }
}

#vimeoContainer {
  position: relative;
  aspect-ratio: 16/9;
  line-height: 0;

  & img {
    position: absolute;
    width: 100%;
  }

  & iframe {
    width: 100%;
    height: 100%;
    border: 0;

    &:focus {
      outline: 1px solid var(--site-bg);
    }
  }
}
</style>
