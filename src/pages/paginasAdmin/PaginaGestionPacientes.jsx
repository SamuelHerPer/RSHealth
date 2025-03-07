import React from 'react'
import FormularioPaciente from '../../components/gestionAdministrador/formularioPaciente/FormularioPaciente'
import "./PaginaGestionPacientes.css";

// Página para crear un nuevo usuario Paciente.
const PaginaGestionPacientes = () => {
  return (
    <div id='PaginaGestionPacientes'>
      <h1>Nuevo Paciente</h1>
      <FormularioPaciente/>
    </div>
  )
}

export default PaginaGestionPacientes