import {createRouter, RouteRecordRaw, createWebHistory} from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("@P/mainInterface.vue")
	}, 
	{
		path: "/login",
		component: () => import("@P/auth/login.vue")
	}, 
	{
		path: "/register",
		component: () => import("@P/auth/register.vue")
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(() => {

});

router.afterEach(() => {

});
