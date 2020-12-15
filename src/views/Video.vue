<template>
  <div class="content">
    <h2 class="page-title">{{ title }}</h2>
    <div class="vimeoContainer">
      <iframe
        ref="iframe"
        frameborder="0"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</template>
<script>
import { onBeforeMount, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router';
// import Player from '@vimeo/player';

  export default {
		setup() {
      const route = useRoute()
      const router = useRouter()
      const films = inject('films')
      const slugify = inject('slugify')
      const fetchedVideos = ref(null)
      const currentDirector = Object.keys(films.director).find(e => slugify(e) === route.params.directorSlug)
      const title = ref(null)

      function filterObj(array, value, key) {
        return array.filter(key ?
          a => a[key] === value :
          a => Object.keys(a).some(k => a[k] === value)
        );
      }

      onBeforeMount(async () => {
        if(['Video', 'Director Video'].indexOf(route.name) === -1) return false
        const filtered = filterObj(await fetchedVideos.value, route.params.slug, 'slug')[0]
        title.value = route.name === 'Video' ? filtered.title : `${filtered.title} - ${currentDirector}`
        router.push({ params: { title: title.value }})
        const el = document.getElementById("vimeoContainer")
        el.setAttribute('src', `https://player.vimeo.com/video/${filtered.id}`)
      })

			return {
        route,
        title
      }
		}
  }
</script>
<style lang="postcss">
#vimeoContainer {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;

  & iframe,
  & object,
  & embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>