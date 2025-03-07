import React from 'react'
import "./MainContent.css";
import Links from '../../../pages/Links/Links';

// Componente en el que se muestran los links (aquí se cargan los componentes según la ruta).
const MainContent = () => {
  return (
    <div id='MainContent'>
        <Links />
    </div>
  )
}

export default MainContent