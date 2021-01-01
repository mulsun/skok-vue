<template>
  <div class="content">
    <h2 class="page-title">{{ page.title }}</h2>
    <div id="vimeoContainer">
      <iframe
        frameborder="0"
        allowFullScreen
        :src="`https://player.vimeo.com/video/${page.id}`"
      ></iframe>
    </div>
  </div>
</template>
<script>
import { ref, reactive, inject, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';
// import Player from '@vimeo/player';

  export default {
		setup() {
      const route = useRoute()
      const films = inject('films')
      const slugify = inject('slugify')
      const fetchData = inject('fetchData')
      const fetchedVideos = ref(null)

      const page = reactive({
        // currentObj: () => Object.values(fetchedVideos.value).filter((e) => e.slug === route.params.slug),
        // videoURL: computed(() =>`https://player.vimeo.com/video/${page.currentObj()[0].id}`),
        // title: computed(() => page.director ? `${page.currentObj()[0].name} - ${page.director}` : page.currentObj()[0].name),
        director: Object.keys(films.director).find(e => slugify(e) === route.params.directorSlug),
        category: computed(() => page.director ?? route.params.category),
      })

      onMounted(async () => {
        fetchedVideos.value = await fetchData(page.category)
        const currentObj = Object.values(fetchedVideos.value).filter((e) => e.slug === route.params.slug);
        page.id = currentObj[0].id;
        page.title = page.director ? currentObj[0].name + '-' + page.director : currentObj[0].name
      })

			return {
        route,
        page
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