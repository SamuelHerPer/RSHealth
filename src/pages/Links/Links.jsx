import React from 'react'
import { Routes, Route } from "react-router-dom";
import PaginaInicio from '../PaginaInicio';
import PaginaCitas from '../PaginaCitas';
import PaginaHistorial from '../PaginaHistorial';
import PaginaFarmacias from '../PaginaFarmacias';
import PaginaContacto from '../PaginaContacto';
import PaginaPerfil from '../PaginaPerfil';
import PaginaMedicos from '../PaginaMedicos';
import PaginaConsulta from '../PaginaConsulta';
import PaginaPacientes from '../PaginaPacientes';
import PaginaGestionPacientes from '../paginasAdmin/PaginaGestionPacientes';
import PaginaGestionSanitarios from '../paginasAdmin/PaginaGestionSanitarios';
import PaginaResultadoSanitario from '../PaginaResultadoSanitario';
import PaginaDetallesDelPaciente from '../PaginaDetallesDelPaciente';
import Error from '../Error';
import PaginaDetallesDelSanitario from '../PaginaDetallesDelSanitario';
import PaginaCitasSanitario from '../PaginaCitasSanitario';

// Links que cargan el componente correspondiente dependiendo de la ruta.
const Links = (props) => {
  return (
    <Routes>
        <Route path='/' element={<PaginaInicio />}/>
        <Route path='*' element={<Error />}/>
        <Route path='citas' element={<PaginaCitas />}/>
        <Route path='consulta' element={<PaginaConsulta />}/>
        <Route path='historial' element={<PaginaHistorial />}/>
        <Route path='medicos' element={<PaginaMedicos />}/>
        <Route path='farmacias' element={<PaginaFarmacias />}/>
        <Route path='contacto' element={<PaginaContacto />}/>
        <Route path='pacientes' element={<PaginaPacientes />}/>
        <Route path='perfil' element={<PaginaPerfil />}/>
        <Route path='gestionPaciente' element={<PaginaGestionPacientes />}/>
        <Route path='gestionSanitario' element={<PaginaGestionSanitarios />}/>
        <Route path='resultado' element={<PaginaResultadoSanitario />}/>
        <Route path='detallesDelPaciente' element={<PaginaDetallesDelPaciente />}/>
        <Route path='detallesDelSanitario' element={<PaginaDetallesDelSanitario />}/>
        <Route path='citasSanitario' element={<PaginaCitasSanitario/>}/>

    </Routes>
  )
}

export default Links