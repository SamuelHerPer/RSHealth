import React, {useEffect} from 'react'
import "./Consulta.css"
import {convertirStringAFecha} from '../../biblioteca/biblioteca';
import useDatos from '../../hooks/useDatos';
import useUsuarios from '../../hooks/useUsuarios';

const Consulta = (props) => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook y del props.
  const { especialidad, fecha, id } = props;
  const { consultaSeleccionada, obtenerConsultaSeleccionada } = useDatos();
  const { mostrarModal, usuario } = useUsuarios();

  // Pinta la tarjeta de una consulta.
  return (
    <div className={usuario.role == "sanitario" ? 'ConsultaS' : 'Consulta'}>
        <h3>{especialidad}</h3>
        <p>{convertirStringAFecha(fecha)}</p>
        <button onClick={async () => {
            await obtenerConsultaSeleccionada(id);
            mostrarModal();   //Muestra el modal de los detalles de la consulta.

        }}>
            Detalles
        </button>
    </div>
  )
}

export default Consulta