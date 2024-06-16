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

// datos de usuario
export interface DatosUsuario extends LoginDataI {
  foto_id: string | null;
  telefonos: telefonos[]
}

interface telefonos {
  id: number,
  numero: number,
  tipo: string,
  usuario_id: string
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
  }