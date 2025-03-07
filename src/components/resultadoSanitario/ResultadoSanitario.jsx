import React, { useState, useEffect } from "react";
import useDatos from "../../hooks/useDatos";
import useUsuarios from "../../hooks/useUsuarios";
import { supabaseConexion } from "../../config/supabase";
import "./ResultadoSanitario.css";

// Muestra el componente para que el sanitario cree un resultado.
const ResultadoSanitario = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { usuario } = useUsuarios();
  const {
    resultado,
    actualizarDatoResultado,
    actualizarArchivoResultado,
    actualizarResultado,
    insertarNuevoResultado,
    obtenerPacientes,
    pacientes,
    archivo,
    handleFileChange,
    resetArchivo,
  } = useDatos();

  // Se declaran los estados necesario en ámbito local.
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [dniPacienteSeleccionado, setDniPacienteSeleccionado] = useState("");
  const [inputBloqueado, setInputBloqueado] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  // Función para subir archivos a supabase y almacenarlos.
  const subirArchivoASupabase = async () => {
    if (!archivo) {
      return null;
    }

    const fileExtension = archivo.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const filePath = `ArchivosSubidos/${fileName}`;

    const { data, error } = await supabaseConexion.storage
      .from("ArchivosSubidos")
      .upload(filePath, archivo);

    if (error) {
      return null;
    } else {
      actualizarArchivoResultado(filePath); // Actualiza el estado de consulta con la ruta del archivo
      return filePath; // Devuelve la ruta del archivo en el almacenamiento
    }
  };

  // Manejar el cambio del paciente.
  const handleInputChange = (event) => {
    const { value } = event.target;
    setNombrePaciente(value);
    setDniPacienteSeleccionado(value);
    const esOpcionValida = pacientes.some(
      (paciente) => paciente.dni_paciente === event.target.value
    );
    setInputBloqueado(esOpcionValida);
  };

  // Limpiar el paciente seleccionado.
  const limpiarPaciente = () => {
    setNombrePaciente("");
    setDniPacienteSeleccionado("");
    setInputBloqueado(false);
  };

  // Obtiene los pacientes, vacía el mensaje de error y le añade al resultado el paciente, el sanitario y la especialidad del sanitario.
  useEffect(() => {
    obtenerPacientes();
    setMensajeError("");
    actualizarResultado(
      usuario.dni,
      dniPacienteSeleccionado,
      usuario.especialidad
    );
  }, [dniPacienteSeleccionado]);

  // Función que maneja la creación de un resultado.
  const handleCrearResultado = async () => {
    if (inputBloqueado) {
      const archivoPath = await subirArchivoASupabase();
      const nuevoResultado = {
        ...resultado,
        adjunto: archivoPath,
      };
      await insertarNuevoResultado(nuevoResultado);
      setMensajeError("Resultado realizado correctamente");
      resetArchivo();
      document.getElementById("fileInput").value = "";
    } else {
      setMensajeError("Paciente no válido");
    }
  };

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
      <div id="ResultadoSanitario">
        <div>
          <div className="contenedor">
            <div className="caja">
              <label htmlFor="sanitario">Especialista: </label>
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
              <label htmlFor="especialidad">Especialidad: </label>
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
              <label htmlFor="observaciones">Observaciones: </label>
              <textarea
                className="inputSanitario"
                type="textarea"
                name="observaciones"
                value={resultado.observaciones || ""}
                onChange={actualizarDatoResultado}
                cols={40}
                rows={8}
              />
            </div>
          </div>

          <div id="adjunto" className="contenedor">
            <div className="caja">
              <label htmlFor="adjunto">Archivos adjuntos: </label>
              <input
                type="file"
                name="adjunto"
                id="fileInput"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button className="BotonSanitario" onClick={handleCrearResultado}>
            Crear resultado
          </button>
          {mensajeError && <div className="mensajeError">{mensajeError}</div>}
        </div>
      </div>
    </>
  );
};

export default ResultadoSanitario;
