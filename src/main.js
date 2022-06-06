import { createApp } from 'vue';
import { createI18n } from "vue-i18n";
import App from './App.vue';
import router from './router';
import { films } from './films.json';
import { findDirector, slugify, categories } from '../functions.js'
import languages from './lang'

const navItems = [
	'about',
	'film',
	'directors',
	'animation',
	'interactive',
	'jobs',
	'contact'
];

async function fetchData(category) {
	try {
		if (!categories(films).includes(category)) throw 'No such category 🤷🤷🤷';
		return await fetch(`${window.location.origin}/api/films/${category}`).then(res => res.json());
		// return import(`./../data/${category}.json`).then(e => e.default);
	}
	catch (e) {
		console.error(e);
	}
}

const i18n = createI18n({
	legacy: false,
	locale: localStorage.getItem('lang') || 'en',
	globalInjection: true,
	...languages,
});

createApp(App)
	.provide('navItems', navItems)
	.provide('slugify', slugify)
	.provide('fetchData', fetchData)
	.provide('films', films)
	.provide('findDirector', findDirector)
	.use(i18n)
	.use(router)
	.mount('#app');