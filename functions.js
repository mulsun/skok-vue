const fs = require('fs');
const fetch = require('node-fetch');
const filmsJSON = require('./src/films.json');
const dotenv = require('dotenv');
dotenv.config();

async function fetchData(category) {
	const APIKEY = process.env.UNAUTHTOKEN;
	const vimeoUri = (videoIds) => `https://api.vimeo.com/videos?uris=${videoIds}&access_token=${APIKEY}&fields=uri,name,description,pictures.uri`;
	const categories = [...Object.keys(filmsJSON.films.director), ...Object.keys(filmsJSON.films)].map(e => slugify(e));
	const fileName = `${process.cwd()}/data/${category}.json`;
	const imageSize = category === 'home' ? '_1920x1080.webp' : '_640x360.webp';
	const whichDirector = Object.keys(filmsJSON.films.director).filter((e) => slugify(e) === category);
	const filmsData = filmsJSON.films[category] != undefined ? filmsJSON.films[category] : filmsJSON.films.director[whichDirector];

	try {
		if (!categories.includes(category)) throw 'No such category 🤷';

		// Join and fetch vimeo ids, todo: this could be done in express
		const res = await (await fetch(vimeoUri(filmsData.map(id => `/videos/${id}`).toString()))).json();

		// Simplify result
		Object.values(res.data).forEach((e) => {
			e.uri = e.uri.split('/').pop();
			//todo: add thumbnail for ll
			e.image = e.pictures.sizes[0].link.split("?")[0];
			e.thumbnail = 'https://i.vimeocdn.com/video/' + e.pictures.uri.split('/').pop() + imageSize;
			e.slug = slugify(e.name);
		});

		// Write File, if file exists read from existing
		if (!fs.existsSync(fileName)) {
			await fs.writeFileSync(fileName, JSON.stringify(res.data), { flag: 'w' });
		}

		// Read File
		return await fs.readFileSync(fileName, 'utf8');
	}
	catch (e) {
		return e;
	}
}

function slugify(s) {
	if (!s) return
	return s.toLowerCase()
		.normalize('NFD') // normalize code points
		.replace('ı', 'i') // exception
		.replace(/[\u0300-\u036f]/g, "") //remove diacritics
		.replace(/\s+|_/g, '-') //spaces underscores to dashes
		.replace(/[^\w-]+/g, '') //remove non-words
		.replace(/--+/g, '-') //collapse multiple dashes
		.replace(/^-+/, '') //trim starting dash
		.replace(/-+$/, ''); //trim ending dash
}

module.exports = {
	fetchData
};