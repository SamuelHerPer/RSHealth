import React, { useEffect, useState } from "react";
import "./Inicio.css";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress
} from "@mui/material";
import useUsuarios from "../../hooks/useUsuarios";
import useDatos from "../../hooks/useDatos";
import Consulta from "../consulta/Consulta.jsx";
import Resultado from "../resultado/Resultado";
import ModalConsultaPaciente from "../consultasPaciente/ModalConsultaPaciente.jsx";
import ModalResultadoPaciente from "../resultadosPaciente/ModalResultadoPaciente";
import { convertirFormatoHora, cambiarFormatoFecha } from "../../biblioteca/biblioteca";

// Muestra el componente de inicio del paciente.
const Inicio = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { usuario, datosSesion } = useUsuarios();
  const {
    listadoConsultasPaciente,
    listadoResultadosPaciente,
    obtenerConsultasPaciente,
    obtenerResultadosPaciente,
    obtenerProximasCitasPaciente,
    proximasCitasPaciente,
    setIsConsulta
  } = useDatos();

  // Se declaran los estados necesario en ámbito local.
  const [cargando, setCargando] = useState(true);

  // Función para redirigir.
  const navegar = useNavigate();

  // Obtiene las consultas del paciente, los resultado y las próximas citas.
  useEffect(() => {
    if (usuario && usuario.dni) {
      Promise.all([
        obtenerConsultasPaciente(usuario.dni),
        obtenerResultadosPaciente(usuario.dni),
        obtenerProximasCitasPaciente(usuario.dni),
      ]).then(() => {
        setCargando(false);
      });
    }
  }, [usuario]);

  // Pinta el mensaje de cargando.
  if (cargando) {
    return (
      <div className="cargando">
        <CircularProgress />
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          margin="normal"
        >
          Cargando datos...
        </Typography>
      </div>
    );
  }

  // Pinta las próximas citas y los próximos resultados.
  return (
    <div id="ContenidoInicio">
      <div className="bloque1">
        <div>
          <div className="citasProximas">
            <h2>PRÓXIMAS CITAS</h2>
            {proximasCitasPaciente.length !== 0 ? (
              <>
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
                <button
                  className="BotonPaciente boton"
                  onClick={(e) => {
                    navegar("/citas");
                  }}
                >
                  Ir a citas
                </button>
              </>
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
      </div>
      <div className="bloque2">
        <div className="ultimosResultados">
          <h2>ÚLTIMOS RESULTADOS</h2>
          {listadoResultadosPaciente && listadoResultadosPaciente.length > 0 ? (
            <div className="ultResultados">
              {listadoResultadosPaciente.slice(-3).map((v, i) => (
                <Resultado
                  key={i}
                  tipologia={v.tipologia}
                  fecha={v.fecha}
                  id={v.id_resultado}
                />
              ))}
            </div>
          ) : (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
              margin="normal"
            >
              No hay resultados recientes
            </Typography>
          )}
          <button
            className="BotonPaciente boton"
            onClick={() => {
              navegar("/historial");
            }}
          >
            Ver todos
          </button>
          {/* Muestra el modal del  resultado cuando se pulsa en más detalles. */}
          <div>
            <ModalResultadoPaciente />
          </div>
        </div>
        <div className="ultimasConsultas">
          <h2>ÚLTIMAS CONSULTAS</h2>
          {listadoConsultasPaciente && listadoConsultasPaciente.length > 0 ? (
            <div className="ultConsultas">
              {listadoConsultasPaciente.slice(-3).map((v, i) => (
                <Consulta
                  key={i}
                  especialidad={v.especialidad}
                  fecha={v.fecha}
                  id={v.id_consulta}
                />
              ))}
            </div>
          ) : (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
              margin="normal"
            >
              No hay consultas recientes
            </Typography>
          )}
          <button
            className="BotonPaciente boton"
            onClick={() => {
              setIsConsulta(true);
              navegar("/historial");
            }}
          >
            Ver todas
          </button>
          {/* Muestra el modal de la consulta cuando se pulsa en más detalles. */}
          <div>
            <ModalConsultaPaciente />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Inicio;
