import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import "./CitasSanitario.css";
import useDatos from "../../hooks/useDatos";
import useUsuarios from "../../hooks/useUsuarios";
import {convertirFormatoHora, cambiarFormatoFecha} from '../../biblioteca/biblioteca'

const citasSanitario = () => {
  // Genera los próximos 7 dias.
  const generarDiasSemana = () => {
    const opciones = [];
    // Se comienza una semana desde el día siguiente al actual.
    for (let i = 1; i <= 8; i++) {
      const fecha = addDays(new Date(), i);
      opciones.push(format(fecha, "yyyy-MM-dd"));
    }
    return opciones;
  };

  // He sacado los estados y funciones necesarios del contexto utilizando los hooks.
  const { usuario } = useUsuarios();
  const {
    citasReservadas,
    obtenerCitasDeLaSemana,
    pacientes,
    obtenerPacientes,
    obtenerSanitarioPorDni,
    insertarNuevaCita,
    cancelarCita,
    proximasCitasSanitario,
    obtenerProximasCitasSanitario,
  } = useDatos();
  const [selectedEspecialista, setSelectedEspecialista] = useState(null);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [citas, setCitas] = useState([]);
  const [selectedFecha, setSelectedFecha] = useState("");
  const [diasSemana] = useState(generarDiasSemana());

  // Función para generar la tabla con el horario de citas teniendo en cuenta el paciente, dni del especialista, la fecha y las citas ya reservadas.
  const generarCitas = (fecha, paciente, citasReservadas, sanitarioDni) => {
    const lineaHoras = [];
    for (let i = 8; i <= 15; i++) {
      const hora = `${i.toString().padStart(2, "0")}:00:00`;
      const citaReservada = citasReservadas.find(
        (cita) =>
          cita.fecha === format(fecha, "yyyy-MM-dd") &&
          cita.hora === hora &&
          cita.dni_sanitario === sanitarioDni
      );
      lineaHoras.push({
        hora: hora,
        fecha: format(fecha, "yyyy-MM-dd"),
        dni_paciente: citaReservada?.dni_paciente || "",
        dni_sanitario: sanitarioDni,
        paciente:
          obtenerNombreCompletoPaciente(citaReservada?.dni_paciente) ||
          "Disponible",
        reservada: Boolean(citaReservada),
      });
    }
    return lineaHoras;
  };

  // Función para obtener el nombre completo del paciente.
  const obtenerNombreCompletoPaciente = (dni) => {
    const pacienteEncontrado = pacientes.find((p) => p.dni_paciente === dni);
    return pacienteEncontrado
      ? pacienteEncontrado.nombre +
          " " +
          pacienteEncontrado.apellido_1 +
          " " +
          pacienteEncontrado.apellido_2
      : "";
  };

  // useEffect para actualizar las citas disponibles al cambiar el paciente, fecha o reservas existentes.
  useEffect(() => {
    obtenerCitasDeLaSemana();
    if (selectedFecha && selectedPaciente) {
      const citasCargadas = generarCitas(
        new Date(selectedFecha),
        selectedPaciente,
        citasReservadas,
        usuario.dni
      );
      setCitas(citasCargadas);
    }
  }, [selectedFecha, selectedPaciente, citasReservadas]);

  // Obtiene las próximas citas del sanitario, las citas de dentro de una semana, los pacientes y se guarda el sanitario.
  useEffect(() => {
    obtenerProximasCitasSanitario(usuario.dni);
    obtenerCitasDeLaSemana();
    obtenerPacientes();
    setSelectedEspecialista(obtenerSanitarioPorDni(usuario.dni));

  }, []);

  // Función para cambiar el paciente seleccionado.
  const cambiarPaciente = (event) => {
    const dniPaciente = event.target.value;
    const paciente = pacientes.find((p) => p.dni_paciente === dniPaciente);
    if (paciente) {
      setSelectedPaciente(paciente);
    }
  };

  // Función para reservar o cancelar citas.
  const reservarOCancelarCita = async (index) => {
    const cita = citas[index];
    if (cita.reservada) {
      await cancelarCita(cita);
      const citasActualizadas = citas.map((c, i) =>
        i === index ? { ...c, reservada: false, dni_paciente: "" } : c
      );
      setCitas(citasActualizadas);
    } else {
      const citasActualizadas = citas.map((c, i) =>
        i === index
          ? {
              ...c,
              reservada: true,
              dni_paciente: selectedPaciente.dni_paciente,
            }
          : c
      );
      setCitas(citasActualizadas);

      const nuevaCita = {
        hora: citasActualizadas[index].hora,
        fecha: citasActualizadas[index].fecha,
        dni_sanitario: usuario.dni,
        dni_paciente: selectedPaciente.dni_paciente,
      };

      await insertarNuevaCita(nuevaCita);
    }
    obtenerProximasCitasSanitario(usuario.dni); // Actualizo las próximas citas después de la operación.
  };

  // Cambia la fecha seleccionada y actualiza las citas disponibles.
  const cambiarFecha = (event) => {
    setSelectedFecha(event.target.value);
    if (selectedPaciente) {
      const citasActualizadas = generarCitas(
        new Date(event.target.value),
        selectedPaciente,
        citasReservadas,
        usuario.dni
      );
      setCitas(citasActualizadas);
    }
  };

  return (
    <div className="container">
      <div className="citaLeft">
        <h2>NUEVA CITA</h2>

        {pacientes && (
          <>
            <TextField
              select
              label="Fecha"
              value={selectedFecha}
              onChange={cambiarFecha}
              variant="outlined"
              fullWidth
              margin="normal"
            >
              <MenuItem value="" disabled>
                Selecciona una fecha
              </MenuItem>
              {diasSemana.map((date) => (
                <MenuItem key={date} value={date}>
                  {format(new Date(date), "EEEE d, MMMM, yyyy", { locale: es })}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Paciente"
              value={selectedPaciente ? selectedPaciente.dni_paciente : ""}
              onChange={cambiarPaciente}
              variant="outlined"
              fullWidth
              margin="normal"
            >
              <MenuItem value="" disabled>
                Selecciona un paciente
              </MenuItem>
              {pacientes.map((paciente) => (
                <MenuItem
                  key={paciente.dni_paciente}
                  value={paciente.dni_paciente}
                >
                  {paciente.nombre} {paciente.apellido_1} {paciente.apellido_2}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

        {selectedEspecialista && selectedFecha && selectedPaciente ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="headerTablasSanitario">
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    HORA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    FECHA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    PACIENTE
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    ACCIONES
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {citas.map((cita, index) => (
                  <TableRow key={index}>
                    <TableCell>{convertirFormatoHora(cita.hora)}</TableCell>
                    <TableCell>{cambiarFormatoFecha(cita.fecha)}</TableCell>
                    <TableCell>{cita.paciente}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: cita.reservada
                            ? "#f44336"
                            : "#10b981",
                          color: "white",
                          "&:hover": {
                            backgroundColor: cita.reservada
                              ? "#d32f2f"
                              : "#0f9a70",
                          },
                        }}
                        onClick={() => reservarOCancelarCita(index)}
                      >
                        {cita.reservada ? "Cancelar cita" : "Reservar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <>
            <Typography
              variant="h6"
              color="textSecondary"
              align="center"
              margin="normal"
            >
              Por favor, seleccione una fecha y un paciente
            </Typography>
          </>
        )}
      </div>
      <div className="citaRight">
        <h2>PRÓXIMAS CITAS</h2>
        {proximasCitasSanitario.length !== 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="headerTablasSanitario">
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    HORA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    FECHA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    PACIENTE
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proximasCitasSanitario.map((cita, index) => (
                  <TableRow key={index}>
                    <TableCell>{convertirFormatoHora(cita.hora)}</TableCell>
                    <TableCell>{cambiarFormatoFecha(cita.fecha)}</TableCell>
                    <TableCell>{cita.paciente}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
            margin="normal"
          >
            No se encontraron citas próximas
          </Typography>
        )}
      </div>
    </div>
  );
};

export default citasSanitario;
