import React from "react";
import HomeIcon from "@mui/icons-material/HomeRounded";
import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded";
import SickRoundedIcon from "@mui/icons-material/SickRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import EmojiPeopleRounded from "@mui/icons-material/EmojiPeopleRounded";
import MasksRoundedIcon from '@mui/icons-material/MasksRounded';
import Opcion from "./Opcion/Opcion";
import { Link } from "react-router-dom";
import useUsuarios from "../../../../hooks/useUsuarios";

//He importado los iconos para utilizarlos.
const Navigation = () => {
  const { sesionIniciada, usuario } = useUsuarios();
  return (
    <div id="navigation">
      <ul>
        {/*LLamo al componente Opcion y le paso el icono y el texto de la opción*/}
        {!sesionIniciada ? (
          ""
        ) : usuario.role == "sanitario" ? (
          <div>
            <Link to="/">
              <Opcion
                icono={<HomeIcon className="icono" />}
                opcion={"Inicio"}
              />
            </Link>
            <Link to="/citasSanitario">
              <Opcion
                icono={<SickRoundedIcon className="icono" />}
                opcion={"Citas"}
              />
            </Link>
            <Link to="/consulta">
              <Opcion
                icono={<HealthAndSafetyRoundedIcon className="icono" />}
                opcion={"Consulta"}
              />
            </Link>
            <Link to="/pacientes">
              <Opcion
                icono={<EmojiPeopleRounded className="icono" />}
                opcion={"Pacientes"}
              />
            </Link>
            <Link to="/resultado">
              <Opcion
                icono={<MedicalInformationRoundedIcon className="icono" />}
                opcion={"Resultado"}
              />
            </Link>
          </div>
        ) : usuario.role == "administrador" ? (
          <div>
            <Link to="/">
              <Opcion
                icono={<HomeIcon className="icono" />}
                opcion={"Inicio"}
              />
            </Link>
            <Link to="/gestionPaciente">
              <Opcion
                icono={<SickRoundedIcon className="icono" />}
                opcion={"Paciente"}
              />
            </Link>
            <Link to="/gestionSanitario">
              <Opcion
                icono={<MasksRoundedIcon className="icono" />}
                opcion={"Sanitario"}
              />
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/">
              <Opcion
                icono={<HomeIcon className="icono" />}
                opcion={"Inicio"}
              />
            </Link>
            <Link to="/citas">
              <Opcion
                icono={<SickRoundedIcon className="icono" />}
                opcion={"Citas"}
              />
            </Link>
            <Link to="/historial">
              <Opcion
                icono={<MedicalInformationRoundedIcon className="icono" />}
                opcion={"Historial"}
              />
            </Link>
            <Link to="/medicos">
              <Opcion
                icono={<EmojiPeopleRounded className="icono" />}
                opcion={"Médicos"}
              />
            </Link>
            <Link to="/farmacias">
              <Opcion
                icono={<HealthAndSafetyRoundedIcon className="icono" />}
                opcion={"Farmacias"}
              />
            </Link>
            <Link to="/contacto">
              <Opcion
                icono={<ContactPhoneRoundedIcon className="icono" />}
                opcion={"Contacto"}
              />
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
