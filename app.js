const path = require('path');
const express = require('express');
const app = express();
const { fetchData } = require('./functions');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const filmsJSON = require('./src/films.json');
const dotenv = require('dotenv');
dotenv.config();

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
	Object.entries(filmsJSON.films.director).forEach((k, i) => {
		DIRECTORS.set(i, new Director({ id: i, name: k[0], films: k[1] }))
	});


	Object.entries(filmsJSON.films).forEach((k, i) => {
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

// Middleware
app.use('/api/films/:category', async (req, res) => {
	const data = await fetchData(req.params.category);
	res.setHeader('Content-Type', 'application/json');
	const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(req.get('User-Agent')); // gotta test, could be better
	res.end(!isSafari ? data.replace(/jpg/g, 'webp') : data);
});

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: rootValue,
	graphiql: true,
}));

// Use dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Port is proxied on vue-cli and Dreamhost
app.listen(8000);