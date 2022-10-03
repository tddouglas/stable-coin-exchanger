import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import HomeView from "../views/HomeView.vue"
import PurchaseView from "../views/PurchaseView.vue"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: HomeView
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
	},
	{
		path: "/purchase",
		name: "purchase",
		component: PurchaseView
	},
	{
		path: "/result/:type",
		name: "result",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/ResultsVue.vue")
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
