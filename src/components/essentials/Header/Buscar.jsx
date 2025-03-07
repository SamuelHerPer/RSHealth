import React from 'react'
import "./Buscar.css"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import useUsuarios from '../../../hooks/useUsuarios';

//Muestra el cuadro de búsqueda con la lupa.
const Buscar = () => {
  const { sesionIniciada, usuario } = useUsuarios();
  return (
    <div id='Buscar' className={!sesionIniciada ? "" : usuario.role == "sanitario" ? "buscarSanitario" : usuario.role == "administrador" ? "buscarAdministrador" : "buscarPaciente"}>
        <input type="text" name="buscar" id="buscar" placeholder='Buscar...' className={!sesionIniciada ? "" : usuario.role == "sanitario" ? "buscarSanitario" : usuario.role == "administrador" ? "buscarAdministrador" : "buscarPaciente"}/>
        <SearchRoundedIcon className='lupa'/>
    </div>
  )
}

export default Buscar