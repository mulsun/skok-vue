import { slugify, findDirector, categories } from './functions.js'
import fetch from 'node-fetch';
import fs from 'fs';
import express from 'express';
const app = express();
import history from 'connect-history-api-fallback';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { config } from 'dotenv';
config();

const { films } = JSON.parse(fs.readFileSync(new URL('./src/films.json', import.meta.url)));

async function fetchData(category) {
	const APIKEY = process.env.UNAUTHTOKEN;
	const vimeoUri = (videoIds) => `https://api.vimeo.com/videos?uris=${videoIds}&access_token=${APIKEY}&fields=uri,name,description,pictures.sizes,created_time`;
	const dataDir = new URL('./data/', import.meta.url).pathname;
	const fileName = `${dataDir}/${category}.json`;
	const filmsData = films[category] != undefined ? films[category] : films.director[findDirector(films.director, category)];

	try {
		if (!categories(films).includes(category)) throw 'No such category 🤷';
		if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

		if (!fs.existsSync(fileName)) {
			// Join and fetch vimeo ids, todo: this could be done in express
			const res = await (await fetch(vimeoUri(filmsData.map(id => `/videos/${id}`).toString()))).json();

			// Simplify the result
			Object.values(res.data).forEach((e) => {
				e.id = Number(e.uri.split('/').pop());
				e.slug = slugify(e.name);
				// e.image = `/images/videos/${e.slug}.avif`;
				e.image = e.pictures.sizes[0].link.split("_")[0];
				delete e.pictures;
				delete e.uri;
			});

			// sort films
			res.data.sort((a, b) => {
				if (category === 'home') {
					return filmsData.indexOf(a.id) - filmsData.indexOf(b.id);
				}
				else {
					return new Date(b.created_time) - new Date(a.created_time);
				}
			});
			// if file does not exist, save json file
			fs.writeFileSync(fileName, JSON.stringify(res.data), { flag: 'w' });
		}
		const file = fs.readFileSync(fileName, 'utf8');
		/*
		const imagePath = new URL(`./assets/images/videos/`, import.meta.url).pathname;
		if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath);
		JSON.parse(file).forEach(async (e) => {
			await fetch(e.image).then(res => res.body.pipe(fs.createWriteStream(`${imagePath}/${e.slug}.avif`)));
		});
		*/
		// Read File
		return file;
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

var schema = buildSchema(`
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

// const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(req.get('User-Agent'));

// Middleware
app.use('/api/films/:category', async (req, res) => {
	const data = await fetchData(req.params.category);
	res.setHeader('Content-Type', 'application/json');
	res.end(data);
});

app.use('/graphql', graphqlHTTP({
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

app.listen(3000);