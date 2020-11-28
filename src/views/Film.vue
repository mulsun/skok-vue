<template>
  <div class="content">
    <h2 class="page-title">{{ title }}</h2>
    <div class="isLoading" v-if="isLoading">
      <div class="dot-pulse"></div>
      <span aria-live="polite" aria-busy="true" class="sr-only">Loading ...</span>
    </div>
    <div v-else class="grid grid-3">
      <div
        v-for="(video, i) in fetchedVideos"
        :key="i"
        class="film"
        id="video"
      >
        <router-link :to="{ 
          name: routeName, 
          params: { vid: video.video_id, slug: slugify(video.title), title: video.title, directorSlug: slugify(title) }}
        ">
          <figure>
            <img
              :src="video.thumbnail_url"
              :alt="video.title"
              class="thumbnail"
            >
          </figure>
          <span class="title">
            {{video.title}}
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
    setup() {
      const route = useRoute()
      const router = useRouter()
      const isLoading = ref(true)
      const slugify = inject('slugify')
      const films = inject('films')
      const fetchedVideos = ref(null)
      const currentDirector = Object.keys(films.director).find(e => slugify(e) === route.params.slug)
      const title = ref(route.meta.title ? route.meta.title : currentDirector)
      const routeName = route.name === 'Director' ? 'Director Video' : 'Video'
      const dataSource = currentDirector ? films.director[currentDirector] : films[route.name.toLowerCase()]

      async function fetchData() {
        isLoading.value = true
        console.log(route.name.toLowerCase())
        const promises = dataSource.map(url =>
          fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${url}&width=640`)
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

      router.afterEach((to, from) => {
          console.log(to, from)
          title.value = route.meta.title ? route.meta.title : currentDirector
          fetchData()
      });
        
      watch(
        /*
        () => route.name,
        () => {
          title.value = route.meta.title ? route.meta.title : currentDirector
          fetchData()
        }
        */
      )

      onMounted(() => {
        fetchData()
      })

      return {
        fetchedVideos,
        slugify,
        isLoading,
        title,
        routeName
      }
    }
  }
</script>