import React, { useEffect, useState } from "react";
import useDatos from "../../hooks/useDatos";
import useUsuarios from "../../hooks/useUsuarios";
import {convertirStringAFecha} from "../../biblioteca/biblioteca";
import "./ModalConsultaPaciente.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

// Muestra el modal de ver detalles de una consulta.
const ModalConsultaPaciente = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { consultaSeleccionada, obtenerSanitarioPorDni, obtenerPacientePorDni } = useDatos();
  const { isOculto, ocultarModal, usuario } = useUsuarios();

  // Se declaran los estados necesario en ámbito local.
  const [sanitarioConsulta, setSanitarioConsulta] = useState({});
  const [pacienteConsulta, setPacienteConsulta] = useState({});

  // Asigno la url del bucket de supabase.
  const urlBaseSupabase = "http://fmillghsodilriovigzs.supabase.co/storage/v1/object/public/ArchivosSubidos/";


  // Si la consulta seleccionada tiene archivo adjunto, guardo en dicha variable su valor y si no guardo null.
  const archivoAdjuntoUrl = consultaSeleccionada.adjunto
    ? `${urlBaseSupabase}${consultaSeleccionada.adjunto}`
    : null;

  // Este useEffect permite que cuando se haga visible el modal se carguen los datos del paciente y del sanitario de la consulta seleccionada gracias a los DNIs guardados en esta.
  useEffect(() => {
    const fetchSanitario = async () => {
      if (!isOculto) {
        try {
          const paciente = await obtenerPacientePorDni(
            consultaSeleccionada.dni_paciente
          )
          setPacienteConsulta(paciente[0]);
          const sanitario = await obtenerSanitarioPorDni(consultaSeleccionada.dni_sanitario);
          setSanitarioConsulta(sanitario[0]);
        } catch (error) {
          console.error('Error al obtener los datos del sanitario:', error);
        }
      }
    };
    
    fetchSanitario();
  }, [isOculto, obtenerSanitarioPorDni, obtenerPacientePorDni, consultaSeleccionada.dni_paciente, consultaSeleccionada.dni_sanitario]); 
    
  // Pinta el modal de la consulta de un paciente.
  return (
    <div id="ModalConsulta" className={isOculto ? "ocultar" : ""}>
      <div className="contenidoConsulta">
        <div className="botonesConsulta">
          <div className="cerrar" onClick={ocultarModal}>
            <CloseRoundedIcon />
          </div>
        </div>
        <div className={usuario.role == "sanitario" ? 'DatosConsultaS' : "DatosConsulta"}>
          <div className="InformacionConsulta">
            <div>
              <h4>Nº Consulta</h4>
              <p>{consultaSeleccionada.id_consulta}</p>
            </div>
            <div>
              <h4>Fecha</h4>
              <p>{convertirStringAFecha(consultaSeleccionada.fecha)}</p>
            </div>
          </div>
          <div className="InformacionConsulta">
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
        <div className="InformeConsulta">
        <div className={usuario.role == "sanitario" ? 'CajaConsultaS' : "CajaConsulta"}>
            <h4>Observaciones</h4>
            <p>{consultaSeleccionada.observaciones || ""}</p>
          </div>
          <div className={usuario.role == "sanitario" ? 'CajaConsultaS' : "CajaConsulta"}>
            <h4>Diagnóstico</h4>
            <p>{consultaSeleccionada.diagnostico || ""}</p>
          </div>
          <div className={usuario.role == "sanitario" ? 'CajaConsultaS' : "CajaConsulta"}>
            <h4>Recetas</h4>
            <p>{consultaSeleccionada.receta || ""}</p>
          </div>
          <div className={usuario.role == "sanitario" ? 'CajaConsultaS' : "CajaConsulta"}>
            <h4>Pruebas</h4>
            <p>{consultaSeleccionada.pruebas || ""}</p>
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
                ocultarModal();
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

export default ModalConsultaPaciente;
