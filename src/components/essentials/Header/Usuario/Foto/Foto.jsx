import React from 'react'
import FotoGenerica from "../../../../../assets/images/foto-perfil-generica.jpg";
import "./Foto.css";
import useUsuarios from '../../../../../hooks/useUsuarios';

//Muestra la foto del usuario.
const Foto = () => {
  const { usuario, sesionIniciada } = useUsuarios();
  return (
    <div id='foto'>
      {!sesionIniciada ? (
        <img src={FotoGenerica} alt="Foto de perfil" className='imagen'/>
      ) : (
        <div className={usuario.role == "sanitario" ? 'avatarPerfil color-3' : usuario.role == "administrador" ? 'avatarPerfil color-1' : 'avatarPerfil color-0'}>
          {usuario && usuario.nombre && (
            <span>{(usuario.nombre).charAt(0).toUpperCase()}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default Foto