import { slugify, findDirector, categories } from './functions.js'
import fs from 'fs';
import express from 'express';
const app = express();
import history from 'connect-history-api-fallback';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import { config } from 'dotenv';

config();

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const APIKEY = process.env.UNAUTHTOKEN;
const vimeoParams = `access_token=${APIKEY}&fields=uri,name,description,pictures.sizes.link,created_time`;
const { films } = loadJSON('./src/films.json');
const photos = loadJSON('./src/photos.json');
const fileName = (fn, path = './data/', ext = 'json') => `${new URL(path, import.meta.url).pathname}${fn}.${ext}`;
const saveData = (data, fn) => fs.writeFileSync(fn, JSON.stringify(data), { flag: 'w' });
const readFile = (fn) => fs.readFileSync(fn, 'utf8');

function clearData(data) {
	// Simplify the result
	Object.values(data).forEach((e) => {
		e.id = Number(e.uri.split('/').pop());
		e.slug = slugify(e.name);
		// e.image = `/images/videos/${e.slug}.avif`;
		e.image = e.pictures.sizes[0].link.split("_")[0];
		delete e.pictures;
		delete e.uri;
	});
}

function sortData(data, compareTo, orderBy) {
	if (orderBy === 'date') {
		return data.sort((a, b) => new Date(b.created_time) - new Date(a.created_time));
	}
	return data.sort((a, b) => compareTo.indexOf(a.id) - compareTo.indexOf(b.id));
}

async function downloadFile(url, path) {
	const res = await fetch(url);
	const fileStream = fs.createWriteStream(path);
	await new Promise((resolve, reject) => {
		res.body.pipe(fileStream);
		res.body.on("error", reject);
		fileStream.on("finish", resolve);
	});
}

async function fetchData(category) {
	const vimeoUri = (videoIds) => `https://api.vimeo.com/videos?uris=${videoIds}&${vimeoParams}`;
	const filmsData = films[category] != undefined ? films[category] : films.director[findDirector(films, category).name];
	const file = fileName(category);

	try {
		if (!categories(films).includes(category)) throw 'No such category to fetch data 🤷';

		if (!fs.existsSync(file)) {
			// Join and fetch vimeo ids, todo: this could be done in express
			const res = await (await fetch(vimeoUri(filmsData.map(id => `/videos/${id}`).toString()))).json();
			clearData(res.data);
			sortData(res.data, filmsData);
			saveData(res.data, file);
		}

		// Read File
		return readFile(file);
	}
	catch (e) {
		return e;
	}
}

async function fetchDirector(directorName) {
	const vimeoDirectorVideosUri = (userId) => `https://api.vimeo.com/users/${userId}/videos?&${vimeoParams}`;
	const director = findDirector(films, directorName);
	const file = fileName(directorName);

	try {
		if (!director) throw 'No such director to fetch data 🤷';

		if (!fs.existsSync(file)) {
			await fetchDirectorImage(directorName);
			const res = await (await fetch(vimeoDirectorVideosUri(director.id))).json();
			clearData(res.data);
			saveData(res.data, file);
		}
		return readFile(file);
	}
	catch (e) {
		return e;
	}
}

export default async function fetchDirectorImage(directorName) {
	const vimeoDirectorUri = (userId) => `https://api.vimeo.com/users/${userId}?access_token=${APIKEY}&fields=pictures.sizes.link`;
	const director = findDirector(films, directorName);
	const ext = "jpg";
	const file = fileName(directorName.split('-').at(-1), './assets/images/directors/offline/', ext);

	try {
		if (!fs.existsSync(file)) {
			const resDirector = await (await fetch(vimeoDirectorUri(director.id))).json();
			const image = resDirector.pictures.sizes[0].link.split('_')[0].concat(`_1000x1000.${ext}`);
			downloadFile(image, file)
		}
	}
	catch (e) {
		return e;
	}
}


// FakeQL
const DIRECTORS = new Map();
const FILMS = new Map();

class Film {
	constructor(data) {
		Object.assign(this, data)
	}

	get film() {
		return FILMS.get(this.id)
	}
}
class Director {
	constructor(data) {
		Object.assign(this, data)
	}
	/*
	get films() {
		return [...FILMS.values()].filter(film => film.directorId === this.id)
	}
	*/
}

const initializeData = () => {
	Object.entries(films.director).forEach((k, i) => {
		DIRECTORS.set(i, new Director({ id: i, name: k[0], films: k[1] }))
	});


	Object.entries(films).forEach((k, i) => {
		if (k[0] != 'director') {
			FILMS.set(i, new Film({ id: i, category: k[0], films: k[1] }))
		}
	});
}

initializeData();

const schema = buildSchema(`
	type Query {
		films: [Film]
		film(id: ID): Film
		directors: [Director]
		director(id: ID): Director
	}

	type Film {
		id: ID!
		category: String!
		films: [String]
	}

	type Director {
		id: ID!
		name: String!
		films: [String]
	}
`);

// The root provides a resolver function for each API endpoint
const rootValue = {
	films: () => FILMS.values(),
	film: ({ category }) => FILMS.get(category),
	directors: () => DIRECTORS.values(),
	director: ({ id }) => DIRECTORS.get(id)
}

// Middleware
app.use('/api/films/:category', async (req, res) => {
	let data;
	const isOfflineDirector = films.offlineDirectors.find(o => slugify(o.name) === req.params.category);
	if (isOfflineDirector) {
		data = await fetchDirector(req.params.category);
	}
	else {
		data = await fetchData(req.params.category);
	}
	res.setHeader('Content-Type', 'application/json');
	res.send(data);
});

app.use('/api/photos/:category?', async (req, res) => {
	const isPhotographer = Object.keys(photos).find(o => slugify(o) === req.params.category);
	const data = isPhotographer ? photos[isPhotographer] : photos;
	res.setHeader('Content-Type', 'application/json');
	res.send(data);
});

app.use('/graphql', createHandler({
	schema: schema,
	rootValue: rootValue,
	graphiql: true,
}));

// Use output folder
app
	.use(history({
		verbose: false
	}))
	.use(express.static('public'))
	.use('/photos', express.static('photos'));

app.listen(3000);