<template>
  <div class="reel">
    <router-link class="reel-title" to="/film/pubg-mobile-ramadan?autoplay">
      PUBG Mobile<br />Ramadan
    </router-link>
    <video id="reel" playsinline muted loop autoplay>
      <source src="/videos/reel.mp4" type="video/mp4" />
    </video>
    <ProgressBar :duration="duration" />
  </div>
  <Film class="content-home" grid="home" to="film" />
</template>
<script setup>
import { onMounted } from "vue";
import Film from "./Film.vue";
import ProgressBar from "../components/progress-bar.vue";

onMounted(() => {
  const duration = (document.getElementById("reel").onloadedmetadata =
    function () {
      return `${this.duration}s`;
    });
});
</script>
<style lang="postcss">
.content-home {
  & .pubg-mobile-ramadan {
    display: none;
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
    display: none;
    padding: 0 var(--padding);
  }

  & .reel-title {
    @media (--desktop) {
      left: 0;
      bottom: 0;
      position: absolute;
      z-index: 3;
      margin: var(--padding);
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
