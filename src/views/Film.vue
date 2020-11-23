<template>
  <div class="content">
    <h2 class="page-title">{{ title }}</h2>
    <div class="isLoading" v-if="isLoading">Loading ...</div>
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
  import { useRoute } from 'vue-router'

  export default {
    setup() {
      const route = useRoute()
      const isLoading = ref(true)
      const slugify = inject('slugify')
      const films = inject('films')
      const fetchedVideos = ref(null)
      const currentDirector = Object.keys(films.directors).find(e => slugify(e) === route.params.slug)
      const title = ref(route.meta.title ? route.meta.title : currentDirector)
      const routeName = route.name === 'Film' ? 'Video' : 'Director Video'

      async function fetchData() {
        isLoading.value = true
        const page = route.meta.dataSource
        const dataSource = page === 'directors' ? films[route.meta.dataSource][currentDirector] : films[route.meta.dataSource]
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

      watch(
        () => route.name,
        () => {
          title.value = route.meta.title ? route.meta.title : currentDirector
          fetchData()
        }
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