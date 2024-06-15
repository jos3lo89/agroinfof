import { createApp } from "vue";
import "./style.css";
import "vue3-toastify/dist/index.css";

import App from "./App.vue";
import router from "./routes/routes";
import Vue3Toasity from "vue3-toastify";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import { VueCookieNext } from "vue-cookie-next";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);

app.use(VueCookieNext);
app.use(pinia);
app.use(router);

app.use(Vue3Toasity, {
  limit: 2,
});
VueCookieNext.config({ expire: "1d" });

app.mount("#app");
