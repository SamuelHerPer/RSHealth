import React, {useEffect, useState} from "react";
import useUsuarios from "../../hooks/useUsuarios.js";
import './LoginFormulario.css';
import logo from "../../assets/images/logo.jpg";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Muestra el formulario de inicio de sesión.
const LoginFormulario = () => {

    // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
    const {actualizarDato, iniciarSesion, errorUsuario, vaciarErrorUsuario} = useUsuarios();
    const [mostrandoContrasenya, setMostrandoContrasenya] = useState(false);

    // Vacía el mensaje de error.
    useEffect(() => {
      vaciarErrorUsuario();
    }, []);

  return (
    <div id="LoginFormulario">
      <div id="HeaderFormularioLogin">
        <img src={logo} alt="Logo RSHealth" />
        <p>RSHealth</p>
      </div>

      <div id="BodyFormularioLogin">
        <div id="MensajeBienvenida">
          <h5>¡Nos alegra tenerte aquí!</h5>
          <p>Identificate para continuar.</p>
        </div>

        <form>
          <div id="Campos">
            <div id="Email">
              <label htmlFor="email">Correo electrónico</label>
              <input
                className="inputLogin"
                type="email"
                name="email"
                id="email"
                placeholder="Introduzca su correo electrónico."
                onChange={(e) => {
                  actualizarDato(e);
                }}
              />
            </div>

            <div id="Contrasenya">
              <div id="labelContrasenya">
                <label htmlFor="password">Contraseña</label>
                <p>Contraseña olvidada?</p>
              </div>
              <div id="ContrasenyaMostrar">
                <input
                  className="inputLogin"
                  type={mostrandoContrasenya == false ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Introduzca su contraseña."
                  onChange={(e) => {
                    actualizarDato(e);
                  }}
                />
                <div id="mostrarContrasenya" onClick={() => {
                  setMostrandoContrasenya(!mostrandoContrasenya);
                }}>
                  {mostrandoContrasenya ? <VisibilityOffIcon /> : <VisibilityRoundedIcon />}
                </div>
              </div>
            </div>
            <h3 className='errorLogin'>{errorUsuario ?  "**" + errorUsuario + "**" : ""}</h3>

            <button
              className="botonSesion"
              onClick={(e) => {
                e.preventDefault();
                iniciarSesion();
                setMostrandoContrasenya(false);
              }}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>

      <div id="FooterFormularioLogin">
        <div id="DerechosFooterFormularioLogin">
          <p>2024 © RSH Health</p>
        </div>
      </div>
      
    </div>
  );
};

export default LoginFormulario;
