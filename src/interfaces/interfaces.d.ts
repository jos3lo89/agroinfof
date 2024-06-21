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
    id: string
    nombre: string
    descripcion: string
    portada: string
    portada_id: string | null
    telefonos: Telefono[]
  }
  
  export interface Telefono {
    id: number
    asociacion_id: string
    numero: string
    tipo: string
  }
  