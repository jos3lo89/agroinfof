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

import { useAuthStore } from "./context/auth.store";

const authStore = useAuthStore();

router.beforeEach((to, _from, next) => {
  // requiredAuth es booleano que dice si es necesario autenticarse o no
  const requiredAuth = to.matched.some((record) => record.meta.requiredAuth);
  // roles es un array de strings que dice los roles que se requieren para acceder a la página
  const requiredRoles = to.meta.roles as string[];
  // obtener token de cookie
  const token = VueCookieNext.getCookie("token");
  // obtener token de authStore que es un booleano que dice si se tiene o no el token
  const storeToken = authStore.accessToken;
  // obtener rol de authStore que es un string que dice el rol del usuario
  const storeRol = authStore.rol;

  // Implementar el control de acceso

  console.log(" boleano si require o no el token -> ", requiredAuth);
  console.log(
    " array de roles que tiene permiso de acceder a la página -> ",
    requiredRoles
  );
  console.log(" cookie token -> ", token);
  console.log(" booleano si tiene token de authStore -> ", storeToken);
  console.log(" string rol de authStore -> ", storeRol);

  if (requiredAuth && !token) {
    // si es necesario autenticarse y no tiene token
    next({ name: "login" }); // redirigir a la página de login
  } else if (requiredAuth && !storeToken) {
    // si es necesario autenticarse y no tiene token de authStore
    next({ name: "login" }); // redirigir a la página de login
  } else if (requiredAuth && requiredRoles) {
    // si es necesario autenticarse y tiene token y roles
    if (requiredRoles.includes(storeRol)) {
      // si tiene el rol requerido
      next(); // continuar con la página
    } else {
      // si no tiene el rol requerido
      next({ name: "not-found" }); // redirigir a la página de not found
    }
  } else {
    // si no es necesario autenticarse y no tiene token
    next(); // continuar con la página
  }
});
