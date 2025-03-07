import React from "react";
import Navigation from "./Navigation/Navigation";
import LogOut from "./LogOut/LogOut";
import "./Menu.css";
import logo from "../../../assets/images/logo.jpg";
import LogIn from "./LogIn/LogIn";
import useUsuarios from "../../../hooks/useUsuarios";
import MenuMovil from "./MenuMovil/MenuMovil";
import MenuHamburguesa from "./MenuHamburguesa/MenuHamburguesa";

//Menú que contiene el logo de la web, las opciones de navegación y el botón de cerrar sesión.
const Menu = () => {
  const { sesionIniciada, usuario } = useUsuarios();
  return (
    <>
      <div id="menu" className={!sesionIniciada ? "menuOculto" : usuario.role == "sanitario" ? "sanitario" : usuario.role == "administrador" ? "administrador" : "paciente"}>
        <img src={logo} alt="Logo" id="logo" />
        <nav id="nav">
          <Navigation /> {/*Muestra las opciones de navegación*/}
          {sesionIniciada && <LogOut />} {/*Muestra la opción de cerrar sesión */}
        </nav>
      </div>
      <MenuMovil />
      <MenuHamburguesa />
    </>
  );
};

export default Menu;
