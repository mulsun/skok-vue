function slugify(s) {
	if (!s) return
	return s.toLowerCase()
		.normalize('NFD') // normalize code points
		.replace(/ı/g, 'i') // exception
		.replace(/[\u0300-\u036f]/g, "") //remove diacritics
		.replace(/\s+|_/g, '-') //spaces underscores to dashes
		.replace(/[^\w-]+/g, '') //remove non-words
		.replace(/--+/g, '-') //collapse multiple dashes
		.replace(/^-+/, '') //trim starting dash
		.replace(/-+$/, ''); //trim ending dash
}

function findDirector(where, whichDirector, isOffline) {
	const { directors, offlineDirectors } = where;
	const find = arr => arr.find((e) => slugify(e.name) === whichDirector);
	return isOffline ? find(offlineDirectors) : find(directors) || find(offlineDirectors)
}

const categories = (obj) => [...Object.keys(obj.director), ...Object.keys(obj)].map(e => slugify(e));

export {
	slugify,
	findDirector,
	categories,
};