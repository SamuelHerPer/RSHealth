import React from "react";
import "./InformacionDelPaciente.css";
import useDatos from "../../hooks/useDatos";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { jsPDF } from "jspdf";
import { cambiarFormatoFecha } from "../../biblioteca/biblioteca";


// Componente que muestra el perfil público a los médicos.
const InformacionDelPaciente = () => {
  
  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { pacienteSeleccionado } = useDatos();

  const generarFicha = () => {
    const doc = new jsPDF();

    // Configurar tipo de letra
    doc.setFont("times", "normal");

    // Encabezado
    doc.setFontSize(18);
    doc.text("RSH Health", 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Ficha Médica de ${pacienteSeleccionado.nombre}`, 105, 30, null, null, 'center');
    doc.setFontSize(10);

    if (pacienteSeleccionado) {
      const sectionStartY = 50;
      const lineHeight = 10;
      let currentY = sectionStartY;

      const sections = [
        {
          title: "Información Personal",
          details: [
            `Nombre completo: ${pacienteSeleccionado.nombre} ${pacienteSeleccionado.apellido_1} ${pacienteSeleccionado.apellido_2}`,
            `DNI: ${pacienteSeleccionado.dni_paciente}`,
            `Fecha de Nacimiento: ${cambiarFormatoFecha(pacienteSeleccionado.fecha_nacimiento)}`,
            `Grupo Sanguíneo: ${pacienteSeleccionado.grupo_sanguineo}`
          ]
        },
        {
          title: "Contacto",
          details: [
            `Correo Electrónico: ${pacienteSeleccionado.email}`,
            `Teléfono: ${pacienteSeleccionado.telefono}`,
            `Dirección: ${pacienteSeleccionado.direccion}`,
            `Ciudad: ${pacienteSeleccionado.ciudad}`
          ]
        },
        {
          title: "Historial Médico",
          details: [
            `Alergias: ${pacienteSeleccionado.alergias}`,
            `Medicaciones crónicas: ${pacienteSeleccionado.medicaciones_cronicas}`,
            `Enfermedades crónicas: ${pacienteSeleccionado.enfermedades_cronicas}`,
            `Enfermedades previas: ${pacienteSeleccionado.enfermedades_previas}`
          ]
        }
      ];

      sections.forEach((section, index) => {
        doc.setFontSize(12);
        doc.setFont("times", "bold");
        doc.text(section.title, 20, currentY);
        doc.setFont("times", "normal");
        section.details.forEach(detail => {
          currentY += lineHeight;
          doc.text(detail, 20, currentY);
        });
        currentY += lineHeight * 2; // Espacio antes de la línea

        // Dibujar línea separadora solo si no es la última sección
        if (index < sections.length - 1) {
          doc.setDrawColor(0);
          doc.setLineWidth(0.5);
          doc.line(20, currentY - 5, 190, currentY - 5); // Dibuja una línea horizontal
          currentY += lineHeight; // Espacio después de la línea
        }
      });
    } else {
      doc.text("No se ha encontrado información sobre el paciente.", 20, 50);
    }

    // Guardar el PDF
    doc.save("ficha-medica.pdf");
  };

  return (
    <div id="InformacionDelPaciente">
      <div className="botonesAtrasImp">
      <Link to={"/pacientes"} className="volver">
        <ArrowBackRoundedIcon />
      </Link>
      <button className="btnImprimirDetalles" onClick={generarFicha} >
          Imprimir ficha
        </button>
      </div>

      {pacienteSeleccionado ? (
        <div id="InformacionPersonal">
          <div id="DatosPersonalesPaciente">
            <div className="Datos Seccion1">
              <p className="TituloSeccion">Información Personal</p>
              <p className="DatoP">
                <strong>Nombre completo:</strong> {pacienteSeleccionado.nombre}{" "}
                {pacienteSeleccionado.apellido_1}{" "}
                {pacienteSeleccionado.apellido_2}
              </p>
              <p className="DatoP"><strong>DNI:</strong> {pacienteSeleccionado.dni_paciente}</p>
              <p className="DatoP">
              <strong>Fecha de Nacimiento:</strong> {cambiarFormatoFecha(pacienteSeleccionado.fecha_nacimiento)}
              </p>
              <p className="DatoP">
              <strong>Grupo Sanguíneo:</strong> {pacienteSeleccionado.grupo_sanguineo}
              </p>
            </div>

            <div className="Datos Seccion2">
              <p className="TituloSeccion">Contacto</p>
              <p className="DatoP">
              <strong>Correo Electrónico:</strong> {pacienteSeleccionado.email}
              </p>
              <p className="DatoP"><strong>Teléfono:</strong> {pacienteSeleccionado.telefono}</p>
              <p className="DatoP">
              <strong>Dirección:</strong> {pacienteSeleccionado.direccion}
              </p>
              <p className="DatoP"><strong>Ciudad:</strong> {pacienteSeleccionado.ciudad}</p>
            </div>
          </div>

          <div className="HistorialMedico">
            <div className="Datos Seccion3">
              <p className="TituloSeccion">Historial Médico</p>
              <p className="DatoP"><strong>Alergias:</strong> {pacienteSeleccionado.alergias}</p>
              <p className="DatoP">
              <strong>Medicaciones crónicas:</strong>{" "}
                {pacienteSeleccionado.medicaciones_cronicas}
              </p>
              <p className="DatoP">
              <strong>Enfermedades crónicas:</strong> {" "}
                {pacienteSeleccionado.enfermedades_cronicas}
              </p>
              <p className="DatoP">
              <strong>Enfermedades previas:</strong>{" "}
                {pacienteSeleccionado.enfermedades_previas}
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

export default InformacionDelPaciente;
