import React from 'react'
import "./Contenido.css"
import Footer from '../Footer/Footer'
import MainContent from '../MainContent/MainContent'

/*Muestra el los componentes de su children y debajo de todos ellos el footer */
const Contenido = () => {
  return (
    <>
    <div id='Contenido'>
        <MainContent />
        <Footer />
    </div>
    </>
  )
}

export default Contenido