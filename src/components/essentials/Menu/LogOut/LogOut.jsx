import React from 'react'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'; //Importo el icono para utilizarlo.
import Opcion from '../Navigation/Opcion/Opcion';
import useUsuarios from '../../../../hooks/useUsuarios';

//Muestra el icono y el texto de cerrar sesión.
const LogOut = () => {
  const { cerrarSesion } = useUsuarios();
  return (
    <div id='log-out'>
        <ul onClick={() => {
          cerrarSesion();
        }}>
          <Opcion icono={<LogoutRoundedIcon className='icono'/>} opcion={"Cerrar sesión"} />
        </ul>
    </div>
  )
}

export default LogOut