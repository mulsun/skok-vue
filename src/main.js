import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { films } from './films.json'
import { slugify } from './../functions'

async function fetchData(category) {
	try {
		const categories = [...Object.keys(films.director), ...Object.keys(films)].map(e => slugify(e));
		if (!categories.includes(category)) throw 'No such category 🤷';
		return await (await fetch(`${window.location.origin}/api/films/${category}`)).json();
	}
	catch (e) {
		console.error(e);
	}
}

const app = createApp(App);
app.provide('films', films);
app.provide('fetchData', fetchData);
app.provide('slugify', slugify);
app.use(router).mount('#app');