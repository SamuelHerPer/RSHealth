import React, { useState, useEffect } from "react";
import {
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
import useDatos from "../../hooks/useDatos";
import {convertirFormatoHora, cambiarFormatoFecha} from '../../biblioteca/biblioteca'
import useUsuarios from "../../hooks/useUsuarios";
import "./CitasPaciente.css"; 

const CitasPaciente = () => {
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
    obtenerCitasDeLaSemana,
    sanitarios,
    obtenerSanitarios,
    citasReservadas,
    obtenerPacientePorDni,
    insertarNuevaCita,
    cancelarCita,
    obtenerProximasCitasPaciente,
    proximasCitasPaciente,
  } = useDatos();
  const [selectedPaciente, setSelectedPaciente] = useState();
  const [selectedEspecialista, setSelectedEspecialista] = useState(null);
  const [citas, setCitas] = useState([]);
  const [selectedFecha, setSelectedFecha] = useState("");
  const [diasSemana] = useState(generarDiasSemana());

    // Función para generar la tabla con el horario de citas teniendo en cuenta el especialista, la fecha y las citas ya reservadas.
  const generarCitas = (fecha, specialist, citasReservadas) => {
    const lineaHoras = [];
    for (let i = 8; i <= 15; i++) {
      const hora = `${i.toString().padStart(2, "0")}:00:00`;
      const citaReservada = citasReservadas.find(
        (cita) =>
          cita.fecha === format(fecha, "yyyy-MM-dd") &&
          cita.hora === hora &&
          cita.dni_sanitario === specialist.dni_sanitario
      );
      lineaHoras.push({
        hora,
        fecha: format(fecha, "yyyy-MM-dd"),
        dni_sanitario: specialist?.dni_sanitario || "",
        sanitario: specialist?.nombre || "",
        especialidad: specialist?.especialidad || "",
        reservada: Boolean(citaReservada),
        dni_paciente: citaReservada?.dni_paciente || "",
      });
    }
    return lineaHoras;
  };

  // useEffect para actualizar las citas disponibles al cambiar el especialista, fecha o reservas existentes.
  useEffect(() => {
    obtenerCitasDeLaSemana();
    if (selectedFecha && selectedEspecialista) {
      const citasCargadas = generarCitas(
        new Date(selectedFecha),
        selectedEspecialista,
        citasReservadas
      );
      setCitas(citasCargadas);
    }
  }, [selectedFecha, selectedEspecialista, citasReservadas]);

  // Obtiene las próximas citas del paciente, las citas de dentro de una semana, los sanitarios y se guarda el paciente.
  useEffect(() => {
    obtenerProximasCitasPaciente(usuario.dni);
    obtenerCitasDeLaSemana();
    obtenerSanitarios();
    setSelectedPaciente(obtenerPacientePorDni(usuario.dni));
  }, []);

  // Función para cambiar el especialista seleccionado.
  const cambiarEspecialista = (event) => {
    const dniSanitario = event.target.value;
    const especialista = sanitarios.find(
      (s) => s.dni_sanitario === dniSanitario
    );
    if (especialista) {
      setSelectedEspecialista(especialista);
    }
  };

  // Función para reservar o cancelar citas.
  const reservarOCancelarCita = async (index) => {
    const cita = citas[index];
    if (cita.reservada && cita.dni_paciente === usuario.dni) {
      await cancelarCita(cita);
      const citasActualizadas = citas.map((c, i) =>
        i === index ? { ...c, reservada: false, dni_paciente: "" } : c
      );
      setCitas(citasActualizadas);
    } else if (!cita.reservada) {
      const citasActualizadas = citas.map((c, i) =>
        i === index ? { ...c, reservada: true, dni_paciente: usuario.dni } : c
      );
      setCitas(citasActualizadas);

      const nuevaCita = {
        hora: citasActualizadas[index].hora,
        fecha: citasActualizadas[index].fecha,
        dni_sanitario: citasActualizadas[index].dni_sanitario,
        dni_paciente: usuario.dni,
      };

      await insertarNuevaCita(nuevaCita);
    }
    obtenerProximasCitasPaciente(usuario.dni); // Actualizo las próximas citas después de la operación.
  };

  // Cambia la fecha seleccionada y actualiza las citas disponibles.
  const cambiarFecha = (event) => {
    setSelectedFecha(event.target.value);
    if (selectedEspecialista) {
      const citasActualizadas = generarCitas(
        new Date(event.target.value),
        selectedEspecialista,
        citasReservadas
      );
      setCitas(citasActualizadas);
    }
  };

  return (
    <div className="container">
      <div className="citaLeft">
        <h2>NUEVA CITA</h2>

        {sanitarios && (
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
              label="Especialista"
              value={
                selectedEspecialista ? selectedEspecialista.dni_sanitario : ""
              }
              onChange={cambiarEspecialista}
              variant="outlined"
              fullWidth
              margin="normal"
            >
              <MenuItem value="" disabled>
                Selecciona un especialista
              </MenuItem>
              {sanitarios.map((especialista) => (
                <MenuItem
                  key={especialista.dni_sanitario}
                  value={especialista.dni_sanitario}
                >
                  {especialista.nombre} {especialista.apellido_1}{" "}
                  {especialista.apellido_2} {"("}{especialista.especialidad}{")"}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

        {selectedPaciente && selectedEspecialista && selectedFecha ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="headerTablaPaciente">
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    HORA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    FECHA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    ESPECIALISTA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    ESPECIALIDAD
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    ESTADO
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
                    <TableCell>{cita.sanitario}</TableCell>
                    <TableCell>{cita.especialidad}</TableCell>
                    <TableCell>
                      {cita.reservada ? "Ocupada" : "Disponible"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor:
                            cita.reservada && cita.dni_paciente === usuario.dni
                              ? "#f44336"
                              : cita.reservada
                              ? "#ffc107"
                              : "#3b82f6",
                          color: "white",
                          "&:hover": {
                            backgroundColor:
                              cita.reservada &&
                              cita.dni_paciente === usuario.dni
                                ? "#d32f2f"
                                : cita.reservada
                                ? "#ffb300"
                                : "#2563eb",
                          },
                        }}
                        onClick={() => reservarOCancelarCita(index)}
                        disabled={
                          cita.reservada && cita.dni_paciente !== usuario.dni
                        }
                      >
                        {cita.reservada && cita.dni_paciente === usuario.dni
                          ? "Cancelar cita"
                          : cita.reservada
                          ? "No disponible"
                          : "Reservar"}
                      </Button>
                    </TableCell>
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
            Por favor, seleccione una fecha y un especialista
          </Typography>
        )}
      </div>

      <div className="citaRight">
        <h2>PRÓXIMAS CITAS</h2>
        {proximasCitasPaciente.length !== 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="headerTablaPaciente">
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    HORA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    FECHA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    ESPECIALISTA
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 700 }}>
                    ESPECIALIDAD
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proximasCitasPaciente.map((cita, index) => (
                  <TableRow key={index}>
                    <TableCell>{convertirFormatoHora(cita.hora)}</TableCell>
                    <TableCell>{cambiarFormatoFecha(cita.fecha)}</TableCell>
                    <TableCell>{cita.sanitario}</TableCell>
                    <TableCell>{cita.especialidad}</TableCell>
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

export default CitasPaciente;
