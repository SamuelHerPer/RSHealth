import React from 'react'
import Foto from './Foto/Foto'
import Datos from './Datos/Datos'
import "./Usuario.css"
import { Link } from 'react-router-dom'
import useUsuarios from '../../../../hooks/useUsuarios'

//Muestro el cuadro del usuario.
const Usuario = () => {
  const { sesionIniciada, usuario } = useUsuarios();
  return (
    <Link to={'/perfil'}>
      <div id='Usuario' className={!sesionIniciada ? "" : usuario.role == "sanitario" ? "usuarioSanitario" : usuario.role == "administrador" ? "usuarioAdministrador" : "usuarioPaciente"}>
        <Foto />          {/*Muestra el componente que contiene la foto de perfil */}
        <Datos />         {/*Muestra el componente que contiene los datos del usuario */}
      </div>
    </Link>
  )
}

export default Usuario