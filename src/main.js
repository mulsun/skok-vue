import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { films } from './films.json'

const unauthToken = '6ca7dc0633b646b2abba1c4d28a14a6d'
const fetchUri = (videoIds) => `https://api.vimeo.com/videos?uris=${videoIds}&access_token=${unauthToken}&fields=uri,name,description,pictures.uri`

const slugify = (s) =>
	s.toLowerCase()
		.normalize('NFD') // normalize code points
		.replace('ı', 'i') // exception
		.replace(/[\u0300-\u036f]/g, "") //remove diacritics
		.replace(/\s+|_/g, '-') //spaces underscores to dashes
		.replace(/[^\w-]+/g, '') //remove non-words
		.replace(/--+/g, '-') //collapse multiple dashes
		.replace(/^-+/, '') //trim starting dash
		.replace(/-+$/, ''); //trim ending dash

async function fetchData(obj) {
	Object.entries(obj).forEach(async ([key, value]) => {
		if (Array.isArray(value)) {
			fetch(fetchUri(value.map(id => `/videos/${id}`).join(',')))
				.then(e => e.json())
				.then(e => {
					Object.values(e.data).forEach((val) => {
						val.uri = val.uri.split('/').pop()
						val.pictures.uri = val.pictures.uri.split('/').pop()
						val.slug = slugify(val.name)
					})
					sessionStorage.setItem(key, JSON.stringify(e.data))
				})
				.catch(error => console.log(error));
		}
		else {
			await fetchData(value)
		}
	})
}

const app = createApp(App)
app.provide('films', films)
app.provide('slugify', slugify)
app.provide('fetchData', fetchData)
app.use(router).mount('#app')