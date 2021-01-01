import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { films } from './films.json'
import { slugify } from './../functions'

async function fetchData(category) {
	try {
		// Join and fetch vimeo ids
		const res = await (await fetch(`/api/films/${category}`).json());
		return res.data;
	}
	catch (e) {
		console.error(e);
	}
}


/*
function filterObj(array, value, key) {
	return array.filter(key ?
		a => a[key] === value :
		a => Object.keys(a).some(k => a[k] === value)
	);
}
*/

const app = createApp(App);
app.provide('films', films);
app.provide('fetchData', fetchData);
app.provide('slugify', slugify);
app.use(router).mount('#app');