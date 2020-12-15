<template>
  <div class="content">
    <h2
      :class="page.isHome ? 'sr-only' : 'sub'"
      class="page-title"
    >{{ page.title??page.director }}</h2>
    <div
      class="grid"
      :class="grid ? 'grid-3' : 'grid-1'"
    >
      <div
        v-for="(video, i) in fetchedVideos"
        :key="i"
        class="film"
        id="video"
      >
        <router-link :to="{ 
          name: page.videoRoute, 
          params: { 
            vid: video.uri, 
            cat: $route.name === 'home' ? 'film' : $route.name.toLowerCase(), 
            slug: slugify(video.name), 
            title: video.name, 
            directorSlug: slugify(page.title??page.director) }}
        ">
          <figure>
            <img
              :src="`https://i.vimeocdn.com/video/${video.pictures.uri}${page.isHome ? '_1920x1080' : '_640x360'}.webp`"
              :alt="video.name"
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
  import { ref, reactive, inject, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { films } from '../films.json'

  export default {
    props: {
      source: {
        type: String,
        default: 'film'
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
      const currentDirector = Object.keys(films.director).find(e => slugify(e) === route.params.slug)
      const getData = ref(currentDirector ? currentDirector : route.name.toLowerCase())
      const fetchedVideos = reactive(JSON.parse(sessionStorage.getItem(getData.value)))

      const page = reactive({
        isHome: route.name === 'Home',
        director: Object.keys(films.director).find(e => slugify(e) === route.params.slug),
        title: route.meta.title,
        videoRoute: route.name === 'Director' ? 'Director Video' : 'Video'
      })

      onMounted(async () => {
        if (sessionStorage.length <= 1) {
          await fetchData(films)
        }

        router.push({ params: { title: page.title }})
      })

      watch(
          () => route.name,
          () => {
          // pageTitle.value = route.meta.title ? route.meta.title : currentDirector
      })

      
      router.afterEach(() => {
          page.title = route.meta.title ?? Object.keys(films.director).find(e => slugify(e) === route.params.slug)
          // console.log('after', route.name, fetchedVideos)
          console.log(page)
      });
      
     router.beforeEach(() => {
       // console.log('before', route.name, fetchedVideos)
     });

      return {
        fetchedVideos,
        slugify,
        page
      }
    }
  }
</script>