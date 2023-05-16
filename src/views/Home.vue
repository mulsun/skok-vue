<template>
  <div>
    <div id="reel" class="reel" v-if="!isMobile">
      <router-link class="reel-title" to="/film/norm-yarinlara-sozumuz-var">
        Teknosa //<br />Anne Intelligence
      </router-link>
      <iframe
        title="Teknosa Anne Intelligence"
        src="https://player.vimeo.com/video/954404407?background=1"
      ></iframe>
      <ProgressBar :duration="videoDuration" />
    </div>
    <Film class="content-home" grid="home" to="film" />
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import Film from "./Film.vue";
import ProgressBar from "../components/progress-bar.vue";

const videoDuration = ref();
const isMobile = ref();
const observer = new ResizeObserver(([entry]) => {
  isMobile.value = entry.contentRect.width <= 991;
});

onMounted(() => {
  observer.observe(document.documentElement);
});

onBeforeUnmount(() => {
  observer.unobserve(document.documentElement);
});
</script>
<style lang="postcss">
.grid-home {
  gap: calc(var(--ws) * 1);

  @media (--desktop) {
    margin-top: 100vh;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: auto;
    /*
    grid-template-areas: 
      "c0 c0 c0 c0 c0 c0"
      ". c1 c2 c2 . ."
      "c3 c4 c4 c4 c4 c4"
      "c5 c6 . . . ."
      ". c7 c8 . . ."
      "c9 c10 c10 c10 c10 c10"
      "c11 c11 c11 c12 c12 c12"
      ". c13 . . . ."
      ". c14 c15 c15 c15 c15"
      "c16 c17 c18 c18 c18 c18";
    */
  }

  & .title {
    display: block;
    font-size: clamp(1rem, 18px, 2rem);
    line-height: 1.2;
    letter-spacing: -1px;
  }

  & .film {
    grid-area: auto !important;

    @media (--mobile) {
      grid-area: auto !important;
    }

    @media (--desktop) {
      min-height: 320px;

      &:first-child {
        display: none;
      }
    }

    &:hover {
      opacity: 0.9;
    }
  }

  & .description {
    display: flex;
  }

  & .details {
    width: 100%;
  }

  & .thumbnail {
    width: 100%;
    object-fit: cover;
    transition: all ease-in 0.25s;
  }
}

.reel {
  position: absolute;
  margin-top: 0;
  overflow: hidden;
  left: 0;
  top: 0;
  width: 100%;
  max-height: 100vh;

  @media (--mobile) {
    padding: 0 var(--ws);
  }

  & .reel-title {
    @media (--desktop) {
      left: 0;
      bottom: var(--ws);
      position: absolute;
      z-index: 3;
      margin: var(--ws);
    }

    font-size: clamp(3rem, 4vw, 10rem);
    font-weight: 900;
    line-height: 0.75;
    color: #fff;
  }

  & video,
  & iframe {
    width: 100%;
  }

  & iframe {
    border: 0;
    height: 100vh;
  }
}
</style>
