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
			transitionName: 'slide',
			dataSource: "all",
		}
	},
	{
		path: "/about",
		name: "About",
		component: About,
		meta: {
			title: 'About',
			transitionName: 'slide'
		}
	},
	{
		path: "/film",
		name: "Film",
		component: Film,
		meta: {
			title: 'Film',
			transitionName: 'slide',
			dataSource: "all",
		}
	},
	{
		path: "/jobs",
		name: "Jobs",
		component: Jobs,
		meta: {
			title: 'Jobs',
			transitionName: 'slide'
		}
	},
	{
		path: "/contact",
		name: "Contact",
		component: Contact,
		meta: {
			title: 'Contact',
			transitionName: 'slide'
		}
	},
	{
		path: "/directors",
		name: "Directors",
		component: Directors,
		meta: {
			title: 'Directors',
			transitionName: 'slide',
			dataSource: "directors",
		}
	},
	{
		path: "/animation",
		name: "Animation",
		component: Film,
		meta: {
			title: 'Animation',
			transitionName: 'slide',
			dataSource: "animation",
		}
	},
	{
		path: "/interactive",
		name: "Interactive",
		component: Film,
		meta: {
			title: 'Interactive',
			dataSource: "interactive",
		}
	},
	{
		path: "/film/:slug",
		name: "Video",
		component: Video,
		meta: {
			transitionName: 'slide',
			dataSource: "all",
		}
	},
	{
		path: "/director/:slug",
		name: "Director",
		component: Film,
		meta: {
			transitionName: 'slide',
			dataSource: "directors",
		}
	},
	{
		path: "/director/:directorSlug/:slug",
		name: "Director Video",
		component: Video,
		meta: {
			transitionName: 'slide',
			dataSource: "directors",
		}
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;