import {
  editarDatosI,
  MiembroRegistrar,
  registrarI,
  RegistrarReunion,
} from "../interfaces/interfaces";
import instance from "./axios";

export class AxiosUser {
  static async registrar(data: registrarI) {
    // funcionando
    return await instance.post("/usuario/registrar", data);
  }

  static async login(data: { correo: string; clave: string }) {
    // funcionando
    return await instance.post("/usuario/login", data);
  }

  static async logout() {
    // funcionando
    return await instance.post("/usuario/logout");
  }

  static async getUsuario() {
    return await instance.get("/usuario/datos");
  }

  static async agregarFoto(data: FormData) {
    return await instance.post("/usuario/agregar-foto", data);
  }

  static async eliminarFoto() {
    return await instance.delete("/usuario/eliminar-foto");
  }

  static async actualizarFoto(data: FormData) {
    return await instance.put("/usuario/actualizar-foto", data);
  }

  static async cambiarClaves(data: { clave: string; nuevaClave: string }) {
    return await instance.put("/usuario/actualizar-clave", data);
  }

  static async eliminarUsuario(clave: { clave: string }) {
    return await instance.delete("/usuario/eliminar", {
      data: clave,
    });
  }

  static async agregarTelefono(data: { tipo: string; numero: string }) {
    return await instance.post("/usuario/agregar-telefono", data);
  }

  static async editarDatos(data: editarDatosI) {
    return await instance.put("/usuario/actualizar-datos", data);
  }

  // asociacion

  static async getDatosAsoc() {
    return await instance.get("/asociacion/datos-admin");
  }

  static async listarAsoc() {
    return await instance.get("/asociacion/lista");
  }

  static async getasocByname(nombre: string) {
    return await instance.get(`/asociacion/datos/${nombre}`);
  }

  static async listaUsuario() {
    return await instance.get("/admin/lista-usuarios");
  }

  static async registrarAsociacion(data: FormData) {
    return await instance.post("/asociacion/registrar", data);
  }

  static async registrarAnuncios(data: FormData) {
    return await instance.post("/anuncios/registrar", data);
  }

  static async listarAnuncioByNombreAsoc(nombre: string) {
    return await instance.get(`/anuncios/listar-asoc-nombre/${nombre}`);
  }

  static async eliminarUsuarioById(id: string) {
    return await instance.delete(`/admin/eliminar-usuario/${id}`);
  }

  static async registrarPublicaciones(data: FormData) {
    return await instance.post("/asociacion/registrar-publicacion", data);
  }

  static async listarPublicacionesAsoc() {
    return await instance.get("/asociacion/listar-publicaciones-asoc");
  }

  static async cambiarEstadoPublicacion(estado: string, id: string) {
    return await instance.put(
      `/asociacion/cambiar-estado-publicacion/${id}/${estado}`
    );
  }

  static async borrarPublicacion(id: string) {
    return await instance.delete(`/asociacion/eliminar-publicacion/${id}`);
  }

  static async registrarMiembro(data: MiembroRegistrar) {
    return await instance.post("/miembro/registrar", data);
  }

  static async listarMiembros() {
    return await instance.get("/miembro/listar");
  }

  static async borrarMiembro(id: string) {
    return await instance.delete(`/miembro/eliminar/${id}`);
  }

  static async registrarReunion(data: RegistrarReunion) {
    return await instance.post("/reuniones/registrar", data);
  }

  static async listarReuniones() {
    return await instance.get("/reuniones/lista-reuniones");
  }

  static async borrarReuniones(id: string) {
    return await instance.delete(`/reuniones/eliminar/${id}`);
  }

  static async listarMiembroPorReunion(id: string) {
    return await instance.get(`/reuniones/lista-miembros-reunion/${id}`);
  }

  static async tomarAsistencia22(
    idMiembro: string,
    estado: "presente" | "falta"
  ) {
    return await instance.put(`/reuniones/llamar-lista/${idMiembro}/${estado}`);
  }

  static async listarAnunciosByIdAsoc() {
    return await instance.get("/anuncios/listar-anuncios-asoc-admin");
  }

  static async borrarAnuncio(id: string) {
    return await instance.delete(`/anuncios/eliminar/${id}`);
  }

  static async cambiarEstadoAnuncio(id: string, estado: string) {
    return await instance.put(`/anuncios/cambiar-estado/${id}/${estado}`);
  }

  static async listarPublicaciones(nombre: string) {
    return await instance.get(
      `/asociacion/listar-publicaciones-por-asoc/${nombre}`
    );
  }

  static async infoPublicacionByid(id: string) {
    return await instance.get(`/asociacion/listar-publicaciones-por-id/${id}`);
  }

  static async numeroDeMiembrosAsoc(nombre: string) {
    return await instance.get(`/asociacion/numero-miembros-asoc/${nombre}`);
  }

  static async comentariosByIdAsoc(idAsoc: string) {
    return await instance.get(`/comentarios/listar/${idAsoc}`);
  }
}
