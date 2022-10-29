<template>
  <swiper
    :slides-per-view="1"
    :space-between="0"
    :loop="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :modules="modules"
    :autoplay="{ delay: 5000 }"
    navigation
  >
    <swiper-slide v-for="(film, i) in homeFilms" :key="i">
      <h2>
        <router-link
          :to="{
            name: 'Video',
            params: {
              slug: titles[i].slug,
              category: 'film',
            },
          }"
        >
          {{ titles[i].title }}
        </router-link>
      </h2>
      <iframe
        title="1"
        crossorigin="anonymous"
        :src="`https://player.vimeo.com/video/${film}?background=1&autoplay=1&loop=1&byline=0&title=0`"
        allowfullscreen
      ></iframe>
    </swiper-slide>
  </swiper>
</template>
<script setup>
// Import Swiper Vue.js components
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { inject, ref, onMounted } from "vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const { home } = inject("films");
const homeFilms = home.slice(0, 6);
const titles = [
  {
    title: "Castrol Babalar Günü",
    slug: "castrol-babalar-gunu",
  },
  {
    title: "Castrol Auto Service",
    slug: "castrol-auto-service-man",
  },
  {
    title: "ŠKODA",
    slug: "skodanizin-dilinden-en-iyi-skoda-yetkili-servisleri-anlar",
  },
  {
    title: "ŠKODA",
    slug: "skodanizin-dilinden-en-iyi-skoda-yetkili-servisleri-anlar",
  },
  {
    title: "PUBG Mobile Ramadan",
    slug: "pubg-mobile-ramadan",
  },
  {
    title: "Maylo Puf",
    slug: "maylo-puf-elinin-altinda-kahve",
  },
];

const modules = [Navigation, Autoplay];
</script>
<style lang="postcss">
.swiper {
  --swiper-theme-color: var(--text-color);

  position: absolute;
  margin-top: 0;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--site-bg);

    &:nth-child(2n) {
      --site-bg: black;
      --text-color: white;

      flex-direction: row-reverse;
    }
  }

  & .swiper-button-prev,
  & .swiper-button-next {
    --swiper-navigation-size: 36px;

    &:hover {
      --swiper-navigation-size: 48px;
    }
  }

  & .swiper-button-prev {
    left: var(--ws);
  }

  & .swiper-button-next {
    right: var(--ws);
  }

  & iframe {
    border: 0;
    aspect-ratio: 16 / 9;
    width: 100%;
  }

  & h2 {
    text-transform: uppercase;
    letter-spacing: -1px;
    max-width: 50vw;
    text-align: center;
    font-size: 80px;
    line-height: 1;
    position: relative;
    z-index: 10;
    margin: var(--ws);
    /*
    left: var(--ws);
    bottom: var(--ws);
    text-align: left;
    color: var(--text-color);
    */
  }
}
</style>
