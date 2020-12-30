const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const express = require('express');
const app = express();
const { fetchData } = require('./functions');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const filmsJSON = require('./src/films.json');
const dotenv = require('dotenv');
dotenv.config();



// Middleware
app.use('/api/films/:category', async (req, res, next) => {
	const data = await fetchData(req.params.category);
	res.setHeader('Content-Type', 'application/json');
	const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(req.get('User-Agent')); // gotta test, could be better
	res.end(!isSafari ? data.replace(/jpg/g, 'webp') : data);
});

// Use dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// FakeQL
const DIRECTORS = new Map();
const FILMS = new Map();

class Film {
	constructor(data) { Object.assign(this, data) }
	get director() {
		return DIRECTORS.get(this.directorId)
	}
}

class Director {
	constructor(data) { Object.assign(this, data) }
	get films() {
		return [...FILMS.values()].filter(film => film.directorId === this.id)
	}
}

const initializeData = () => {
	Object.entries(filmsJSON.films.director).forEach((k, v) => DIRECTORS.set(k, new Director(v)));

	const films = [
		{ id: '1', directorId: '1', body: 'Hello world' },
		{ id: '2', directorId: '2', body: 'Hi, planet!' }
	]

	films.forEach(film => FILMS.set(film.id, new Film(film)))
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
    id: ID
    films: String
  }

  type Director {
    id: ID
    films: String
    firstName: String
    lastName: String
  }
`);

// The root provides a resolver function for each API endpoint
const rootValue = {
	films: () => FILMS.values(),
	film: ({ id }) => FILMS.get(id),
	directors: () => DIRECTORS.values(),
	director: ({ id }) => DIRECTORS.get(id)
}

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: rootValue,
	graphiql: true,
}));

app.listen(process.env.NODE_ENV === 'dev' ? 3000 : 443);

// Dreamhost specific config below
if (process.env.NODE_ENV === 'production') {
	// Copy dist to public
	fse.copySync(path.join(__dirname, '/dist'), path.join(__dirname, '/public'));
	fs.writeFileSync(path.join(__dirname, '/whatever.txt'), Date.now(), { flag: 'w' });
	//
}
else {
	// Trigger restart on Passenger on push
	fs.writeFileSync(path.join(__dirname, '/tmp/restart.txt'), Date.now(), { flag: 'w' });
}