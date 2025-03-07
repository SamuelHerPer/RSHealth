import React, { useEffect, useState } from "react";
import useDatos from "../../hooks/useDatos";
import useUsuarios from "../../hooks/useUsuarios";
import {convertirStringAFecha} from "../../biblioteca/biblioteca";
import "./ModalResultadoPaciente.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

// Muestra un modal con todos los detalles del resultado seleccionado.
const ModalResultadoPaciente = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { resultadoSeleccionado, obtenerSanitarioPorDni, obtenerPacientePorDni } = useDatos();
  const { isOcultoRes, ocultarModalRes, usuario } = useUsuarios();

  // Se declaran los estados necesario en ámbito local.
  const [sanitarioConsulta, setSanitarioConsulta] = useState({});
  const [pacienteConsulta, setPacienteConsulta] = useState({});

  // Url base para subir archivos a supabase.
  const urlBaseSupabase =
    "http://fmillghsodilriovigzs.supabase.co/storage/v1/object/public/ArchivosSubidos/";
  const archivoAdjuntoUrl = resultadoSeleccionado.adjunto
    ? `${urlBaseSupabase}${resultadoSeleccionado.adjunto}`
    : null;

  // Trae los datos del sanitario.
  useEffect(() => {
    const fetchSanitario = async () => {
      if (!isOcultoRes) {
        try {
          const paciente = await obtenerPacientePorDni(
            resultadoSeleccionado.dni_paciente
          )
          setPacienteConsulta(paciente[0]);
          const sanitario = await obtenerSanitarioPorDni(
            resultadoSeleccionado.dni_sanitario
          );
          setSanitarioConsulta(sanitario[0]);
        } catch (error) {
          console.error("Error al obtener los datos del sanitario:", error);
        }
      }
    };

    fetchSanitario();
  }, [isOcultoRes, obtenerSanitarioPorDni, obtenerPacientePorDni, resultadoSeleccionado.dni_sanitario, resultadoSeleccionado.dni_paciente]);

  return (
    <div id="ModalResultado" className={isOcultoRes ? "ocultar" : ""}>
      <div className="contenidoResultado">
        <div className="botonesResultado">
          <div
            className="cerrar"
            onClick={() => {
              ocultarModalRes();
            }}
          >
            <CloseRoundedIcon />
          </div>
        </div>
        <div className={usuario.role == "sanitario" ? 'DatosResultadoS' : "DatosResultado"}>
          <div className="InformacionResultado">
            <div>
              <h4>Nº Resultado</h4>
              <p>{resultadoSeleccionado.id_resultado}</p>
            </div>
            <div>
              <h4>Fecha</h4>
              <p>{convertirStringAFecha(resultadoSeleccionado.fecha)}</p>
            </div>
          </div>

          <div className="InformacionResultado">
            <div>
              <h4>{usuario.role == 'sanitario' ? "Paciente" : "Especialista"}</h4>
              <p>
                {usuario.role == 'sanitario' ?
                pacienteConsulta.nombre +
                " " +
                pacienteConsulta.apellido_1 +
                " " +
                pacienteConsulta.apellido_2 || "No especificado" : 
                sanitarioConsulta.nombre +
                  " " +
                  sanitarioConsulta.apellido_1 +
                  " " +
                  sanitarioConsulta.apellido_2 || "No especificado"
                }
              </p>
            </div>
            <div>
            <h4>{usuario.role == 'sanitario' ? "Teléfono" : "Especialidad"}</h4>
              <p>{usuario.role == 'sanitario' ? pacienteConsulta.telefono : sanitarioConsulta.especialidad || "No especificado"}</p>
            </div>
          </div>
        </div>

      <div className="InformeResultado">
      <div className={usuario.role == "sanitario" ? 'CajaResultadoS' : "CajaResultado"}>
          <h4>Observaciones</h4>
          <p>
            {resultadoSeleccionado.observaciones
              ? resultadoSeleccionado.observaciones
              : "No hay observaciones"}
          </p>
        </div>
      </div>
      <div className="adjuntos">
        <h4>Adjunto</h4>
        {archivoAdjuntoUrl ? (
          <a
            href={archivoAdjuntoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              ocultarModalRes();
            }}
          >
            <FileDownloadRoundedIcon />
          </a>
        ) : (
          <p>No hay archivos adjuntos</p>
        )}
      </div>
      </div>

    </div>
  );
};

export default ModalResultadoPaciente;
