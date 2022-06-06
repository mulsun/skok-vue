<template>
  <div>
    <Carousel style="display: none" v-if="!isMobile" />
    <div class="reel" v-if="!isMobile">
      <router-link class="reel-title" to="/film/pubg-mobile-ramadan?autoplay">
        PUBG Mobile<br />Ramadan
      </router-link>
      <video
        id="reel"
        playsinline
        muted
        loop
        autoplay
        poster="https://i.vimeocdn.com/video/1127687466-c70a2c92a4dff9e65f9f875b9f1928168179a9b0386019250ab4e5374537ac2d-d"
      >
        <source src="/videos/reel.mp4" type="video/mp4" />
      </video>
      <ProgressBar :duration="duration" />
    </div>
    <Film class="content-home" grid="home" to="film" />
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import Film from "./Film.vue";
import ProgressBar from "../components/progress-bar.vue";
import Carousel from "../components/carousel.vue";

const isMobile = ref();
const observer = new ResizeObserver(([entry]) => {
  isMobile.value = entry.contentRect.width <= 991;
});

onMounted(() => {
  observer.observe(document.documentElement);
  const duration = (document.getElementById("reel").onloadedmetadata =
    function () {
      return `${this.duration}s`;
    });
});

onBeforeUnmount(() => {
  observer.unobserve(document.documentElement);
});
</script>
<style lang="postcss">
.content-home {
  & .pubg-mobile-ramadan {
    display: none;
  }
}

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
      bottom: 0;
      position: absolute;
      z-index: 3;
      margin: var(--ws);
    }

    font-size: clamp(3rem, 4vw, 10rem);
    font-weight: 900;
    line-height: 0.75;
    color: #fff;
  }

  & video {
    width: 100%;
  }
}
</style>
