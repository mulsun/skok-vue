<template>
  <div class="content">
    <h2 class="page-title">{{ title }}</h2>
    <div id="vimeoContainer" />
  </div>
</template>
<script>
import { onMounted, ref, inject } from 'vue'
import { useRoute } from 'vue-router';
import Player from '@vimeo/player';

  export default {
		setup() {
      const route = useRoute()
      const films = inject('films')
      const vimeoId =  ref(null)
      const isLoading = ref(true)
      const slugify = inject('slugify')
      const fetchedVideos = ref(null)
      const currentDirector = Object.keys(films.directors).find(e => slugify(e) === route.params.directorSlug)
      const pageData = route.name === 'Video' ? films.all : films.directors[currentDirector]
      const title = ref(null)

      function filterObj(array, value, key) {
        return array.filter(key ?
          a => a[key] === value :
          a => Object.keys(a).some(k => a[k] === value)
        );
      }

      function fetchData() {
        const promises = pageData.map(url =>
          fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${url}&width=640`)
          .then(res => res.json())
          .then(res => {
            res.slug = slugify(res.title)
            return res
          })
        );
        fetchedVideos.value = Promise.all(promises).then(results => {
          isLoading.value = false
          return results
        })
      }

      onMounted(async () => {
        await fetchData()
        const filtered = filterObj(await fetchedVideos.value, route.params.slug, 'slug')[0]
        vimeoId.value = filtered.video_id
        title.value = route.name === 'Video' ? filtered.title : `${filtered.title} - ${currentDirector}`
        const el = document.getElementById("vimeoContainer")
        el.setAttribute('data-vimeo-id', vimeoId.value)
        new Player(el)
      })

			return {
        route,
        vimeoId,
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