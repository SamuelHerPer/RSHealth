import React, { useEffect, useState } from "react";
import useUsuarios from "../../hooks/useUsuarios";
import useDatos from "../../hooks/useDatos";
import { cambiarFormatoFecha } from "../../biblioteca/biblioteca";
import ModalPerfil from "./ModalPerfil";
import "./Perfil.css";

// Muestra el perfil del usuario en sesión.
const Perfil = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { usuario, mostrarModal } = useUsuarios();
  const { obtenerNombreProvincia } = useDatos();

  // Se declaran los estados necesario en ámbito local.
  const [provincia, setProvincia] = useState("");

  // Carga la provincia.
  useEffect(() => {
    const cargarProvincia = async () => {
      const nombreProvincia = await obtenerNombreProvincia(usuario.provincia);
      setProvincia(nombreProvincia);
    };
    cargarProvincia();
  }, []);

  return (
    <>
      <div id="Perfil">
        <div
          className={
            usuario.role == "sanitario"
              ? "CajaInformacion CajaInformacionSanitario"
              : usuario.role == "administrador"
              ? "CajaInformacion CajaInformacionAdministrador"
              : "CajaInformacion CajaInformacionPaciente"
          }
        >
          {usuario.role == "sanitario" ? (
            <>
              <h2>Datos</h2>
              <div id="InformacionUsuario">
                <div className="dato">
                  <h4>Correo Electrónico</h4>
                  <p>{usuario.email}</p>
                </div>
                <div className="dato">
                  <h4>DNI</h4>
                  <p>{usuario.dni}</p>
                </div>
                <div className="dato">
                  <h4>Nombre</h4>
                  <p>{usuario.nombre}</p>
                </div>
                <div className="dato">
                  <h4>Primer Apellido</h4>
                  <p>{usuario.apellido_1}</p>
                </div>
                <div className="dato">
                  <h4>Segundo Apellido</h4>
                  <p>{usuario.apellido_2}</p>
                </div>
                <div className="dato">
                  <h4>Fecha Nacimiento</h4>
                  <p>{cambiarFormatoFecha(usuario.fecha_nacimiento)}</p>
                </div>
                <div className="dato">
                  <h4>
                    {usuario.role == "sanitario"
                      ? "Especialidad"
                      : "Grupo Sanguíneo"}
                  </h4>
                  <p>
                    {usuario.role == "sanitario"
                      ? usuario.especialidad
                      : usuario.grupo_sanguineo}
                  </p>
                </div>
              </div>
            </>
          ) : usuario.role == "administrador" ? (
            <>
              <h2>Datos</h2>
              <div id="InformacionUsuario">
                <div className="dato">
                  <h4>Correo Electrónico</h4>
                  <p>{usuario.email}</p>
                </div>
                <div className="dato">
                  <h4>Nombre</h4>
                  <p>{usuario.nombre}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>Datos</h2>
              <div id="InformacionUsuario">
                <div className="dato">
                  <h4>Correo Electrónico</h4>
                  <p>{usuario.email}</p>
                </div>
                <div className="dato">
                  <h4>DNI</h4>
                  <p>{usuario.dni}</p>
                </div>
                <div className="dato">
                  <h4>Nombre</h4>
                  <p>{usuario.nombre}</p>
                </div>
                <div className="dato">
                  <h4>Primer Apellido</h4>
                  <p>{usuario.apellido_1}</p>
                </div>
                <div className="dato">
                  <h4>Segundo Apellido</h4>
                  <p>{usuario.apellido_2}</p>
                </div>
                <div className="dato">
                  <h4>Fecha Nacimiento</h4>
                  <p>{cambiarFormatoFecha(usuario.fecha_nacimiento)}</p>
                </div>
                <div className="dato">
                  <h4>
                    {usuario.role == "sanitario"
                      ? "Especialidad"
                      : "Grupo Sanguíneo"}
                  </h4>
                  <p>
                    {usuario.role == "sanitario"
                      ? usuario.especialidad
                      : usuario.grupo_sanguineo}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {usuario.role == "sanitario" ? (
          <div
            className={
              usuario.role == "sanitario"
                ? "CajaInformacion CajaInformacionSanitario"
                : usuario.role == "administrador"
                ? "CajaInformacion CajaInformacionAdministrador"
                : "CajaInformacion CajaInformacionPaciente"
            }
          >
            <h2>Contacto</h2>
            <div id="ContactoUsuario">
              <div className="dato">
                <h4>Teléfono</h4>
                <p>{usuario.telefono}</p>
              </div>
              <div className="dato">
                <h4>Dirección</h4>
                <p>{usuario.direccion}</p>
              </div>
              <div className="dato">
                <h4>Provincia</h4>
                <p>{provincia}</p>
              </div>
              <div className="dato">
                <h4>Ciudad</h4>
                <p>{usuario.ciudad}</p>
              </div>
            </div>
          </div>
        ) : usuario.role == "administrador" ? (
          ""
        ) : (
          <div
            className={
              usuario.role == "sanitario"
                ? "CajaInformacion CajaInformacionSanitario"
                : usuario.role == "administrador"
                ? "CajaInformacion CajaInformacionAdministrador"
                : "CajaInformacion CajaInformacionPaciente"
            }
          >
            <h2>Contacto</h2>
            <div id="ContactoUsuario">
              <div className="dato">
                <h4>Teléfono</h4>
                <p>{usuario.telefono}</p>
              </div>
              <div className="dato">
                <h4>Dirección</h4>
                <p>{usuario.direccion}</p>
              </div>
              <div className="dato">
                <h4>Provincia</h4>
                <p>{provincia}</p>
              </div>
              <div className="dato">
                <h4>Ciudad</h4>
                <p>{usuario.ciudad}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {usuario.role == "sanitario" ? (
        <button
          className={
            usuario.role == "sanitario" ? "BotonSanitario" : "BotonPaciente"
          }
          onClick={async () => {
            mostrarModal();
          }}
        >
          Actualiza tu perfil
        </button>
      ) : usuario.role == "administrador" ? (
        ""
      ) : (
        <button
          className={
            usuario.role == "sanitario" ? "BotonSanitario" : "BotonPaciente"
          }
          onClick={async () => {
            mostrarModal();
          }}
        >
          Actualiza tu perfil
        </button>
      )}

      <ModalPerfil />
    </>
  );
};

export default Perfil;
