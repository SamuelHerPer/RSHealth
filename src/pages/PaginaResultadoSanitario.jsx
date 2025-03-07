import React from 'react'
import ResultadoSanitario from '../components/resultadoSanitario/ResultadoSanitario'
import "./PaginaResultadoSanitario.css";

// Página que muestra el formulario para que un sanitario cree un resultado del paciente.
const PaginaResultadoSanitario = () => {
  return (
    <div id='PaginaResultadoSanitario'>
      <h2>CREAR RESULTADO</h2>
      <ResultadoSanitario />
    </div>
  )
}

export default PaginaResultadoSanitario