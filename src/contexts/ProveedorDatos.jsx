import { createContext, useState } from "react";
import { supabaseConexion } from "../config/supabase.js";

// Crea el contexto de datos.
const ContextoDatos = createContext();

// Contiene los estados y funciones que se van a propagar a sus componentes hijos.
const ProveedorDatos = ({ children }) => {

  // Se declaran los valores iniciales de los estados.
  const cadenaInicial = "";
  const arrayInicial = [];
  const errorInicial = "";
  const consultaInicial = {
    dni_sanitario: "",
    especialidad: "",
    dni_paciente: "",
    observaciones: "",
    diagnostico: "",
    receta: "",
    pruebas: "",
    adjunto: "",
  };
  const resultadoInicial = {
    tipologia: "",
    observaciones: "",
    adjunto: "",
    dni_paciente: "",
    dni_sanitario: "",
  };

  // Se declaran los estados necesarios.
  const [listadoConsultasPaciente, setListadoConsultasPaciente] = useState(arrayInicial);
  const [listadoConsultasSanitario, setListadoConsultasSanitario] = useState(arrayInicial);
  const [listadoResultadosPaciente, setListadoResultadosPaciente] = useState(arrayInicial);
  const [listadoResultadosSanitario, setListadoResultadosSanitario] = useState(arrayInicial);
  const [error, setError] = useState(errorInicial);
  const [consulta, setConsulta] = useState(consultaInicial);
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(consultaInicial);
  const [resultadoSeleccionado, setResultadoSeleccionado] = useState(consultaInicial);
  const [resultado, setResultado] = useState(resultadoInicial);
  const [pacientes, setPacientes] = useState();
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState();
  const [sanitarios, setSanitarios] = useState();
  const [archivo, setArchivo] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesResultado, setEspecialidadesResultado] = useState([]);
  const [sanitarioSeleccionado, setSanitarioSeleccionado] = useState();
  const [proximasCitasPaciente, setProximasCitasPaciente] = useState([]);
  const [proximasCitasSanitario, setProximasCitasSanitario] = useState([]);
  const [isConsulta, setIsConsulta] = useState(true);
  const [citasReservadas, setCitasReservadas] = useState();

  // Función para obtener todas las especialidades posibles de un sanitario.
  const obtenerEspecialidades = async (dniPaciente) => {
    try {
      const { data, error } = await supabaseConexion.from('RSH_Consulta')
        .select('especialidad')
        .eq('dni_paciente', dniPaciente);

      if (error) {
        throw error;
      }

      // Transformar el array de objetos a un array de strings
      const especialidadesStrings = [...new Set(data.map(item => item.especialidad))];
      setEspecialidades(especialidadesStrings);
    } catch (error) {
    }
  };

  // Función para obtener todas las tipologías posibles de un resultado.
  const obtenerEspecialidadesResultado = async (dniPaciente) => {
    try {
      const { data, error } = await supabaseConexion.from('RSH_Resultado')
        .select('tipologia')
        .eq('dni_paciente', dniPaciente);

      if (error) {
        throw error;
      }

      // Transformar el array de objetos a un array de strings
      const especialidadesStrings = [...new Set(data.map(item => item.tipologia))];
      setEspecialidadesResultado(especialidadesStrings);
    } catch (error) {
    }
  };

  // Función para obtener el nombre de la provincia a través de su id de la api Geonames.
  const obtenerNombreProvincia = async (idProvincia) => {
    try {
      const response = await fetch(`http://api.geonames.org/getJSON?geonameId=${idProvincia}&username=samuelyjoseraul`);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error al obtener el nombre de la provincia", error);
      return "";
    }
  };

  // Función para almacenar los archivos a subir.
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setArchivo(e.target.files[0]);
    }
  };

  // Función para vaciar el estado que almacena los archivos a subir.
  const resetArchivo = () => {
    setArchivo(null);
  };


  // Función que almacena en un estado la consulta seleccionada.
  const obtenerConsultaSeleccionada = async (idConsultaSeleccionada) => {
    try {
      const { data, error } = await supabaseConexion
        .from("RSH_Consulta")
        .select("*")
        .eq("id_consulta", idConsultaSeleccionada);
      setConsultaSeleccionada(data[0]);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función que almacena en un estado el resultado seleccionado.
  const obtenerResultadoSeleccionado = async (idResultadoSeleccionado) => {
    try {
      const { data, error } = await supabaseConexion
        .from("RSH_Resultado")
        .select("*")
        .eq("id_resultado", idResultadoSeleccionado);
      setResultadoSeleccionado(data[0]);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para obtener las consultas del paciente.
  const obtenerConsultasPaciente = async (dniPaciente) => {
    try {
      const respuesta = await supabaseConexion
        .from("RSH_Consulta")
        .select("*")
        .eq("dni_paciente", dniPaciente);
      setListadoConsultasPaciente(respuesta.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para obtener las consultas del sanitario.
  const obtenerConsultasSanitario = async (dniSanitario) => {
    try {
      const respuesta = await supabaseConexion
        .from("RSH_Consulta")
        .select("*")
        .eq("dni_sanitario", dniSanitario);
      setListadoConsultasSanitario(respuesta.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función que trae las consultas de un paciente filtrandolas por la especialidad de la mísma.
  const obtenerConsultasPacientePorEspecialidad = async (
    dniPaciente,
    especialidad
  ) => {
    try {
      const respuesta = await supabaseConexion
        .from("RSH_Consulta")
        .select("*")
        .eq("dni_paciente", dniPaciente)
        .eq("especialidad", especialidad);
      setListadoConsultasPaciente(respuesta.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función que obtiene los resultados de un paciente.
  const obtenerResultadosPaciente = async (dniPaciente) => {
    try {
      const respuesta = await supabaseConexion
        .from("RSH_Resultado")
        .select("*")
        .eq("dni_paciente", dniPaciente);
      setListadoResultadosPaciente(respuesta.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función que obtiene los resultados de un sanitario.
  const obtenerResultadosSanitario = async (dniSanitario) => {
    try {
      const respuesta = await supabaseConexion
        .from("RSH_Resultado")
        .select("*")
        .eq("dni_sanitario", dniSanitario);
      setListadoResultadosSanitario(respuesta.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función que trae los resultados de un paciente filtrandolos por la especialidad de el mísmo.
  const obtenerResultadosPacientePorEspecialidad = async (
    dniPaciente,
    especialidad
  ) => {
    try {
      const respuesta = await supabaseConexion
        .from("RSH_Resultado")
        .select("*")
        .eq("dni_paciente", dniPaciente)
        .eq("tipologia", especialidad);
      setListadoResultadosPaciente(respuesta.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función que actualiza un campo a la hora de crear una consulta el sanitario.
  const actualizarDatoConsulta = (evento) => {
    const { name, value } = evento.target;
    setConsulta({ ...consulta, [name]: value });
  };

  // Función que actualiza el archivo a subir en una consulta.
  const actualizarArchivoConsulta = (rutaArchivo) => {
    setConsulta((prevConsulta) => ({
      ...prevConsulta,
      adjunto: rutaArchivo,
    }));
  };

  // Función que actualiza el archivo a subir en un resultado.
  const actualizarArchivoResultado = (rutaArchivo) => {
    setResultado((prevResultado) => ({
      ...prevResultado,
      adjunto: rutaArchivo,
    }));
  };
  

  // Función que actualiza el estado que contiene los datos de una nueva consulta.
  const actualizarConsulta = (dniSanitario, dniPaciente, especialidad) => {
    setConsulta({
      ...consulta,
      dni_sanitario: dniSanitario,
      dni_paciente: dniPaciente,
      especialidad: especialidad,
    });
  };

  // Función que inserta una nueva consulta en la base de datos de supabase.
  const insertarNuevaConsulta = async (nuevaConsulta) => {
    try {
      const respuesta = await supabaseConexion
        .from("RSH_Consulta")
        .insert(nuevaConsulta);
      setConsulta({
        ...consulta,
        observaciones: "",
        diagnostico: "",
        receta: "",
        pruebas: "",
        adjunto: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  // Función que actualiza un dato a la hora de crear un resultado el sanitario.
  const actualizarDatoResultado = (evento) => {
    const { name, value } = evento.target;
    setResultado({ ...resultado, [name]: value });
  };

  // Función que actualiza el estado que contendrá el resultado a insertar en la base de datos.
  const actualizarResultado = (dniSanitario, dniPaciente, tipologia) => {
    setResultado({
      ...resultado,
      dni_sanitario: dniSanitario,
      dni_paciente: dniPaciente,
      tipologia: tipologia,
    });
  };

  // Función que inserta un nuevo resultado en la base de datos de supabase.
  const insertarNuevoResultado = async (nuevoResultado) => {
    try {
      const respuesta = await supabaseConexion
        .from("RSH_Resultado")
        .insert(nuevoResultado);
      setResultado({ ...resultado, observaciones: "", adjunto: "" });
    } catch (error) {
      setError(error.message);
    }
  };

  // Función que obtiene todos los pacientes de la base de datos.
  const obtenerPacientes = async () => {
    try {
      const { data: pacientes, error } = await supabaseConexion
        .from("RSH_Pacientes")
        .select("*");
      if (error) {
        throw error;
      }

      setPacientes(pacientes);
    } catch (error) {
      throw error;
    }
  };

  // Función que obtiene todos los sanitarios de la base de datos.
  const obtenerSanitarios = async () => {
    try {
      const { data: sanitarios, error } = await supabaseConexion
        .from("RSH_Sanitario")
        .select("*");
      if (error) {
        throw error;
      }

      setSanitarios(sanitarios);
    } catch (error) {
      throw error;
    }
  };


  // Función para obtener las citas de la próxima semana (7 días desde la fecha actual).
  const obtenerCitasDeLaSemana = async () => {
    try {
      // Calculamos las fechas de inicio y fin.
      const fechaInicio = new Date(); // Fecha de hoy.
      const fechaFin = new Date(); // Una copia de la fecha de hoy para no modificar la original.
      fechaFin.setDate(fechaFin.getDate() + 7); // Sumamos 7 días para obtener la fecha final.
  
      // Formateamos las fechas a strings en formato YYYY-MM-DD para la consulta.
      const formatoFecha = (fecha) => {
        return fecha.toISOString().split('T')[0]; // Esto da formato a la fecha como "YYYY-MM-DD".
      };
  
      const { data: citasSemana, error } = await supabaseConexion
        .from("RSH_Cita")
        .select("*")
        .gte("fecha", formatoFecha(fechaInicio)) // Mayor o igual a la fecha de inicio.
        .lte("fecha", formatoFecha(fechaFin)); // Menor o igual a la fecha de fin.
  
      if (error) {
        throw error;
      }
  
      setCitasReservadas(citasSemana); // Devolvemos las citas de la semana
    } catch (error) {
      console.error("Error al obtener las citas de la semana:", error.message);
      throw error;
    }
  }

  // Función para obtener el registro de las próximas citas que tiene un paciente hasta un máximo de 10.
  const obtenerProximasCitasPaciente = async (dniPaciente) => {
    try {
      const hoy = new Date(); // Obtener la fecha de hoy.
      hoy.setHours(hoy.getHours() + 2); // Sumar dos horas a la hora actual.
      const fechaHoy = hoy.toISOString().split('T')[0]; // Formato AAAA-MM-DD para la fecha.
      const horaActual = hoy.toISOString().split('T')[1].slice(0, 5); // Formato HH:MM para la hora.
  
      let { data: citas, error } = await supabaseConexion
        .from('RSH_Cita')
        .select('*')
        .eq('dni_paciente', dniPaciente)
        .or(`fecha.gt.${fechaHoy},and(fecha.eq.${fechaHoy},hora.gt.${horaActual})`)
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true })
        .limit(10);
  
      if (error) {
        throw error;
      }
  
      const citasCompletas = await Promise.all(citas.map(async (cita) => {
        const { data: sanitario, error: errorSanitario } = await supabaseConexion
          .from('RSH_Sanitario')
          .select('*')
          .eq('dni_sanitario', cita.dni_sanitario)
          .single();
  
        if (errorSanitario) {
          throw errorSanitario;
        }
  
        return {
          ...cita,
          sanitario: sanitario.nombre + " " + sanitario.apellido_1 + " " + sanitario.apellido_2,
          especialidad: sanitario.especialidad,
        };
      }));
  
      setProximasCitasPaciente(citasCompletas);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  
  
  // Función para obtener el registro de las próximas citas que tiene un sanitario hasta un máximo de 10.
  const obtenerProximasCitasSanitario = async (dniSanitario) => {
    try {

      const hoy = new Date(); // Obtener la fecha de hoy
      hoy.setHours(hoy.getHours() + 2); // Sumar dos horas a la hora actual
      const fechaHoy = hoy.toISOString().split('T')[0]; // Formato AAAA-MM-DD para la fecha
      const horaActual = hoy.toISOString().split('T')[1].slice(0, 5); // Formato HH:MM para la hora

      let { data: citas, error } = await supabaseConexion
        .from('RSH_Cita') 
        .select('*') 
        .eq('dni_sanitario', dniSanitario)
        .or(`fecha.gt.${fechaHoy},and(fecha.eq.${fechaHoy},hora.gt.${horaActual})`) // Corregido aquí 
        .order('fecha', { ascending: true }) 
        .order('hora', { ascending: true }) 
        .limit(10); 
  
      if (error) {
        throw error;
      }
  
      const citasCompletas = await Promise.all(citas.map(async (cita) => {
        const { data: paciente, error: errorPaciente } = await supabaseConexion
          .from('RSH_Pacientes')
          .select('*')
          .eq('dni_paciente', cita.dni_paciente)
          .single();
  
        if (errorPaciente) {
          throw errorPaciente;
        }
  
        return {
          ...cita,
          paciente: paciente.nombre + " " + paciente.apellido_1 + " " + paciente.apellido_2
        };
      }));
  
      setProximasCitasSanitario(citasCompletas); 
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  // Función para cancelar una cita concertada.
  const cancelarCita = async (cita) => {
    try {
 
      const respuesta = await supabaseConexion
        .from("RSH_Cita")
        .delete()
        .match({
          hora: cita.hora,
          fecha: cita.fecha,
          dni_paciente: cita.dni_paciente,
          dni_sanitario: cita.dni_sanitario
        });
    
    } catch (error) {
      console.log(error);
    }
  }
  
  // Función para insertar una nueva cita en la base de datos (concertar nueva cita).
  const insertarNuevaCita = async (nuevaCita) => {
    try {
      const respuesta = await supabaseConexion
        .from("RSH_Cita")
        .insert(nuevaCita);
    } catch (error) {
      setError(error.message);
    }
  }

  // Función para obtener un paciente entrandole como parámetro un dni.
  const obtenerPacientePorDni = async (dni) => {
    try {
      const { data, error } = await supabaseConexion
        .from("RSH_Pacientes")
        .select('*')
        .eq('dni_paciente', dni); 
  
      if (error) {
        throw error;
      }
  
      return data; 
    } catch (error) {
      console.error("Error al obtener el paciente por DNI:", error.message);
      throw error;
    }
  }

  // Función para obtener un sanitario entrandole como parámetro un dni.
  const obtenerSanitarioPorDni = async (dni) => {
    try {
      const { data, error } = await supabaseConexion
        .from("RSH_Sanitario")
        .select('*')
        .eq('dni_sanitario', dni); 
  
      if (error) {
        throw error;
      }
  
      return data; 
    } catch (error) {
      console.error("Error al obtener el sanitario por DNI:", error.message);
      throw error;
    }
  }

  // Se definen los datos a exportar (a lo que tendrá acceso sus hijos).
  const datosAExportar = {
    obtenerConsultasPaciente,
    obtenerConsultasSanitario,
    obtenerConsultasPacientePorEspecialidad,
    actualizarDatoConsulta,
    actualizarArchivoConsulta,
    actualizarArchivoResultado,
    insertarNuevaConsulta,
    actualizarConsulta,
    consulta,
    listadoConsultasPaciente,
    listadoConsultasSanitario,
    consultaSeleccionada,
    obtenerConsultaSeleccionada,
    actualizarDatoResultado,
    actualizarResultado,
    insertarNuevoResultado,
    resultado,
    obtenerPacientes,
    pacientes,
    pacienteSeleccionado,
    setPacienteSeleccionado,
    obtenerSanitarios,
    sanitarios,
    archivo,
    handleFileChange,
    resetArchivo,
    obtenerResultadosPaciente,
    obtenerResultadosSanitario,
    obtenerResultadosPacientePorEspecialidad,
    listadoResultadosPaciente,
    listadoResultadosSanitario,
    resultadoSeleccionado,
    obtenerResultadoSeleccionado,
    obtenerNombreProvincia,
    obtenerEspecialidades,
    obtenerEspecialidadesResultado,
    especialidades,
    especialidadesResultado,
    sanitarioSeleccionado,
    setSanitarioSeleccionado,
    obtenerCitasDeLaSemana,
    insertarNuevaCita,
    obtenerPacientePorDni,
    obtenerSanitarioPorDni,
    citasReservadas,
    cancelarCita,
    obtenerProximasCitasPaciente,
    obtenerProximasCitasSanitario,
    proximasCitasPaciente,
    proximasCitasSanitario,
    isConsulta,
    setIsConsulta

    
  };

  return (
    <ContextoDatos.Provider value={datosAExportar}>
      {children}
    </ContextoDatos.Provider>
  );
};

export default ProveedorDatos;
export { ContextoDatos };
