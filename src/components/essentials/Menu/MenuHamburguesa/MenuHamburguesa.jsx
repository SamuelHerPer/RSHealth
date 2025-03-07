import React from 'react'
import useUsuarios from "../../../../hooks/useUsuarios";
import "./MenuHamburguesa.css";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HomeIcon from "@mui/icons-material/HomeRounded";
import logo from "../../../../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import SickRoundedIcon from "@mui/icons-material/SickRounded";
import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded";
import EmojiPeopleRounded from "@mui/icons-material/EmojiPeopleRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Usuario from "../../Header/Usuario/Usuario.jsx";
import MasksRoundedIcon from '@mui/icons-material/MasksRounded';

// Muestra el menú hamburguesa.
const MenuHamburguesa = () => {
    const { ocultarMenuHamburguesa, menuHamburguesa, usuario, sesionIniciada, cerrarSesion } = useUsuarios();
  return (
    <div id='MenuHamburguesa' className={`${menuHamburguesa ? "mostrar " : "oculto "}${!sesionIniciada ? "" : usuario.role == "sanitario" ? "sanitario" : usuario.role == "administrador" ? "administrador" : "paciente"}`}>
        <div id='HeaderMenuHamburguesa'>
            <div id='logoMenuHamburguesa'>
                <img src={logo} alt="Logo"  />
            </div>
            <div id='cerrarMenuHamburguesa' onClick={() => {ocultarMenuHamburguesa()}}>
                <CloseRoundedIcon />
            </div>
        </div>

        <ul className='enlacesMenuHamburguesa'>
            <li className='link'>

                {!sesionIniciada ? (
                    <h2 className='avisoIniciarSesion'>¡Debes identificarte!</h2>
                ) : 
                usuario.role == "sanitario" ? (
                    <>
                        <Link to="/" onClick={() => {
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='icono'>
                                <HomeIcon />
                            </div>
                            <div className='texto'>
                                Inicio
                            </div>
                        </Link>
                        <Link to="/citas" onClick={() => {
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='icono'>
                                <SickRoundedIcon />
                            </div>
                            <div className='texto'>
                                Citas
                            </div>
                        </Link>
                        <Link to="/consulta" onClick={() => {
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='icono'>
                                <HealthAndSafetyRoundedIcon />
                            </div>
                            <div className='texto'>
                                Consulta
                            </div>
                        </Link>
                        <Link to="/Pacientes" onClick={() => {
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='icono'>
                                <EmojiPeopleRounded />
                            </div>
                            <div className='texto'>
                                Pacientes
                            </div>
                        </Link>
                        <Link to="/resultado" onClick={() => {
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='icono'>
                                <MedicalInformationRoundedIcon />
                            </div>
                            <div className='texto'>
                                Resultado
                            </div>
                        </Link>
                    </>
                ) : usuario.role == "administrador" ? (
                    <>
                        <Link to="/gestionPaciente" onClick={() => {
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='icono'>
                                <SickRoundedIcon />
                            </div>
                            <div className='texto'>
                                Paciente
                            </div>
                        </Link>
                        <Link to="/gestionSanitario" onClick={() => {
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='icono'>
                                <MasksRoundedIcon />
                            </div>
                            <div className='texto'>
                                Sanitario
                            </div>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/" onClick={() => {
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='icono'>
                                <HomeIcon />
                            </div>
                            <div className='texto'>
                                Inicio
                            </div>
                        </Link>
                        <Link to="/citas" onClick={() => {
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='icono'>
                                <SickRoundedIcon />
                            </div>
                            <div className='texto'>
                                Citas
                            </div>
                        </Link>
                        <Link to="/historial" onClick={() => {
                                ocultarMenuHamburguesa();
                            }}>
                            <div className='icono'>
                                <MedicalInformationRoundedIcon />
                            </div>
                            <div className='texto'>
                                Historial
                            </div>
                        </Link>
                        <Link to="/medicos" onClick={() => {
                                ocultarMenuHamburguesa();
                            }}>
                            <div className='icono'>
                                <EmojiPeopleRounded />
                            </div>
                            <div className='texto'>
                                Médicos
                            </div>
                        </Link>
                        <Link to="/farmacias" onClick={() => {
                                ocultarMenuHamburguesa();
                            }}>
                            <div className='icono'>
                                <HealthAndSafetyRoundedIcon />
                            </div>
                            <div className='texto'>
                                Farmacias
                            </div>
                        </Link>
                        <Link to="/contacto" onClick={() => {
                                ocultarMenuHamburguesa();
                            }}>
                            <div className='icono'>
                                <ContactPhoneRoundedIcon />
                            </div>
                            <div className='texto'>
                                Contacto
                            </div>
                        </Link>
                    </>
                )}
            </li>
        </ul>

        {sesionIniciada && (
                    <div id='accionesMenuHamburguesa'>
                        <div id='PerfilMenuHamburguesa' onClick={() => {
                            ocultarMenuHamburguesa();
                            }}>
                            <Usuario />
                        </div>
                        <div className='opcionMenuHamburguesa' onClick={() => {
                            cerrarSesion();
                            ocultarMenuHamburguesa();
                        }}>
                            <div className='iconoCerrarSesion'>
                                <LogoutRoundedIcon />
                            </div>
                            <div className='texto'>
                                Cerrar sesión
                            </div>
                        </div>
                    </div>
                )}
    </div>
  )
}

export default MenuHamburguesa