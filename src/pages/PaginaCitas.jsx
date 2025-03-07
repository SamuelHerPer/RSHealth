import React from 'react'
import './PaginaCitas.css'
import CitasPaciente from '../components/citasPaciente/CitasPaciente'

// Página que muestra las citas del paciente.
const PaginaCitas = () => {

  return (
    <div id='Citas'>
        <CitasPaciente />
    </div>
  )
}

export default PaginaCitas