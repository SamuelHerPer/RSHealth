import React from 'react'
import ActualizarPerfilFormulario from '../components/actualizarPerfilFormulario/ActualizarPerfilFormulario'
import Perfil from '../components/perfil/Perfil'
import './PaginaPerfil.css'

// Página que pinta todos los detalles del perfil del usuario que está en la sesión.
const PaginaPerfil = () => {
  return (
    <div id='PaginaPerfil'>
        <h1>MI PERFIL</h1>
        <Perfil />
    </div>
  )
}

export default PaginaPerfil