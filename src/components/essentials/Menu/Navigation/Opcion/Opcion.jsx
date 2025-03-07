import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import "./Opcion.css"

//Le entra el icono de la opción y el texto de la opción y los pinta.
const Opcion = ({opcion, icono}) => {
  return (
    <ListItem className='opcion'>
        <ListItemIcon className='opcion-icono'>
            {icono} 
        </ListItemIcon>
        <ListItemText primary={opcion} className='opcion-texto'/>
    </ListItem>
  )
}

export default Opcion