import {fixedStore} from "@SRC/fixed/fixedStore";
import {createRouter, RouteRecordRaw, createWebHistory} from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "game",
		component: () => import("@P/mainInterface.vue")
	}, 
	{
		path: "/login",
		name: "login",
		component: () => import("@P/auth/login.vue")
	}, 
	{
		path: "/register",
		name: "register",
		component: () => import("@P/auth/register.vue"),
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async(to) => {
	const result = await dt.get(`/entry${to.fullPath}`).result;

	if(result.info === "user.canEntry"){
		return true;
	}
	else return {name: "login"};
});
