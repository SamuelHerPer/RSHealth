import React from 'react'
import "./PaginaDetallesDelSanitario.css";
import InformacionDelSanitario from '../components/informacionDelSanitario/InformacionDelSanitario.jsx';

// Página que muestra los detalles de un sanitario (Datos y experiencia).
const PaginaDetallesDelSanitario = () => {
  return (
    <div id='PaginaDetallesDelSanitario'>
        <InformacionDelSanitario />
    </div>
  )
}

export default PaginaDetallesDelSanitario