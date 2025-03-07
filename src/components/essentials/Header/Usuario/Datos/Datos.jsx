import React from "react";
import "./Datos.css";
import useUsuarios from "../../../../../hooks/useUsuarios";

//Muestra el nombre y el correo del usuario.
const Datos = () => {
  const {usuario } = useUsuarios();
  return (
    <div id="Datos">
      {usuario.role == "administrador" ? (
        <div id="Nombre">
          <p>
            {"Cuenta de gestión"}
          </p>
        </div>
      ) : (
        <div id="Nombre">
          <p>
            {usuario.nombre ? usuario.nombre + " " : "Nombre"}
            {usuario.apellido_1
              ? usuario.apellido_1 + " "
              : "Apellido1"}
            {usuario.apellido_2
              ? usuario.apellido_2
              : "Apellido2"}
          </p>
        </div>
      )}
      {usuario.role == "administrador" ? (
       <div id="Correo">
       <p>
         {usuario.email
           ? usuario.email
           : "Tu correo electrónico"}
       </p>
     </div>
      ) : (
        <div id="Correo">
        <p>
          {usuario.email
            ? usuario.email
            : "Tu correo electrónico"}
        </p>
      </div>
      )}
    </div>
  );
};

export default Datos;