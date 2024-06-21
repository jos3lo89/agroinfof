import { createRouter, createWebHistory } from "vue-router";

// layouts esqueletos de las vistas
import MainLayout from "../layout/MainLayout.vue";
import AdminLayout from "../layout/AdminLayout.vue";
import AdminAsocLayout from "../layout/AdminAsocLayout.vue";
import UsuarioLayout from "../layout/UsuarioLayout.vue";

// vistas sin autenticacion
import InicioView from "../views/InicioView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import NotFoundView from "../views/NotFoundView.vue";

// vistas de asociacion
import AsociacionView from "../views/asociacion/AsociacionView.vue";
import AnunciosView from "../views/asociacion/AnunciosView.vue";

// vistas del usuario con autenticacion
import MiPerfilView from "../views/profile/PerfilView.vue";

// vistas de administracion con roles
import AdminView from "../views/admin/AdminView.vue";

// vistas de administracion de asociacion con roles
import AdminAsocView from "../views/adminAsoc/AdminAsocView.vue";
import MiembrosView from "../views/adminAsoc/MiembrosView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      meta: {
        requiredAuth: false,
        roles: ["adminAsociacion", "administrador", "publico", "visitante"],
      },
      children: [
        {
          path: "",
          name: "inicio",
          component: InicioView,
        },
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "registrar",
          name: "registrar",
          component: RegisterView,
        },
      ],
    },
    {
      path: "/usuario",
      component: UsuarioLayout,
      meta: {
        requiredAuth: true,
        roles: ["adminAsociacion", "administrador", "publico"],
      },
      children: [
        {
          path: "",
          name: "perfil",
          component: MiPerfilView,
        },
      ],
    },
    {
      path: "/asociacion/:nombre",
      component: MainLayout,
      meta: {
        requiredAuth: false,
        roles: ["adminAsociacion", "administrador", "publico", "visitante"],
      },
      children: [
        {
          path: "",
          name: "asociacion",
          component: AsociacionView,
        },
        {
          path: "anuncios/:titulo",
          name: "anuncios",
          component: AnunciosView,
        },
      ],
    },
    {
      path: "/admin",
      component: AdminLayout,
      meta: {
        requiredAuth: true,
        roles: ["administrador"],
      },
      children: [
        {
          path: "",
          name: "admin",
          component: AdminView,
        },
      ],
    },
    {
      path: "/admin-asociacion",
      component: AdminAsocLayout,
      meta: {
        requiredAuth: true,
        roles: ["adminAsociacion"],
      },
      children: [
        {
          path: "",
          name: "admin-asociacion",
          component: AdminAsocView,
        },
        {
          path: "miembros",
          name: "miembros",
          component: MiembrosView,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
      meta: {
        requiredAuth: false,
        roles: ["adminAsociacion", "administrador", "publico", "visitante"],
      },
    },
  ],
});

export default router;
