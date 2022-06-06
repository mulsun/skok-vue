import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { films } from './films.json';
import { findDirector, slugify, categories } from '../functions.js'

async function fetchData(category) {
	try {
		if (!categories(films).includes(category)) throw 'No such category 🤷🤷🤷';
		// return await fetch(`${window.location.origin}/api/films/${category}`).then(res => res.json());
		return import(`./../data/${category}.json`).then(e => e.default);
	}
	catch (e) {
		console.error(e);
	}
}

createApp(App)
	.provide('slugify', slugify)
	.provide('fetchData', fetchData)
	.provide('films', films)
	.provide('findDirector', findDirector)
	.use(router)
	.mount('#app');