import React from 'react'
import { Link } from "react-router-dom";
import "./MenuMovil.css";
import HomeIcon from "@mui/icons-material/HomeRounded";
import SickRoundedIcon from "@mui/icons-material/SickRounded";
import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import useUsuarios from '../../../../hooks/useUsuarios';
import MenuHamburguesa from '../MenuHamburguesa/MenuHamburguesa';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import MasksRoundedIcon from '@mui/icons-material/MasksRounded';

// Muestra el menú en formato movil.
const MenuMovil = () => {
    const { sesionIniciada, usuario, menuHamburguesa, ocultarMenuHamburguesa, mostrarMenuHamburguesa } = useUsuarios();
  return (
    <div id='MenuMovil' className={!sesionIniciada ? "menuMovilOculto" : usuario.role == "sanitario" ? "sanitario" : usuario.role == "administrador" ? "administrador" : "paciente"}>
            {!sesionIniciada ? (
                ""
            ) : usuario.role == "sanitario" ? (
                <>
                    <Link to="/" className='opcionMenuMovil' onClick={() => {
                        menuHamburguesa && ocultarMenuHamburguesa()
                        }}>
                        <HomeIcon />
                    </Link>
                    <Link to="/citas" className='opcionMenuMovil' onClick={() => {
                        menuHamburguesa && ocultarMenuHamburguesa()
                        }}>
                        <SickRoundedIcon />
                    </Link>
                    <Link to="/consulta" className='opcionMenuMovil' onClick={() => {
                        menuHamburguesa && ocultarMenuHamburguesa()
                        }}>
                        <HealthAndSafetyRoundedIcon />
                    </Link>
                </>
            ) : usuario.role == "administrador" ? (
                <>
                    <Link to="/gestionPaciente" className='opcionMenuMovil' onClick={() => {
                        menuHamburguesa && ocultarMenuHamburguesa()
                        }}>
                        <SickRoundedIcon />
                    </Link>
                    <Link to="/gestionSanitario" className='opcionMenuMovil' onClick={() => {
                        menuHamburguesa && ocultarMenuHamburguesa()
                        }}>
                        <MasksRoundedIcon />
                    </Link>
                </>
            ) : usuario.role = "paciente" && (
                <>
                    <Link to="/" className='opcionMenuMovil' onClick={() => {
                        menuHamburguesa && ocultarMenuHamburguesa()
                        }}>
                        <HomeIcon />
                    </Link>
                    <Link to="/citas" className='opcionMenuMovil' onClick={() => {
                        menuHamburguesa && ocultarMenuHamburguesa()
                        }}>
                        <SickRoundedIcon />
                    </Link>
                    <Link to="/historial" className='opcionMenuMovil' onClick={() => {
                        menuHamburguesa && ocultarMenuHamburguesa()
                        }}>
                        <MedicalInformationRoundedIcon />
                    </Link>
                </>
            )}

            <div className='opcionMenuMovil' onClick={() => {
                menuHamburguesa ? ocultarMenuHamburguesa() : mostrarMenuHamburguesa()
                }}>
                <MenuRoundedIcon />
            </div>
    </div>
  )
}

export default MenuMovil