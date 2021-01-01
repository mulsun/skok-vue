<template>
  <div class="content">
    <h2
      :class="$route.name === 'Home' ? 'sr-only' : 'sub'"
      class="page-title"
    >{{ page.director??page.title }}</h2>
    <div
      v-if="fetchedVideos"
      class="grid"
      :class="grid ? 'grid-3' : 'grid-1'"
    >
      <div
        v-for="(video, i) in fetchedVideos"
        :key="i"
        class="film"
        id="video"
      >
        <router-link :to="
        { 
          name: 'Video',
          params: { 
            vid: video.uri,
            category: to??$route.name.toLowerCase(),
            title: $route.name,
            slug: slugify(video.name),
            directorSlug: slugify(page.director)??''
          }
        }
        ">
          <figure>
            <img
              :src="video.pictures.uri"
              alt=""
              class="thumbnail"
            >
          </figure>
          <span class="details">
            <span class="title">
              {{video.name}}
            </span>
            <span class="description">{{video.description}}</span>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { ref, reactive, inject, watchEffect, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { films } from '../films.json'

  export default {
    props: {
      to: {
        type: String,
        default: null,
      },
      grid: {
        type: Boolean,
        default: true,
      }
    },
    setup() {
      const route = useRoute()
      const router = useRouter()
      const slugify = inject('slugify')
      const fetchData = inject('fetchData')
      const fetchedVideos = ref(null)
      const page = reactive({
        title: computed(() => route.name),
        director: computed(() => Object.keys(films.director).find(e => slugify(e) === route.params.slug)),
      })
      const filmComponent = Object.keys(films).pop().indexOf(route.name)

      watchEffect(
        async () => {
          if(filmComponent) {
            await fetchData(page.director??route.name.toLowerCase(), fetchedVideos)
          }
        }
      )

      router.beforeEach(() => {
      });

      router.afterEach(() => {
      });

      return {
        fetchedVideos,
        slugify,
        page
      }
    }
  }
</script>