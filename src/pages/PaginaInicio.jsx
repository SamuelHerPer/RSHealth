import React from 'react'
import Inicio from '../components/inicio/Inicio'
import './PaginaInicio.css'
import useUsuarios from '../hooks/useUsuarios'

import LoginFormulario from '../components/loginformulario/LoginFormulario'
import LoginWrapper from '../components/loginWrapper/LoginWrapper'
import InicioSanitario from '../components/inicio/InicioSanitario'
import InicioAdmin from '../components/inicio/InicioAdmin'

// Página que muestra el inicio dependiendo del tipo de usuario que se ha identificado.
const PaginaInicio = () => {
  const { sesionIniciada, usuario } = useUsuarios();

  return (
    <div id='Inicio'>
      {!sesionIniciada ? (
        <div id='PaginaLogin'>
          <LoginWrapper />
          <LoginFormulario />
        </div>
      ) : (
        usuario.role == "sanitario" ? <InicioSanitario/> : usuario.role == "administrador" ? <InicioAdmin/> : <Inicio/>
      )}
    </div>
  )
}

export default PaginaInicio