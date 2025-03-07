import React from 'react'
import "./PaginaDetallesDelPaciente.css";

import InformacionDelPaciente from '../components/informacionDelPaciente/InformacionDelPaciente';

// Página que muestra los detalles de un paciente (Datos y detalles médicos).
const PaginaDetallesDelPaciente = () => {
  return (
    <div id='PaginaDetallesDelPaciente'>
        <InformacionDelPaciente />
    </div>
  )
}

export default PaginaDetallesDelPaciente