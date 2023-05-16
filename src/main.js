import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import { films } from './films.json';
import photos from './photos.json';
import { findDirector, slugify, categories } from '../functions.js';
import languages from './lang';

const navItems = [
  'about',
  'film',
  'directors',
  'animation',
  'interactive',
  'jobs',
  'contact',
];

async function fetchData(category) {
  try {
    if (categories(films).includes(category) || findDirector(films, category)) {
      return await fetch(
        `${window.location.origin}/api/films/${category}`
      ).then((res) => res.json());
      // return import(`./../data/${category}.json`).then(e => e.default);
    }
    throw new Error(`No ${category} category in films api 🤷🤷🤷`);
  } catch (e) {
    console.error(e);
  }
}

function getRandomImages(item) {
  if (item.children) {
    const randomChildIndex = Math.floor(Math.random() * item.children.length);
    const randomChild = item.children[randomChildIndex];
    return {
      ...item,
      children: [getRandomImages(randomChild)],
    };
  } else if (Array.isArray(item)) {
    return {
      ...item,
      children: [item[Math.floor(Math.random() * item.length)]],
    };
  } else {
    return item;
  }
}

const photoData = {
  all() {
    const photographer = photos.find((e) => slugify(e.name) === router.currentRoute.value.params.photographerSlug);
    return photographer ? photographer.children : photos;
  },
  who() {
    return this.photographers.find((o) => slugify(o) === router.currentRoute.value.params.photographerSlug);
  },
  path: (w, c, p) => `../photos/${w}/${c}/${p}`,
  photographers: photos.map((p) => p.name).sort(),
  random: photos.map((item) => getRandomImages(item)),
  categories: [
    ...new Set(
      photos
        .map((e) => e.children.map((e) => e.name))
        .flat()
        .sort()
    ),
  ]
};

function flattenPhotosChildren(n, subCategory) {
  const arr = [];
  n.forEach((node) => {
    if (typeof node === "string") {
      // Base case: node is a photo
      const wtp = subCategory ? `${subCategory}/${node}` : node;
      arr.push(wtp);
    } else {
      // Recursive case: node is a category
      arr.push(...flattenPhotosChildren(node.children, node.name));
    }
  });
  return arr;
}

/*
async function fetchPhotos(category) {
  const api = `${window.location.origin}/api/photos/`;
  const isPhotographer = photos.find((e) => slugify(e.name) === category);

  try {
    if (isPhotographer) {
      return fetch(`${api}${category}`).then((res) => res.json());
    }
    else {
      // if no photographer is found, return all photos
      return await fetch(api).then((res) => res.json());
    }
  } catch (e) {
    console.error(e);
  }

}
*/

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
  .provide('photoData', photoData)
  .provide('findDirector', findDirector)
  .provide('flattenPhotosChildren', flattenPhotosChildren)
  .use(i18n)
  .use(router)
  .mount('#app');
