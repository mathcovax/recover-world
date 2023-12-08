import "./index.scss";
import {createApp} from "vue";
import App from "./App.vue";
import "./scripts";
import {router} from "./router";
import {store} from "./stores";

createApp(App)
.use(router)
.use(store)
.mount("#app");
