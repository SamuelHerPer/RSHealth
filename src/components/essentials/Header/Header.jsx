import React from 'react'
import Buscar from './Buscar'
import "./Header.css";
import UsuarioDefault from './UsuarioDefault/UsuarioDefault';
import useUsuarios from '../../../hooks/useUsuarios';
import Usuario from './Usuario/Usuario';

//Muestra el header que está anclado en la parte de arriba.
const Header = () => {
  const { sesionIniciada, usuario } = useUsuarios();
  return (
    <div id='Header' className={!sesionIniciada ? "headerOculto" : usuario.role == "sanitario" ? "sanitario" : usuario.role == "administrador" ? "administrador" : "paciente"}>
        <Buscar />    {/*Muestra la barra de búsqueda*/}
        {!sesionIniciada ? <UsuarioDefault />       /*En caso de que no haya ningún usuario en sesión, se cargará este componente*/
        :
        <Usuario />   /*Muestra los datos del usuario en sesión */
        }
    </div>
  )
}

export default Header