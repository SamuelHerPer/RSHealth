import React from 'react'
import './PaginaFarmacias.css'
import BuscadorFarmacias from '../components/farmaciasPaciente/BuscadorFarmacias';

// Página que muestra las farmacias disponibles en una ciudad (por defecto carga las de la ciudad del usuario).
const PaginaFarmacias = () => {
  return (
    <div id='PaginaFarmacias'>
        <h1>FARMACIAS</h1>
        <BuscadorFarmacias></BuscadorFarmacias>
    </div>
  )
}

export default PaginaFarmacias