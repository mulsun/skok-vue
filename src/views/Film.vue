<template>
  <div class="content">
    <h2 :class="isHome ? 'sr-only' : ''" class="page-title">{{ pageTitle }}</h2>
    <div class="isLoading" v-if="isLoading">
      <div class="dot-pulse"></div>
      <span aria-live="polite" aria-busy="true" class="sr-only">Loading ...</span>
    </div>
    <div v-else class="grid" :class="grid ? 'grid-3' : 'grid-1'">
      <div
        v-for="(video, i) in fetchedVideos"
        :key="i"
        class="film"
        id="video"
      >
        <router-link :to="{ 
          name: videoRouteName, 
          params: { vid: video.video_id, slug: slugify(video.title), title: video.title, directorSlug: slugify(pageTitle) }}
        ">
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
  </div>
</template>
<script>
  import { ref, inject, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

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
    setup(props) {
      const route = useRoute()
      const router = useRouter()
      const slugify = inject('slugify')
      const films = inject('films')
      const isLoading = ref(true)
      const fetchedVideos = ref(null)
      const isHome = props.source === 'home'
      const currentDirector = Object.keys(films.director).find(e => slugify(e) === route.params.slug)
      const dataArray = ref(currentDirector ? films.director[currentDirector] : (isHome ? films.film.slice(0, 9) : films[route.name.toLowerCase()]))
      const pageTitle = ref(route.meta.title ? route.meta.title : currentDirector)
      const videoRouteName = route.name === 'Director' ? 'Director Video' : 'Video'
      
      async function fetchData() {
        isLoading.value = true
        // if(['Home', 'Film', 'Interactive', 'Animation', 'Director'].indexOf(route.name) === -1) return false
        // dataArray.value = currentDirector ? films.director[currentDirector] : (isHome ? films.film.slice(0, 9) : films[route.name.toLowerCase()])
        const promises = dataArray.value.map((url) =>
          fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${url}&width=${isHome ? '1280' : '640'}`)
          .then(res => res.json())
          .then(res => {
            res.slug = slugify(res.title)
            return res
          })
        );

        fetchedVideos.value = await Promise.all(promises).then(results => {
          isLoading.value = false
          return results
        })
      }

      watch(
          () => route.name,
          () => {
          // pageTitle.value = route.meta.title ? route.meta.title : currentDirector
          // fetchData()
      })

      router.afterEach(() => {
          pageTitle.value = route.meta.title ? route.meta.title : currentDirector
          fetchData()
      });

      onMounted(() => {
        fetchData()
      })

      return {
        fetchedVideos,
        videoRouteName,
        slugify,
        isLoading,
        isHome,
        pageTitle,
      }
    }
  }
</script>