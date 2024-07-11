// datos de usuario authStore
export interface authUserI {
  nombre: string;
  foto: string | null;
  id: string;
  correo: string;
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
  admin_id: string;
  nombre: string;
  correo: string;
  descripcion: string;
  foto: string;
  foto_id: string | null;
  portada_id: string | null;
  fecha_actualizacion: string;
  fecha_creacion: string;
  telefonos: Telefono[];
}

export interface Asociacion {
  admin_id: string;
  descripcion: string;
  correo: string;
  id: string;
  nombre: string;
  foto: string;
  foto_id: string;
  portada_id: null | string;
  fecha_actualizacion: string;
  fecha_creacion: string;
  telefonos: Telefono[];
}

export interface Telefono {
  id: number;
  asociacion_id: string;
  numero: string;
  fecha_actualizacion: string;
  fecha_creacion: string;
}

export interface ListaUserAdmin {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  rol: string;
  foto: null | string;
  foto_id: null | string;
  fecha_nacimiento: null | string;
  genero: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface AnunciosViewLista {
  asociacion_id: string;
  descripcion: string;
  estado: string;
  fecha_actualizacion: string;
  fecha_creacion: string;
  foto: string;
  foto_id: null | string;
  id: string;
  titulo: string;
}

export interface PublicacionesListAsoc {
  id: string;
  asociacion_id: string;
  titulo: string;
  texto_uno: string | null;
  texto_dos: string | null;
  imagen_uno: string | null;
  imagen_dos: string | null;
  estado: string;
  imagen_uno_id: string | null;
  imagen_dos_id: string | null;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface MiembroRegistrar {
  nombre: string;
  apellido: string;
  dni: number;
  genero: string;
  correo: string;
  fecha_nacimiento: string;
  telefono: string;
  direccion: string;
}

export interface ListMiembrosI {
  id: string;
  asociacion_id: string;
  dni: number;
  nombre: string;
  apellido: string;
  correo: string;
  fecha_nacimiento: string;
  genero: string;
  telefono: string;
  direccion: string;
  fecha_inscripcion: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface RegistrarReunion {
  titulo: string;
  descripcion: string;
  fecha_hora: string;
  lugar: string;
}

export interface ListarReuniones {
  id: string;
  asociacion_id: string;
  titulo: string;
  descripcion: string;
  fecha_hora: string;
  estado: string;
  lugar: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface ListaMiembroPorReunion {
  id: string;
  reunion_id: string;
  miembro_id: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  miembro: MiembroL;
}

export interface MiembroL {
  id: string;
  asociacion_id: string;
  dni: number;
  nombre: string;
  apellido: string;
  correo: string;
  fecha_nacimiento: string;
  genero: string;
  telefono: string;
  direccion: string;
  fecha_inscripcion: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface ListaAnunciosLista {
  id: string;
  asociacion_id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  foto: string;
  foto_id: null | string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface ListaDePublicaiconesView {
  asociacion_id: string;
  estado: string;
  fecha_actualizacion: string;
  fecha_creacion: string;
  id: string;
  imagen_dos: null | string;
  imagen_dos_id: null | string;
  imagen_uno: null | string;
  imagen_uno_id: null | string;
  texto_dos: string | null;
  texto_uno: string | null;
  titulo: string;
}

export interface PublicacionById {
  id: string;
  asociacion_id: string;
  titulo: string;
  texto_uno: null | string;
  texto_dos: null | string;
  imagen_uno: null | string;
  imagen_dos: null | string;
  estado: string;
  imagen_uno_id: null | string;
  imagen_dos_id: null | string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// comentarios

export type ComentariosByIdAsoc = ComentarioPubli[];

export interface UsuarioComent {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  rol: string;
  foto: string | null;
  foto_id: string | null;
  fecha_nacimiento: string | null;
  genero: string | null;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface ComentarioPubli {
  id: string;
  publicacion_id: string;
  usuario_id: string;
  comentario: string;
  nivel: string;
  padre: string | null;
  fecha_creacion: string;
  fecha_actualizacion: string;
  usuario: UsuarioComent;
  hijo_comentario: HijoComentario[];
}

export interface HijoComentario {
  id: string;
  publicacion_id: string;
  usuario_id: string;
  comentario: string;
  nivel: string;
  padre: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  usuario: Usuario;
  hijo_comentario: HijoComentario2[];
}

export interface HijoComentario2 {
  id: string;
  publicacion_id: string;
  usuario_id: string;
  comentario: string;
  nivel: string;
  padre: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  usuario: Usuario;
  hijo_comentario: any[];
}

// export interface Usuario3 {
//   id: string;
//   nombre: string;
//   apellido: string;
//   correo: string;
//   clave: string;
//   rol: string;
//   foto: string | null;
//   foto_id: string | null;
//   fecha_nacimiento: string | null;
//   genero: string | null;
//   estado: string;
//   fecha_creacion: string;
//   fecha_actualizacion: string;
// }

// export interface Usuario2 {
//   id: string;
//   nombre: string;
//   apellido: string;
//   correo: string;
//   clave: string;
//   rol: string;
//   foto: string | null;
//   foto_id: string | null;
//   fecha_nacimiento: string | null;
//   genero: string | null;
//   estado: string;
//   fecha_creacion: string;
//   fecha_actualizacion: string;
// }
