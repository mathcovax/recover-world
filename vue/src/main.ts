import "./index.scss";
import {createApp} from "vue";
import App from "./App.vue";
import {router} from "./router";
import {store} from "./stores";
import {dt} from "./plugins/duploTo";
import {userStore} from "./stores/userStore";
import "./plugins/firebase";

//create vue app
createApp(App)
.use(router)
.use(store)
.mount("#app");

// callback when user infos is fetched
dt.addHookInfo("user.info", () => import("@S/index"));

const {getInfo, getToken} = userStore();
//add access_token header for all request
dt.setDefaultHeaders({
	get access_token(){
		return getToken() ?? undefined;
	}
});
//try to get user infos
getInfo().then(connected => {
	if(!connected){
		//redirect to login page
		router.push("/login");
	}
	else {
		//redirect to main page
		router.push("/");
	}
});


