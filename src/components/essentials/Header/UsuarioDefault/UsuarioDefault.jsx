import React from 'react'
import "./UsuarioDefault.css"
import Foto from "../../../../assets/images/foto-perfil-generica.jpg"

// Muestra la foto de perfil genérica
const UsuarioDefault = () => {
  return (
    <div id='UsuarioDefault'>
        <img src={Foto} alt="Foto de perfil" />
    </div>
  )
}

export default UsuarioDefault