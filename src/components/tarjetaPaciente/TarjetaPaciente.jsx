import React from 'react'
import { Link } from 'react-router-dom'
import "./TarjetaPaciente.css";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import useDatos from '../../hooks/useDatos';

// Muestra los datos de un paciente en una tarjeta.
const TarjetaPaciente = ({paciente}) => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const {pacienteSeleccionado, setPacienteSeleccionado} = useDatos();
  
  return (
    <div id='TarjetaOrga'>
        <div id='NombreOrga'>
          <div className={'avatar color-3'}>
            <span>{(paciente.nombre).charAt(0).toUpperCase()}</span>
          </div>
          <p>{paciente.nombre}</p>
        </div>
        <div id='InformacionOrga'>
          <div id='DatosOrga'>
            <div className='Dato'>
              <p>DNI</p>
              <h5>{paciente.dni_paciente}</h5>
            </div>
            <div className='Dato'>
              <p>Teléfono</p>
              <h5>{paciente.telefono}</h5>
            </div>
          </div>
          <div id='MasInformacion'>
            <Link to={'/detallesDelPaciente'} onClick={() => {
              setPacienteSeleccionado(paciente);
            }}>
              Ver más
              <ArrowForwardRoundedIcon />
            </Link>
          </div>
        </div>
    </div>
  )
}

export default TarjetaPaciente