import React from 'react'
import HistorialPaciente from '../components/historialPaciente/HistorialPaciente';
import Error from './Error.jsx';
import useUsuarios from '../hooks/useUsuarios';
import './PaginaHistorial.css'

// Página que muestra el historial del paciente (consultas y resultados).
const PaginaHistorial = () => {
  const { usuario } = useUsuarios();
  return (
    <div id='PaginaHistorial'>
      {usuario.role == 'sanitario' ? <Error /> : <HistorialPaciente />}
    </div>
  )
}

export default PaginaHistorial