import React from 'react'
import "./Resultado.css";
import {convertirStringAFecha} from '../../biblioteca/biblioteca';
import useDatos from '../../hooks/useDatos';
import useUsuarios from '../../hooks/useUsuarios';

// Mestra un resultado en una tarjeta.
const Resultado = (props) => {

    // Se extraen los estados y funciones necesarios del contexto utilizando el hook y el props.
    const { tipologia, fecha, id } = props;
    const { obtenerResultadoSeleccionado } = useDatos();
    const { mostrarModalRes, usuario } = useUsuarios();
    
  return (
    <div className={usuario.role == 'sanitario' ? 'ResultadoS' : 'Resultado'}>
        <h3>{tipologia}</h3>
        <p>{convertirStringAFecha(fecha)}</p>
        <button onClick={async () => {
            await obtenerResultadoSeleccionado(id);
            mostrarModalRes();   //Muestra el modal de los detalles de la consulta.

        }}>
            Detalles
        </button>
    </div>
  )
}

export default Resultado