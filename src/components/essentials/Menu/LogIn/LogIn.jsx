import React from 'react'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Opcion from '../Navigation/Opcion/Opcion';
import { Link } from 'react-router-dom';

//Muestra el botón de iniciar sesión.
const LogIn = () => {
  return (
    <div id='log-in'>
        <ul>
          <Link to={'/login'}>
            <Opcion icono={<LoginRoundedIcon className='icono'/>} opcion={"Iniciar sesión"} />
          </Link>
        </ul>
    </div>
  )
}

export default LogIn