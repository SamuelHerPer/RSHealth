import React from 'react'
import { Link } from 'react-router-dom'
import "./TarjetaSanitario.css";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import useDatos from '../../hooks/useDatos';

// Muestra los datos de un sanitario en una tarjeta.
const TarjetaSanitario = ({sanitario}) => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const {sanitarioSeleccionado, setSanitarioSeleccionado} = useDatos();
  
  return (
    <div id='TarjetaSanitario'>
        <div id='NombreSanitario'>
          <div className={'avatar color-0'}>
            <span>{(sanitario.nombre).charAt(0).toUpperCase()}</span>
          </div>
          <p>{sanitario.nombre}</p>
        </div>
        <div id='InformacionSanitario'>
          <div id='DatosSanitario'>
            <div className='Dato'>
              <p> ID SANITARIO</p>
              <h5>{sanitario.dni_sanitario}</h5>
            </div>
            <div className='Dato'>
              <p>Teléfono</p>
              <h5>{sanitario.telefono}</h5>
            </div>
          </div>
          <div id='MasInformacion'>
            <Link to={'/detallesDelSanitario'} onClick={() => {
              setSanitarioSeleccionado(sanitario);
            }}>
              Ver más
              <ArrowForwardRoundedIcon />
            </Link>
          </div>
        </div>
    </div>
  )
}

export default TarjetaSanitario