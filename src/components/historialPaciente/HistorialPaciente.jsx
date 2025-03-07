import React, { useEffect, useState } from 'react'
import ConsultasPaciente from '../consultasPaciente/ConsultasPaciente';
import ResultadosPaciente from '../resultadosPaciente/ResultadosPaciente';
import useDatos from '../../hooks/useDatos';
import useUsuarios from '../../hooks/useUsuarios';
import "./HistorialPaciente.css";

// Componente que muestra las consultas o los resultados.
const HistorialPaciente = () => {
    // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
    const {usuario} = useUsuarios();
    const {obtenerConsultasPaciente, obtenerResultadosPaciente, isConsulta, setIsConsulta} = useDatos();

    // Obtiene las consultas y los resultados del paciente.
    useEffect(() => {
      obtenerConsultasPaciente(usuario.dni);
      obtenerResultadosPaciente(usuario.dni);
    } ,[])
  
  // Pinta las consultas o los resultados.
  return (
    <div id='HistorialPaciente'>
      <h2>HISTORIAL DE {isConsulta ? "CONSULTAS" : "RESULTADOS"}</h2>
      <nav>
        <div id='MenuHistorial'>
          <p className='FiltrarHistorial BotonPaciente' onClick={() => {
            obtenerConsultasPaciente(usuario.dni);
            setIsConsulta(true);
          }}>
            CONSULTAS
          </p>
          <p className='FiltrarHistorial BotonPaciente' onClick={() => {
            obtenerResultadosPaciente(usuario.dni);
            setIsConsulta(false);
          }}>
            RESULTADOS
          </p>
        </div>
      </nav>

      {isConsulta ? <ConsultasPaciente /> : <ResultadosPaciente />}
    </div>
  )
}

export default HistorialPaciente