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
import "@mdi/font/css/materialdesignicons.css";
import {i18n, setLocaleMessages} from "@SRC/plugins/i18n";

//create vue app
createApp(App)
.use(router)
.use(store)
.use(i18n)
.use(createVuetify({
	components,
	directives,
	icons: {
		defaultSet: "mdi",
	}
}))
.mount("#app");

setupDuploTo();
setLocaleMessages("fr");

// callback when user infos is fetched
dt.addHookInfo("user.info", () => {
	import("@S/index");
	router.push({name: "game"});
});

const {getInfo} = userStore();
//try to get user infos
getInfo().then(async connected => {
	if(!connected){
		//registration page can handle the redirection alone
		if(!window.location.pathname.startsWith("/register"))router.push({name: "login"});
	}
	else {
		//redirect to main page
		router.push({name: "game"});
	}
});
