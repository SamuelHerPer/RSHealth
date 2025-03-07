import React, { useState, useEffect } from "react";
import useUsuarios from "../../hooks/useUsuarios";
import useDatos from "../../hooks/useDatos";
import { supabaseConexion } from "../../config/supabase";
import "./ConsultasSanitario.css";

// Muestra el componente para crear una nueva consulta.
const ConsultasSanitario = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { usuario } = useUsuarios();
  const {
    actualizarDatoConsulta,
    actualizarArchivoConsulta,
    consulta,
    insertarNuevaConsulta,
    actualizarConsulta,
    obtenerPacientes,
    pacientes,
    archivo,
    handleFileChange,
    resetArchivo
  } = useDatos();

  // Se declaran los estados necesario en ámbito local.
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [dniPacienteSeleccionado, setDniPacienteSeleccionado] = useState("");
  const [inputBloqueado, setInputBloqueado] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  // Función que sube un archivo a supabase
  const subirArchivoASupabase = async () => {
    if (!archivo) {
      return null;
    }
  
    const fileExtension = archivo.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const filePath = `ArchivosSubidos/${fileName}`;
  
    const { data, error } = await supabaseConexion.storage
      .from('ArchivosSubidos')
      .upload(filePath, archivo);
  
    if (error) {
      return null;
    } else {
      actualizarArchivoConsulta(filePath); // Actualiza el estado de consulta con la ruta del archivo
      return filePath; // Devuelve la ruta del archivo en el almacenamiento
    }
  };

  // Función para manejar el cambio de un input y seleccionar un paciente.
  const handleInputChange = (event) => {
    const { value } = event.target;
    setNombrePaciente(value);
    setDniPacienteSeleccionado(value);
    const esOpcionValida = pacientes.some(
      (paciente) => paciente.dni_paciente === event.target.value
    );
    setInputBloqueado(esOpcionValida);
  };

  // Función para vaciar el paciente seleccionado.
  const limpiarPaciente = () => {
    setNombrePaciente("");
    setDniPacienteSeleccionado("");
    setInputBloqueado(false);
  };

  // Obtiene los pacientes, vacía el mensaje de erro y le pone a la consulta el dni del usuario, el dni del paciente seleccionado y la especialidad del usuario.
  useEffect(() => {
    obtenerPacientes();
    setMensajeError("");
    actualizarConsulta(
      usuario.dni,
      dniPacienteSeleccionado,
      usuario.especialidad
    );
  }, [dniPacienteSeleccionado]);

  // Función para crear la nueva consulta.
  const handleCrearConsulta = async () => {
    if (inputBloqueado) {
      const archivoPath = await subirArchivoASupabase();
      const nuevaConsulta = {
        ...consulta,
        adjunto: archivoPath,
      };
      await insertarNuevaConsulta(nuevaConsulta);
      setMensajeError("Consulta realizada correctamente");
      resetArchivo();
      document.getElementById('fileInput').value = "";

    } else {
      setMensajeError("Paciente no válido");
    }
  };

  // Pinta el componente del sanitario para crear una nueva consulta.
  return (
    <>
      <div id="FiltrosConsulta">
        <h3>ASIGNE UN PACIENTE</h3>
        <div id="OpcionFiltro">

          <input
            className="busqueda"
            type="text"
            value={nombrePaciente}
            onChange={handleInputChange}
            name="paciente"
            id="paciente"
            list="pacientes"
            autoComplete="off"
            readOnly={inputBloqueado}
          />
          <datalist id="pacientes">
            {pacientes &&
              pacientes.map((paciente) => (
                <option
                  key={paciente.dni_paciente}
                  value={paciente.dni_paciente}
                >
                  {paciente.nombre} {paciente.apellido_1} {paciente.apellido_2}
                </option>
              ))}
          </datalist>
          <button className="BotonSanitario" onClick={limpiarPaciente}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div id="ConsultasSanitario">
        <div>
          <div className="contenedor">
            <div className="caja">
              <label htmlFor="sanitario">Especialista </label>
              <input
                type="text"
                name="sanitario"
                value={
                  usuario.nombre +
                  " " +
                  usuario.apellido_1 +
                  " " +
                  (usuario.apellido_2 ? usuario.apellido_2 : "")
                }
                disabled
              />
            </div>
            <div className="caja">
              <label htmlFor="especialidad">Especialidad </label>
              <input
                type="text"
                name="especialidad"
                value={usuario.especialidad}
                disabled
              />
            </div>
          </div>
          <div className="contenedor">
            <div className="caja">
              <label htmlFor="observaciones">Observaciones </label>
              <textarea
                className="inputSanitario"
                type="textarea"
                name="observaciones"
                value={consulta.observaciones || ""}
                onChange={actualizarDatoConsulta}
                cols={40}
                rows={8}
              />
            </div>
            <div className="caja">
              <label htmlFor="diagnostico">Diagnóstico </label>
              <textarea
                className="inputSanitario"
                type="textarea"
                name="diagnostico"
                value={consulta.diagnostico || ""}
                onChange={actualizarDatoConsulta}
                cols={40}
                rows={8}
              />
            </div>
          </div>
          <div className="contenedor">
            <div className="caja">
              <label htmlFor="receta">Receta </label>
              <textarea
                className="inputSanitario"
                type="textarea"
                name="receta"
                value={consulta.receta || ""}
                onChange={actualizarDatoConsulta}
                cols={40}
                rows={8}
              />
            </div>
            <div className="caja">
              <label htmlFor="pruebas">Pruebas </label>
              <textarea
                className="inputSanitario"
                type="textarea"
                name="pruebas"
                value={consulta.pruebas || ""}
                onChange={actualizarDatoConsulta}
                cols={40}
                rows={8}
              />
            </div>
          </div>
          <div id="adjunto" className="contenedor">
            <div className="caja">
              <label htmlFor="adjunto">Archivo adjunto </label>
              <input type="file" name="adjunto" id="fileInput" onChange={handleFileChange} />
            </div>
          </div>
          <button className="BotonSanitario" onClick={handleCrearConsulta}>
            Crear consulta
          </button>
          {mensajeError && <div className="mensajeError">{mensajeError}</div>}
        </div>
      </div>
    </>
  );
};

export default ConsultasSanitario;