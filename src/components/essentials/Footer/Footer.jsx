import React from 'react'
import "./Footer.css"
import Autores from './Autores/Autores'
import useUsuarios from '../../../hooks/useUsuarios';

/*Muestra información relevante sobre nuestro sitio web */
const Footer = () => {
  const { sesionIniciada } = useUsuarios();
  return (
    <div id='Footer' className={!sesionIniciada ? "footerOculto" : undefined}>
        <div id='Copyright'>
          <h1>2024 © RSH Health</h1>
        </div>
        <Autores />
    </div>
  )
}

export default Footer