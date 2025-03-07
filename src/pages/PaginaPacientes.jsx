import React, { useEffect, useState } from "react";
import "./PaginaPacientes.css";
import TarjetaPaciente from "../components/tarjetaPaciente/TarjetaPaciente";
import useDatos from "../hooks/useDatos";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { cambiarFormatoFecha } from "../biblioteca/biblioteca";

// Página que muestra todos los pacientes de la clínica.
const PaginaPacientes = () => {

  // Se extraen los estados y funciones necesarias del contexto (usando el hook).
  const { obtenerPacientes, pacientes } = useDatos();

  // Se crean los estados necesarios en ámbito local.
  const [cargando, setCargando] = useState(true);
  const [nombrePaciente, setNombrePaciente] = useState("");

  // Se obtienen los pacientes de la base de datos y se cambia el estado de cargando para que desaparezca el mensaje (esto se hace cada vez que se carga el componente).
  useEffect(() => {
    obtenerPacientes().then(() => {
      setCargando(false); 
    });
  }, []);

  // Función para manejar los cambios del input para buscar pacientes.
  const handleInputChange = (event) => {
    const { value } = event.target;
    setNombrePaciente(value);
  };

  // Función para vacíar el estado que almacena el paciente seleccionado.
  const limpiarPaciente = () => {
    setNombrePaciente("");
  };

  // Función para generar un pdf con el listado de pacientes.
  const generarPDF = () => {
    if (!pacientesFiltrados || pacientesFiltrados.length === 0) {
      console.error("No hay datos de pacientes disponibles.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    const headers = [
      [
        "DNI",
        "Nombre",
        "Primer Apellido",
        "Segundo Apellido",
        "Fecha de Nacimiento",
        "Correo",
        "Teléfono",
        "Provincia",
        "Ciudad",
        "Dirección",
      ],
    ];

    const body = pacientesFiltrados.map((paciente) => [
      paciente.dni_paciente || "",
      paciente.nombre || "",
      paciente.apellido_1 || "",
      paciente.apellido_2 || "",
      cambiarFormatoFecha(paciente.fecha_nacimiento) || "",
      paciente.email || "",
      paciente.telefono.toString() || "",
      paciente.provincia || "",
      paciente.ciudad || "",
      paciente.direccion || "",
    ]);

    doc.text("Listado de Pacientes", 310, 30, { align: "center" });
    doc.autoTable({
      startY: 50,
      head: headers,
      body: body,
      theme: "striped",
      headStyles: { fillColor: [16, 185, 129] },
      alternateRowStyles: { fillColor: [249, 249, 249] },
      styles: {
        cellPadding: 5,
        fontSize: 10,
        valign: "middle",
        halign: "center",
      },
    });

    doc.save("Pacientes.pdf");
  };

  // Estado que almacena los pacientes filtrados.
  const pacientesFiltrados = nombrePaciente
    ? pacientes.filter((paciente) =>
        `${paciente.nombre} ${paciente.apellido_1} ${paciente.apellido_2}`.toLowerCase().includes(nombrePaciente.toLowerCase())
      )
    : pacientes;

  // Se pinta el input para filtrar/buscar pacientes y las tarjetas en la que se pintan los pacientes.
  return (
    <div id="PaginaPacientes">
      <h1>PACIENTES</h1>
      <div id="FiltrosConsulta">
        <h2>BUSQUEDA DE PACIENTES</h2>
        <div id="OpcionFiltro">
          <input
            className="busquedaS"
            type="text"
            value={nombrePaciente}
            onChange={handleInputChange}
            name="paciente"
            id="paciente"
            list="pacientes"
            autoComplete="off"
          />
          <datalist id="pacientes">
            {pacientes &&
              pacientes.map((paciente) => (
                <option
                  key={paciente.nombre}
                  value={`${paciente.nombre} ${paciente.apellido_1} ${paciente.apellido_2}`}
                  >
                </option>
              ))}
          </datalist>
          <button className="BotonSanitario" onClick={limpiarPaciente}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <br />
      <div>
        <button className="btnImprimir" onClick={generarPDF} disabled={cargando}>
          Imprimir pacientes
        </button>
      </div>
      <br />
      <div id="TarjetasPacientes">
        {pacientesFiltrados && pacientesFiltrados.length
          ? pacientesFiltrados.map((v, i, a) => {
              return <TarjetaPaciente key={i} paciente={v} />;
            })
          : "No se han encontrado pacientes."}
      </div>
    </div>
  );
};

export default PaginaPacientes;
