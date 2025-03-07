import React, { useEffect, useState } from 'react';
import useDatos from '../../hooks/useDatos';
import { useNavigate } from "react-router-dom";
import {cambiarFormatoFecha} from '../../biblioteca/biblioteca'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Hidden
} from "@mui/material";
import './InicioAdmin.css';

const InicioAdmin = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const { obtenerPacientes, obtenerSanitarios, pacientes, sanitarios } = useDatos();

  // Se declaran los estados necesario en ámbito local.
  const [usuariosCompleto, setUsuariosCompleto] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(0); // Página actual
  const [filasPagina, setFilasPagina] = useState(8); 

  // Función para redirigir.
  const navegar = useNavigate();

  // Obtiene los sanitario y los pacientes.
  useEffect(() => {
    obtenerSanitarios();
    obtenerPacientes();
  }, []);

  useEffect(() => {
    if (sanitarios && pacientes) {
      const sanitariosConDni = sanitarios.map(sanitario => ({
        ...sanitario,
        dni: sanitario.dni_sanitario,
        tipoUser: "SANITARIO"
      }));
  
      const pacientesConDni = pacientes.map(paciente => ({
        ...paciente,
        dni: paciente.dni_paciente,
        tipoUser: "PACIENTE"
      }));
  
      setUsuariosCompleto([...sanitariosConDni, ...pacientesConDni]);
      setCargando(false);
    }
  }, [sanitarios, pacientes]);

  // Muestra la siguiente página
  const cambiarPagina = (event, newPage) => {
    setPagina(newPage);
  };

  // Indica cuantas filas se muestran por página.
  const cambiarFilasPorPagina = (event) => {
    setFilasPagina(parseInt(event.target.value, 10));
    setPagina(0); 
  };

  // Pinta todos los usuarios de la aplicación.
  return (
    <div id="ContenidoInicioAdmin">
      <div className="tablaUsers">
        <h2>NUESTROS USUARIOS</h2>
        {cargando ? (
          <Typography variant="h6" color="textSecondary" align="center">
            Cargando datos...
          </Typography>
        ) : usuariosCompleto.length !== 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="headerTablaAdmin">
                    <TableCell sx={{ color: "white", fontWeight: 700 }}>IDENTIDICADOR</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 700 }}>NOMBRE COMPLETO</TableCell>
                    <TableCell className="hide-on-small hide-on-medium" sx={{ color: "white", fontWeight: 700 }}>FECHA DE NACIMIENTO</TableCell>
                    <TableCell className="hide-on-small" sx={{ color: "white", fontWeight: 700 }}>CORREO ELECTRÓNICO</TableCell>
                    <TableCell className="hide-on-small hide-on-medium" sx={{ color: "white", fontWeight: 700 }}>TELÉFONO</TableCell>
                    <TableCell className="hide-on-small hide-on-medium" sx={{ color: "white", fontWeight: 700 }}>DIRECCIÓN</TableCell>
                    <TableCell className="hide-on-small hide-on-medium" sx={{ color: "white", fontWeight: 700 }}>CIUDAD</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 700 }}>TIPO DE USUARIO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuariosCompleto.slice(pagina * filasPagina, pagina * filasPagina + filasPagina).map((usuario, index) => (
                    <TableRow key={index}>
                      <TableCell >{usuario.dni}</TableCell>
                      <TableCell>{usuario.nombre} {usuario.apellido_1} {usuario.apellido_2}</TableCell>
                      <TableCell className="hide-on-small hide-on-medium">{cambiarFormatoFecha(usuario.fecha_nacimiento)}</TableCell>
                      <TableCell className="hide-on-small">{usuario.email}</TableCell>
                      <TableCell className="hide-on-small hide-on-medium">{usuario.telefono}</TableCell>
                      <TableCell className="hide-on-small hide-on-medium">{usuario.direccion}</TableCell>
                      <TableCell className="hide-on-small hide-on-medium">{usuario.ciudad}</TableCell>
                      <TableCell>{usuario.tipoUser}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 8]}
              component="div"
              count={usuariosCompleto.length}
              rowsPerPage={filasPagina}
              page={pagina}
              onPageChange={cambiarPagina}
              onRowsPerPageChange={cambiarFilasPorPagina}
              labelRowsPerPage="Filas por página: "

            />
            <div className='botones'>
            <button
            className="BotonAdministradorCrearUsuario boton"
            onClick={() => {
              navegar("/gestionSanitario");
            }}
          >
            Nuevo Sanitario
          </button>
          <button
            className="BotonAdministradorCrearUsuario boton"
            onClick={() => {
              navegar("/gestionPaciente");
            }}
          >
            Nuevo Paciente
          </button>
            </div>
          </>
        ) : (
          <Typography variant="h6" color="textSecondary" align="center" margin="normal">
            No se encontraron usuarios
          </Typography>
        )}
      </div>
    </div>
  );
}

export default InicioAdmin;
