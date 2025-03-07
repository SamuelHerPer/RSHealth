import React from 'react'
import './PaginaContacto.css'
import ContactoFormulario from '../components/contactoFormulario/ContactoFormulario'

// Página que muestra el formulario de contacto para dejar un mensaje.
const PaginaContacto = () => {
  return (
    <div id='PaginaContacto'>
        <h2>CONTACTA CON NOSOTROS</h2>
        <ContactoFormulario/>
    </div>
  )
}

export default PaginaContacto