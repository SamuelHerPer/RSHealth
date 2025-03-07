import React from "react";
import "./InformacionDelSanitario.css";
import useDatos from "../../hooks/useDatos";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { cambiarFormatoFecha } from "../../biblioteca/biblioteca";

// Componente que muestra el perfil público a los pacientes.
const InformacionDelSanitario = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { sanitarioSeleccionado } = useDatos();

  return (
    <div id="InformacionDelSanitario">
      <Link to={"/medicos"} className="volver">
        <ArrowBackRoundedIcon />
      </Link>
      {sanitarioSeleccionado ? (
        <div id="InformacionPersonalM">
          <div id="DatosPersonalesMedicos">
            <div className="DatosM Seccion1M">
              <p className="TituloSeccionM">Información Personal</p>
              <p className="DatoM">
                <strong>Nombre completo:</strong> {sanitarioSeleccionado.nombre}{" "}
                {sanitarioSeleccionado.apellido_1}{" "}
                {sanitarioSeleccionado.apellido_2}
              </p>
              <p className="DatoM"><strong>ID Sanitario: </strong> {sanitarioSeleccionado.dni_sanitario}</p>
              <p className="DatoM">
              <strong>Fecha de Nacimiento:</strong> {cambiarFormatoFecha(sanitarioSeleccionado.fecha_nacimiento)}
              </p>
              <p className="DatoM">
              <strong>Especialidad:</strong> {sanitarioSeleccionado.especialidad}
              </p>
            </div>

            <div className="DatosM Seccion2">
              <p className="TituloSeccionM">Contacto</p>
              <p className="DatoM">
              <strong>Correo Electrónico:</strong> {sanitarioSeleccionado.email}
              </p>
              <p className="DatoM"><strong>Teléfono:</strong> {sanitarioSeleccionado.telefono}</p>
              <p className="DatoM">
              <strong>Dirección:</strong> {sanitarioSeleccionado.direccion}
              </p>
              <p className="DatoM"><strong>Ciudad:</strong> {sanitarioSeleccionado.ciudad}</p>
            </div>
          </div>

          <div className="HistorialMedicoM">
            <div className="DatosM Seccion3M">
              <p className="TituloSeccionM">Perfil público</p>
              <p className="DatoM">
              <strong>Información personal:</strong> <br />{" "}
                {sanitarioSeleccionado.informacion_personal}
              </p>
              <p className="DatoM">
              <strong>Formación:</strong>
                <br />
                {sanitarioSeleccionado.formacion}
              </p>
              <p className="DatoM">
              <strong>Experiencia:</strong>
                <br />
                {sanitarioSeleccionado.experiencia}
              </p>
            </div>
          </div>
        </div>
      ) : (
        "No se ha encontrado información sobre el paciente."
      )}
    </div>
  );
};

export default InformacionDelSanitario;
