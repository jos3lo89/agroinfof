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
  rol: string;
  foto: string | null;
  fechaCreacion: string;
  fechaActualizacion: string;
}

// datos de usuario
export interface DatosUsuario extends LoginDataI {
  foto_id: string | null;
  telefonos: telefonos | null;
  direcciones: direcciones | null;
  estado: string;
  fechaNacimiento: string | null;
  genero: string | null;
}

interface direcciones {
  id: string;
  usuario_id: string;
  direccion: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

interface telefonos {
  id: string;
  usuario_id: string;
  numero: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// datos de usuario
export interface registrarI {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
}

// editar datos de usuario
export interface editarDatosI {
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  genero: string;
  telefono: string;
  direccion: string;
}

// lista de asociaciones datos

interface AsocListaI {
  admin_id: string;
  descripcion: string;
  fechaActualizacion: string;
  fechaCreacion: string;
  id: string;
  nombre: string;
  portada: string;
  portada_id: null | string;
}

// asociacion datos asocview
export interface asocViewI {
  id: string;
  nombre: string;
  descripcion: string;
  portada: string;
  portada_id: string | null;
  telefonos: Telefono[];
}

export interface Telefono {
  id: number;
  asociacion_id: string;
  numero: string;
  tipo: string;
}
