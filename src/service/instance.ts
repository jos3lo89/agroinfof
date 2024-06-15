import instance from "./axios";

export class AxiosUser {
  static async login(data: { correo: string; clave: string }) {
    return await instance.post("/usuario/login", data);
  }

  static async logout() {
    return await instance.post("/usuario/logout");
  }
}
