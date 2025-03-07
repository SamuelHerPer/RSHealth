import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";
import { useNavigate } from "react-router-dom";

// Crea el contexto de usuarios.
const ContextoUsuarios = createContext();

// Contiene los estados y funciones que se van a propagar a sus componentes hijos.
const ProveedorUsuarios = ({ children }) => {

  // Función para redirigir.
  const navegar = useNavigate();

  // Valores iniciales para los estados.
  const datosSesionInicial = {
    email: "",
    password: "",
  };
  const sesionInicial = false;
  const usuarioInicial = {};
  const nuevoUsuarioInicial = {
    email: "",
    password: "",
    dni: "",
    nombre: "",
    apellido_1: "",
    apellido_2: "",
    fecha_nacimiento: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    codigo_postal: "",
    grupo_sanguineo: "",
    alergias: "",
    medicaciones_cronicas: "",
    enfermedades_cronicas: "",
    enfermedades_previas: "",
    especialidad: "",
    foto_perfil: "",
    formacion: "",
    experiencia: "",
    informacion_personal: "",
    role: "",
  };
  const errorUsuarioInicial = "";
  const ocultoInicial = true;

  // Estados necesarios para el funcionamiento.
  const [datosSesion, setDatosSesion] = useState(datosSesionInicial);
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [sesionIniciada, setSesionIniciada] = useState(sesionInicial);
  const [nuevoUsuario, setNuevoUsuario] = useState(nuevoUsuarioInicial);
  const [errorUsuario, setErrorUsuario] = useState(errorUsuarioInicial);
  const [isOculto, setIsOculto] = useState(ocultoInicial);
  const [isOcultoRes, setIsOcultoRes] = useState(ocultoInicial);
  const [menuHamburguesa, setMenuHamburguesa] = useState(false);

  // Funcoón para actualizar un dato del estado "nuevoUsuario".
  const actualizarDatoUsuario = (evento) => {
    const { name, value } = evento.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  // Funcoón para actualizar un dato del estado "usuario".
  const actualizarDatoUsuarioCompleto = (evento) => {
    const { name, value } = evento.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Función que cambia el estado de isOculto a false.
  const mostrarModal = () => {
    setIsOculto(false);
  };

  // Función que cambia el estado de isOculto a true.
  const ocultarModal = () => {
    setIsOculto(ocultoInicial);
  };

  // Función que cambia el estado de isOcultoRes a false.
  const mostrarModalRes = () => {
    setIsOcultoRes(false);
  };
  
  // Función que cambia el estado de isOcultoRes a true.
  const ocultarModalRes = () => {
    setIsOcultoRes(ocultoInicial);
  };

  // Función para crear un nuevo usuario de tipo paciente.
  const crearCuentaPaciente = async () => {
    try {
      const { data, error } = await supabaseConexion.auth.signUp({
        email: nuevoUsuario.email,
        password: nuevoUsuario.password,
        role: "sanitario",
        options: {
          data: {
            dni: nuevoUsuario.dni,
            nombre: nuevoUsuario.nombre,
            apellido_1: nuevoUsuario.apellido_1,
            apellido_2: nuevoUsuario.apellido_2,
            fecha_nacimiento: nuevoUsuario.fecha_nacimiento,
            telefono: nuevoUsuario.telefono,
            direccion: nuevoUsuario.direccion,
            ciudad: nuevoUsuario.ciudad,
            provincia: nuevoUsuario.provincia,
            codigo_postal: nuevoUsuario.codigo_postal,
            grupo_sanguineo: nuevoUsuario.grupo_sanguineo,
            alergias: nuevoUsuario.alergias,
            medicaciones_cronicas: nuevoUsuario.medicaciones_cronicas,
            enfermedades_cronicas: nuevoUsuario.enfermedades_cronicas,
            enfermedades_previas: nuevoUsuario.enfermedades_previas,
            especialidad: "sanitario",
            foto_perfil: nuevoUsuario.foto_perfil,
            formacion: "sanitario",
            experiencia: "sanitario",
            informacion_personal: "sanitario",
            role: "paciente",
          },
        },
      });

      const { respuesta } = await supabaseConexion
        .from("RSH_Pacientes")
        .insert({
          dni_paciente: nuevoUsuario.dni,
          nombre: nuevoUsuario.nombre,
          apellido_1: nuevoUsuario.apellido_1,
          apellido_2: nuevoUsuario.apellido_2,
          fecha_nacimiento: nuevoUsuario.fecha_nacimiento,
          email: nuevoUsuario.email,
          telefono: nuevoUsuario.telefono,
          direccion: nuevoUsuario.direccion,
          ciudad: nuevoUsuario.ciudad,
          provincia: nuevoUsuario.provincia,
          codigo_postal: nuevoUsuario.codigo_postal,
          grupo_sanguineo: nuevoUsuario.grupo_sanguineo,
          alergias: nuevoUsuario.alergias,
          medicaciones_cronicas: nuevoUsuario.medicaciones_cronicas,
          enfermedades_cronicas: nuevoUsuario.enfermedades_cronicas,
          enfermedades_previas: nuevoUsuario.enfermedades_previas,
          foto_perfil: nuevoUsuario.foto_perfil,
        });

      if (error) {
        throw error;
      } 
      
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  // Función para crear un nuevo usuario de tipo sanitario.
  const crearCuentaSanitario = async (id) => {
    try {
      const { data, error } = await supabaseConexion.auth.signUp({
        id: id,
        email: nuevoUsuario.email,
        password: nuevoUsuario.password,
        role: "sanitario",
        options: {
          data: {
            dni: "S" + nuevoUsuario.dni,
            nombre: nuevoUsuario.nombre,
            apellido_1: nuevoUsuario.apellido_1,
            apellido_2: nuevoUsuario.apellido_2,
            fecha_nacimiento: nuevoUsuario.fecha_nacimiento,
            telefono: nuevoUsuario.telefono,
            direccion: nuevoUsuario.direccion,
            ciudad: nuevoUsuario.ciudad,
            provincia: nuevoUsuario.provincia,
            codigo_postal: nuevoUsuario.codigo_postal,
            grupo_sanguineo: "paciente",
            alergias: "paciente",
            medicaciones_cronicas: "paciente",
            enfermedades_cronicas: "paciente",
            enfermedades_previas: "paciente",
            especialidad: nuevoUsuario.especialidad,
            foto_perfil: nuevoUsuario.foto_perfil,
            formacion: nuevoUsuario.formacion,
            experiencia: nuevoUsuario.experiencia,
            informacion_personal: nuevoUsuario.informacion_personal,
            role: "sanitario",
          },
        },
      });

      const { respuesta } = await supabaseConexion
        .from("RSH_Sanitario")
        .insert({
          dni_sanitario: "S" + nuevoUsuario.dni,
          nombre: nuevoUsuario.nombre,
          apellido_1: nuevoUsuario.apellido_1,
          apellido_2: nuevoUsuario.apellido_2,
          fecha_nacimiento: nuevoUsuario.fecha_nacimiento,
          email: nuevoUsuario.email,
          telefono: nuevoUsuario.telefono,
          direccion: nuevoUsuario.direccion,
          ciudad: nuevoUsuario.ciudad,
          provincia: nuevoUsuario.provincia,
          codigo_postal: nuevoUsuario.codigo_postal,
          especialidad: nuevoUsuario.especialidad,
          foto_perfil: nuevoUsuario.foto_perfil,
          formacion: nuevoUsuario.formacion,
          experiencia: nuevoUsuario.experiencia,
          informacion_personal: nuevoUsuario.informacion_personal,
        });

      if (error) {
        throw error;
      } 
      
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  // Función para iniciar sesión en la aplicación.
  const iniciarSesion = async () => {
    setErrorUsuario(errorUsuarioInicial); //Pongo el error al estado inicial.
    try {
      const { data, error } = await supabaseConexion.auth.signInWithPassword({
        email: datosSesion.email,
        password: datosSesion.password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setErrorUsuario("Credenciales incorrectas");
    }
  };

  // Función para vaciar el mensaje de error.
  const vaciarErrorUsuario = () => {
    setErrorUsuario(errorUsuarioInicial);
  };

  // Función para vaciar los datos del formulario de autenticarse.
  const vaciarDatosSesion = () => {
    setDatosSesion(datosSesionInicial);
  };

  // Función para vaciar los datos del formulario de crear un nuevo usuario.
  const vaciarDatosUsuario = () => {
    setNuevoUsuario(nuevoUsuarioInicial);
  };

  // Función para cerrar sesión en la aplicación.
  const cerrarSesion = async () => {
    try {
      // Cierro la sesión de supabase.
      await supabaseConexion.auth.signOut();
      setSesionIniciada(false); //Establezco la sesionIniciada a false.
      setDatosSesion(datosSesionInicial);
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  // Función para obtener el usuario que está en sesión.
  const obtenerUsuario = async () => {
    try {
      const { data, error } = await supabaseConexion.auth.getUser();

      if (error) {
        throw error;
      }

      setUsuario(data.user.user_metadata);
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  // Función para actualizar los datos de un usuario a la hora de actualizar su perfil (en la tabla auth).
  const actualizarDatosDelUsuario = async () => {
    try {
      const { user, error } = await supabaseConexion.auth.updateUser({
        data: {
          dni: usuario.dni,
          nombre: usuario.nombre,
          apellido_1: usuario.apellido_1,
          apellido_2: usuario.apellido_2,
          fecha_nacimiento: usuario.fecha_nacimiento,
          telefono: usuario.telefono,
          direccion: usuario.direccion,
          ciudad: usuario.ciudad,
          provincia: usuario.provincia,
          codigo_postal: usuario.codigo_postal,
          grupo_sanguineo: usuario.grupo_sanguineo,
          alergias: usuario.alergias,
          medicaciones_cronicas: usuario.medicaciones_cronicas,
          enfermedades_cronicas: usuario.enfermedades_cronicas,
          enfermedades_previas: usuario.especialidad,
          especialidad: usuario.especialidad,
          foto_perfil: usuario.foto_perfil,
          formacion: usuario.formacion,
          experiencia: usuario.experiencia,
          informacion_personal: usuario.informacion_personal,
          role: usuario.role,
        },
      });
      if (error) throw error;
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  // Función para actualizar los datos de un usuario sanitario a la hora de actualizar su perfil (en nuestra tabla de sanitarios).
  const actualizarSanitario = async () => {
    try {
      const { respuesta } = await supabaseConexion
        .from("RSH_Sanitario")
        .update({
          dni_sanitario: usuario.dni,
          nombre: usuario.nombre,
          apellido_1: usuario.apellido_1,
          apellido_2: usuario.apellido_2,
          fecha_nacimiento: usuario.fecha_nacimiento,
          email: usuario.email,
          telefono: usuario.telefono,
          direccion: usuario.direccion,
          ciudad: usuario.ciudad,
          provincia: usuario.provincia,
          codigo_postal: usuario.codigo_postal,
          especialidad: usuario.especialidad,
          foto_perfil: usuario.foto_perfil,
          formacion: usuario.formacion,
          experiencia: usuario.experiencia,
          informacion_personal: usuario.informacion_personal,
        })
        .eq('dni_sanitario', usuario.dni );

      if (error) throw error;
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  // Función para actualizar los datos de un usuario paciente a la hora de actualizar su perfil (en nuestra tabla de pacientes).
  const actualizarPaciente = async () => {
    try {
      const { respuesta } = await supabaseConexion
        .from("RSH_Pacientes")
        .update({
          dni_paciente: usuario.dni,
          nombre: usuario.nombre,
          apellido_1: usuario.apellido_1,
          apellido_2: usuario.apellido_2,
          fecha_nacimiento: usuario.fecha_nacimiento,
          email: usuario.email,
          telefono: usuario.telefono,
          direccion: usuario.direccion,
          ciudad: usuario.ciudad,
          provincia: usuario.provincia,
          codigo_postal: usuario.codigo_postal,
          grupo_sanguineo: usuario.grupo_sanguineo,
          alergias: usuario.alergias,
          medicaciones_cronicas: usuario.medicaciones_cronicas,
          enfermedades_cronicas: usuario.enfermedades_cronicas,
          enfermedades_previas: usuario.enfermedades_previas,
          foto_perfil: usuario.foto_perfil,
        })
        .eq( 'dni_paciente', usuario.dni ); // Aquí especificas qué registro actualizar, en este caso, utilizando el DNI del sanitario

      if (error) throw error;
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  // Función para actualizar los datos del formulario de inicio de sesión.
  const actualizarDato = (evento) => {
    const { name, value } = evento.target;
    setDatosSesion({ ...datosSesion, [name]: value });
  };

  // Función para mostrar el menú hamburguesa.
  const mostrarMenuHamburguesa = () => {
    setMenuHamburguesa(true);
  };

  // Función para ocultar el menú hamburguesa.
  const ocultarMenuHamburguesa = () => {
    setMenuHamburguesa(false);
  };

  // Suscripción para no poder ir a ningúna parte de la aplicación sin haber iniciado sesión antes.
  useEffect(() => {
    const suscripcion = supabaseConexion.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setSesionIniciada(true);
          navegar("/");
          obtenerUsuario();
        } else {
          navegar("/");
          setSesionIniciada(false);
        }
      }
    );
  }, []);

  // Objeto con la información a exportar.
  const datosAExportar = {
    sesionIniciada,
    errorUsuario,
    nuevoUsuario,
    cerrarSesion,
    actualizarDato,
    actualizarDatosDelUsuario,
    crearCuentaPaciente,
    crearCuentaSanitario,
    iniciarSesion,
    vaciarErrorUsuario,
    vaciarDatosSesion,
    vaciarDatosUsuario,
    navegar,
    actualizarDatoUsuario,
    actualizarDatoUsuarioCompleto,
    usuario,
    datosSesion,
    isOculto,
    ocultarModal,
    mostrarModal,
    actualizarSanitario,
    actualizarPaciente,
    mostrarMenuHamburguesa,
    ocultarMenuHamburguesa,
    menuHamburguesa,
    isOcultoRes,
    mostrarModalRes,
    ocultarModalRes
  };

  return (
    <ContextoUsuarios.Provider value={datosAExportar}>
      {children}
    </ContextoUsuarios.Provider>
  );
};

export default ProveedorUsuarios;
export { ContextoUsuarios };
