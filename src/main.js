import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { films } from './films.json'
import { slugify } from './../functions'

/*
const unauthToken = '6ca7dc0633b646b2abba1c4d28a14a6d'
const fetchUri = (videoIds) => `https://api.vimeo.com/videos?uris=${videoIds}&access_token=${unauthToken}&fields=uri,name,description,pictures.uri`

async function fetchData(arr) {
	const data = films[arr] ?? films.director[arr];
	try {
		// Join and fetch vimeo ids
		const res = await (await fetch(fetchUri(data.map(id => '/videos/' + id).join(',')))).json();

		// Manipulate result
		Object.values(res.data).forEach((e) => {
			e.uri = e.uri.split('/').pop();
			e.pictures.uri = 'https://i.vimeocdn.com/video/' + e.pictures.uri.split('/').pop() + (arr === 'home' ? '_1920x1080.webp' : '_640x360.webp');
			e.slug = slugify(e.name);
		})
		return res.data;
	}
	catch (e) {
		console.error(e);
	}
}

async function fetchCurrentCategory(category, fetchedVideos) {
	if (sessionStorage.getItem(category) === null) {
		const data = await fetchData(category)
		sessionStorage.setItem(category, JSON.stringify(data));
	}

	fetchedVideos.value = JSON.parse(sessionStorage.getItem(category));
}


function filterObj(array, value, key) {
	return array.filter(key ?
		a => a[key] === value :
		a => Object.keys(a).some(k => a[k] === value)
	);
}
*/

const app = createApp(App);
app.provide('films', films);
app.provide('slugify', slugify);
// app.provide('fetchCurrentCategory', fetchCurrentCategory);
app.use(router).mount('#app');