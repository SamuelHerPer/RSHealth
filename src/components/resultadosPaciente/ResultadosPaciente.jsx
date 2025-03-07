import React, { useEffect } from "react";
import useDatos from "../../hooks/useDatos";
import useUsuarios from "../../hooks/useUsuarios";
import Resultado from "../resultado/Resultado";
import ModalResultadoPaciente from "./ModalResultadoPaciente";
import "./ResultadosPaciente.css";

// Muestra la página que lista los resultado del paciente en tarjetas.
const ResultadosPaciente = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const {
    listadoResultadosPaciente,
    obtenerResultadosPacientePorEspecialidad,
    obtenerResultadosPaciente,
    obtenerEspecialidadesResultado,
    especialidadesResultado,
  } = useDatos();
  const { usuario } = useUsuarios();

  // Obtiene todas las especialidades que hay en los resultados (para filtrar).
  useEffect(() => {
    obtenerEspecialidadesResultado(usuario.dni);
    
  }, []);
  return (
    <>
      <div id="FiltrosConsulta">
        <h3>FILTRAR POR ESPECIALIDAD</h3>
        <div id="OpcionFiltro">
          <select
            name="especialidad"
            id="especialidad"
            onChange={(e) => {
              if (e.target.value) {
                obtenerResultadosPacientePorEspecialidad(
                  usuario.dni,
                  e.target.value
                ); //Si se ha seleccionado algúna especialidad busca por dicha especialidad.
              } else {
                obtenerResultadosPaciente(usuario.dni); //Si se ha seleccionado la opción de todas busca todas las consultas.
              }
            }}
          >
            <option value="">Todas</option>
            {especialidadesResultado.map((especialidad, index) => (
              <option key={index} value={especialidad}>
                {especialidad}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div id="ResultadosPaciente">
        {listadoResultadosPaciente && listadoResultadosPaciente.length
          ? listadoResultadosPaciente.map((v, i, a) => {
              return (
                <Resultado
                  key={i}
                  tipologia={v.tipologia}
                  fecha={v.fecha}
                  id={v.id_resultado}
                />
              );
            })
          : "No se han encontrado resultados."}
      </div>

      <div>
        <ModalResultadoPaciente />
      </div>
    </>
  );
};

export default ResultadosPaciente;
