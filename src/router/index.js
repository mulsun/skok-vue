import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Film from '../views/Film.vue';
import Reel from '../views/Reel.vue';
import Jobs from '../views/Jobs.vue';
import Photos from '../views/Photos.vue';
import Contact from '../views/Contact.vue';
import Directors from '../views/Directors.vue';
import Video from '../views/Video.vue';
import NotFound from '../views/404.vue';

export default createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(to.name === 'Video' ? { top: 0 } : savedPosition)
      }, 0)
    })
  },
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/directors',
    name: 'Directors',
    component: Directors,
  },
  // {
  //   path: '/offline-directors/:category?',
  //   name: 'Offline Directors',
  //   component: Directors,
  //   props: { offline: true }
  // },
  {
    path: '/film',
    name: 'Film',
    component: Film,
  },
  {
    path: '/animation',
    name: 'Animation',
    component: Film,
  },
  {
    path: '/interactive',
    name: 'Interactive',
    component: Film,
  },
  {
    path: '/directors/:directorSlug',
    name: 'Director',
    component: Film,
  },
  {
    path: '/reel/:title/:ids',
    name: 'Reel',
    component: Reel,
  },
  {
    path: '/photos/:photographerSlug?',
    name: 'Photos',
    component: Photos,
  },
  {
    path: "/:category/:directorSlug?/:slug",
    name: "Video",
    component: Video,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    name: 'Error 404 - Not Found'
  }]
});
