import "./index.scss";
import {createApp} from "vue";
import App from "./App.vue";
import {router} from "./router";
import {store} from "./stores";
import {dt} from "./plugins/duploTo";
import {userStore} from "./stores/userStore";
import "./plugins/firebase";
import "vuetify/styles";
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

//create vue app
createApp(App)
.use(router)
.use(store)
.use(createVuetify({
	components,
	directives
}))
.mount("#app");


// callback when user infos is fetched
dt.addHookInfo("user.info", () => {
	import("@S/index");
	router.push("/");
});

const {getInfo, getToken} = userStore();
//add access_token header for all request
dt.setDefaultHeaders({
	get access_token(){
		return getToken() ?? undefined;
	}
});

//wait initialize router else router.currentRoute.value.path is allways "/"
await new Promise(resolve => setTimeout(resolve, 100));

//try to get user infos
getInfo().then(connected => {
	if(!connected){
		//registration page can handle the redirection alone
		if(router.currentRoute.value.path !== "/register")router.push("/login");
	}
	else {
		//redirect to main page
		router.push("/");
	}
});


