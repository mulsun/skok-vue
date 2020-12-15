import {
	createWebHistory,
	createRouter
} from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Film from "../views/Film.vue";
import Jobs from "../views/Jobs.vue";
import Contact from "../views/Contact.vue";
import Directors from "../views/Directors.vue";
import Video from "../views/Video.vue";

const routes = [{
	path: "/",
	name: "Home",
	component: Home,
	meta: {
		title: 'SKOK Film Production',
	}
},
{
	path: "/about",
	name: "About",
	component: About,
	meta: {
		title: 'About',
	}
},
{
	path: "/film",
	name: "Film",
	component: Film,
	meta: {
		title: 'Film',
	}
},
{
	path: "/jobs",
	name: "Jobs",
	component: Jobs,
	meta: {
		title: 'Jobs',
	}
},
{
	path: "/contact",
	name: "Contact",
	component: Contact,
	meta: {
		title: 'Contact',
	}
},
{
	path: "/directors",
	name: "Directors",
	component: Directors,
	meta: {
		title: 'Directors',
	}
},
{
	path: "/animation",
	name: "Animation",
	component: Film,
	meta: {
		title: 'Animation',
	}
},
{
	path: "/interactive",
	name: "Interactive",
	component: Film,
},
{
	path: "/:cat/:slug",
	name: "Video",
	component: Video,
},
{
	path: "/director/:slug",
	name: "Director",
	component: Film,
},
{
	path: "/director/:directorSlug/:slug",
	name: "Director Video",
	component: Video,
},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;