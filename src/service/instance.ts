import { editarDatosI, registrarI } from "../interfaces/interfaces";
import instance from "./axios";

export class AxiosUser {
  static async registrar(data: registrarI) {
    return await instance.post("/usuario/registrar", data);
  }

  static async login(data: { correo: string; clave: string }) {
    return await instance.post("/usuario/login", data);
  }

  static async logout() {
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
    return await instance.get("/asociacion/lista-inicio");
  }

  static async getasocByname(nombre: string) {
    return await instance.get(`/asociacion/datos/${nombre}`);
  }
}
