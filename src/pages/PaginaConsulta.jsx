import React from 'react'
import ConsultasSanitario from '../components/consultasSanitario/ConsultasSanitario';
import './PaginaConsulta.css'

// Página para que el sanitario cree una consulta.
const PaginaConsulta = () => {
  return (
    <div id='PaginaConsulta'>
        <h2>CREAR CONSULTA</h2>
        <ConsultasSanitario/>
    </div>
  )
}

export default PaginaConsulta