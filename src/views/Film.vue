<template>
  <div class="content">
    <h2
      :class="isHome ? 'sr-only' : 'sub'"
      class="page-title"
    >{{ page.director??page.title }}</h2>
    <div
      v-if="data"
      class="grid"
      :class="grid ? 'grid-3' : 'grid-1'"
    >
      <div
        v-for="(video, i) in data"
        :key="i"
        class="film"
        id="video"
      >
        <router-link :to="
        { 
          name: 'Video',
          params: { 
            vid: video.id,
            category: to??$route.name.toLowerCase(),
            title: $route.name,
            slug: slugify(video.name),
            directorSlug: slugify(page.director)??''
          }
        }
        ">
          <figure>
            <img
              :src="video.images[isHome ? 'hq' : 'lq']"
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
  import { ref, reactive, inject, onBeforeUnmount, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
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
      const slugify = inject('slugify')
      const fetchData = inject('fetchData')
      const data = ref(null)
      const isHome = route.name === 'Home'
      const getDirector = Object.keys(films.director).find(e => slugify(e) === route.params.slug)
      const page = reactive({
        title: route.name,
        director: getDirector 
      })

      watchEffect(async(onInvalidate) => {
        page.title = route.name
        page.director = getDirector
        data.value = await fetchData(route.params.slug??route.name.toLowerCase())

        onInvalidate(() => {
          data.value = null
          //
        })
      })

      onBeforeUnmount(() => data.value = null)

      return {
        data,
        slugify,
        page,
        isHome
      }
    }
  }
</script>