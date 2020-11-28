<template>
  <div>
    <div
      class="grid"
      :class="toggleGrid ? 'grid-3' : 'grid-1'"
    >
      <div
        v-for="(video, i) in fetchedVideos"
        :key="i"
        class="film"
        id="video"
      >
        <router-link :to="{ name: 'Video', params: { vid: video.video_id, slug: slugify(video.title), title: video.title }}">
          <figure>
            <img
              :src="video.thumbnail_url"
              :alt="video.title"
              class="thumbnail"
            >
          </figure>
          <span class="details">
            <span class="title">
              {{video.title}}
            </span>
            <span class="description">{{video.description}}</span>
          </span>
        </router-link>
      </div>
    </div>
    <button
      @click="toggleGrid = !toggleGrid"
      class="toggle-grid"
    >
      <span class="gg-display-grid"></span>
      <span class="sr-only">Change View</span>
    </button>
  </div>
</template>
<script>
  import { ref, inject, onBeforeMount } from 'vue'

  export default {
    setup() {
      const toggleGrid = ref(false)
      const slugify = inject('slugify')
      const films = inject('films')
      const fetchedVideos = ref(null)

      onBeforeMount(async () => {
        const promises = films.film.slice(0, 9).map(url =>
          fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${url}&width=1280`)
          .then(res => res.json())
          .then(res => {
            res.slug = slugify(res.title)
            return res
          })
        );
        fetchedVideos.value = await Promise.all(promises).then(results => results)
      })
      
      return {
        fetchedVideos,
        slugify,
        toggleGrid
      }
    }
  }
</script>
<style lang="postcss" scoped>
.grid-3 {
  & .description {
    display: none;
  }
}

.grid-1 {
  & .title {
    display: block;
    font-size: 3.5vw;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 10px;
  }

  & .details {
    display: block;
    margin-top: -40px;
    padding: var(--mobile-padding);
  }

  & .film {
    min-height: 360px;
  }
}

.grid-1 {
  & .details {
    display: block;
    position: relative;
    z-index: 1;
    max-width: 480px;
    background-color: #000;

    @media (min-width: 992px) {
      padding-left: 0;
    }
  }

  & .thumbnail {
    width: 100%;
    object-fit: cover;
  }
}

.toggle-grid {
  padding: 0;
  border: 0;
  position: fixed;
  left: 16px;
  top: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 991px) {
    display: none;
  }
}

/* https://css.gg/menu-grid-r */
.gg-menu-grid-r {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 16px;
  height: 16px;

  &:before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    width: 4px;
    height: 4px;
    background: currentColor;
    box-shadow: 0 6px 0, 6px 6px 0, 12px 6px 0, 6px 12px 0, 12px 12px 0, 6px 0 0,
      12px 0 0, 0 12px 0;
  }
}

.gg-display-grid {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs,1));
  height: 14px;
  width: 14px;
  border: 2px solid transparent;
  box-shadow: 0 0 0 2px;

 &:before,
 &:after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 4px;
  border-right: 4px solid;
  border-left: 4px solid;
  top: 0;
  left: 0;
 }

 &:before {
   top: 6px;
 }
}
</style>
