import React, { useEffect, useState } from "react";
import "./InicioSanitario.css";
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


const InicioSanitario = () => {

  const { usuario, datosSesion } = useUsuarios();
  const [cargando, setCargando] = useState(true);

  const {
    listadoConsultasSanitario,
    listadoResultadosSanitario,
    obtenerConsultasSanitario,
    obtenerResultadosSanitario,
    obtenerProximasCitasSanitario,
    proximasCitasSanitario } = useDatos();

  const navegar = useNavigate();

  useEffect(() => {
    if (usuario && usuario.dni) {
      Promise.all([
        obtenerConsultasSanitario(usuario.dni),
        obtenerResultadosSanitario(usuario.dni),
        obtenerProximasCitasSanitario(usuario.dni),
      ]).then(() => {
        setCargando(false);
      });
    }
  }, [usuario]);

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

  return (
    <div id="ContenidoInicio">
      <div className="bloque1">
        <div>
          <div className="citasProximas">
            <h2>PRÓXIMAS CITAS</h2>
            {proximasCitasSanitario.length !== 0 ? (
              <>
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
                <button
                  className="BotonSanitario boton"
                  onClick={(e) => {
                    navegar("/citasSanitario");
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
          {listadoResultadosSanitario && listadoResultadosSanitario.length > 0 ? (
            <div className="ultResultados">
              {listadoResultadosSanitario.slice(-3).map((v, i) => (
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
            className="BotonSanitario botonS"
            onClick={() => {
              navegar("/resultado");
            }}
          >
            Crear resultado
          </button>
          {/* Muestra el modal del  resultado cuando se pulsa en más detalles. */}
          <div>
            <ModalResultadoPaciente />
          </div>
        </div>
        <div className="ultimasConsultas">
          <h2>ÚLTIMAS CONSULTAS</h2>
          {listadoConsultasSanitario && listadoConsultasSanitario.length > 0 ? (
            <div className="ultConsultas">
              {listadoConsultasSanitario.slice(-3).map((v, i) => (
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
            className="BotonSanitario botonS"
            onClick={() => {
              navegar("/consulta");
            }}
          >
            Crear consulta
          </button>
          {/* Muestra el modal de la consulta cuando se pulsa en más detalles. */}
          <div>
            <ModalConsultaPaciente />
          </div>
        </div>
      </div>

    </div>
  );
}

export default InicioSanitario