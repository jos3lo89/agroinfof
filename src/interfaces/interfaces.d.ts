// datos de usuario authStore
export interface authUserI {
  nombre: string;
  foto: string | null;
}

// login datos de usuario
export interface LoginDataI {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  foto: string | null;
  rol: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}
