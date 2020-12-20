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
},
{
	path: "/about",
	name: "About",
	component: About,
},
{
	path: "/film",
	name: "Film",
	component: Film,
},
{
	path: "/jobs",
	name: "Jobs",
	component: Jobs,
},
{
	path: "/contact",
	name: "Contact",
	component: Contact,
},
{
	path: "/directors",
	name: "Directors",
	component: Directors,
},
{
	path: "/animation",
	name: "Animation",
	component: Film,
},
{
	path: "/interactive",
	name: "Interactive",
	component: Film,
},
{
	path: "/:category/:directorSlug?/:slug",
	name: "Video",
	component: Video,
},
{
	path: "/director/:slug",
	name: "Director",
	component: Film,
},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;