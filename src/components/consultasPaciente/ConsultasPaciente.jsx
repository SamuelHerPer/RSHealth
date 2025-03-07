import React, { useEffect, useState } from 'react'
import "./ConsultasPaciente.css";
import useDatos from '../../hooks/useDatos';
import Consulta from '../consulta/Consulta';
import ModalConsultaPaciente from './ModalConsultaPaciente';
import useUsuarios from '../../hooks/useUsuarios';

// Muestra el componente que muestra las consultas de un paciente.
const ConsultasPaciente = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { listadoConsultasPaciente, obtenerConsultasPacientePorEspecialidad, obtenerConsultasPaciente,obtenerEspecialidades, especialidades } = useDatos();
  const {usuario} = useUsuarios();

  // Se obtienen las especialidades disponibles.
  useEffect(() => {
    obtenerEspecialidades(usuario.dni);
  }, []);

  // Pinta el filtro de especialidades y el listado de tarjetas de consultas.
  return (
    <>
    <div id='FiltrosConsulta'>
    <h3>FILTRAR POR ESPECIALIDAD</h3>
      <div id='OpcionFiltro'>
        <select name="especialidad" id="especialidad" onChange={(e) => {
          if (e.target.value) {
            obtenerConsultasPacientePorEspecialidad(usuario.dni, e.target.value);  //Si se ha seleccionado algúna especialidad busca por dicha especialidad.
          } else {
            obtenerConsultasPaciente(usuario.dni); //Si se ha seleccionado la opción de todas busca todas las consultas.
          }
        }}>
          <option value="">Todas</option>
            {especialidades.map((especialidad, index) => (
              <option key={index} value={especialidad}>
                {especialidad}
              </option>
            ))}
        </select>
      </div>
    </div>
    <div id='ConsultasPaciente'>
      {listadoConsultasPaciente && listadoConsultasPaciente.length ?
        listadoConsultasPaciente.map((v, i, a) => {
          return <Consulta key={i} especialidad={v.especialidad} fecha={v.fecha} id={v.id_consulta} />
        })
      :
        "No se han encontrado consultas."
      }
    </div>

    <div>
      <ModalConsultaPaciente />
    </div>
    </>
  )
}

export default ConsultasPaciente