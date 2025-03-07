import React from "react";
import useUsuarios from "../../hooks/useUsuarios";
import "./ActualizarPerfilFormulario.css";

// Componente que pinta el formulario para actualizar el perfil.
const ActualizarPerfilFormulario = () => {
  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const {
    usuario,
    usuarioCompleto,
    actualizarDatoUsuarioCompleto,
    actualizarUsuarioPaciente,
    actualizarUsuarioSanitario,
  } = useUsuarios();
  
  // Pinta el formulario.
  return (
    <div>
      <h2>ACTUALIZA TU PERFIL</h2>

        <label>
          Correo Electrónico:
          <input
            className=""
            type="email"
            name="email"
            value={usuarioCompleto.email || ""}
            onChange={(e) => {
              actualizarDatoUsuarioCompleto(e);
            }}
            disabled
          />
        </label>

      {usuario.role == "sanitario" ? (
          <label>DNI Sanitario:
          <input
            type="text"
            name="dni_sanitario"
            value={usuarioCompleto.dni_sanitario || ""}
            onChange={(e) => {
              actualizarDatoUsuarioCompleto(e);
            }}
            disabled
          />
          </label>
      ) : (
          <label>DNI:
          <input
            type="text"
            name="dni_paciente"
            value={usuarioCompleto.dni_paciente || ""}
            onChange={(e) => {
              actualizarDatoUsuarioCompleto(e);
            }}
            disabled
          />
          </label>
      )}

        <label>Nombre:
        <input
          type="text"
          name="nombre"
          value={usuarioCompleto.nombre || ""}
          onChange={(e) => {
            actualizarDatoUsuarioCompleto(e);
          }}
        />
        </label>

        <label>Primer apellido:
        <input
          type="text"
          name="apellido_1"
          value={usuarioCompleto.apellido_1 || ""}
          onChange={(e) => {
            actualizarDatoUsuarioCompleto(e);
          }}
        />
        </label>

        <label>Segundo apellido:
        <input
          type="text"
          name="apellido_2"
          value={usuarioCompleto.apellido_2 || ""}
          onChange={(e) => {
            actualizarDatoUsuarioCompleto(e);
          }}
        />
        </label>

        <label>Fecha de nacimiento:
        <input
          type="date"
          name="fecha_nacimiento"
          value={usuarioCompleto.fecha_nacimiento || ""}
          onChange={(e) => {
            actualizarDatoUsuarioCompleto(e);
          }}
        />
        </label>

        <label>Teléfono:
        <input
          type="number"
          name="telefono"
          value={usuarioCompleto.telefono || ""}
          onChange={(e) => {
            actualizarDatoUsuarioCompleto(e);
          }}
        />
        </label>

        <label>Dirección:
        <input
          type="text"
          name="direccion"
          value={usuarioCompleto.direccion || ""}
          onChange={(e) => {
            actualizarDatoUsuarioCompleto(e);
          }}
        />
        </label>

        <label >Provincia:
        <input
          type="text"
          name="provincia"
          value={usuarioCompleto.provincia || ""}
          onChange={(e) => {
            actualizarDatoUsuarioCompleto(e);
          }}
        />
        </label>

        <label>Ciudad:
        <input
          type="text"
          name="ciudad"
          value={usuarioCompleto.ciudad || ""}
          onChange={(e) => {
            actualizarDatoUsuarioCompleto(e);
          }}
        />
        </label>

        <label>Código postal:
        <input
          type="text"
          name="codigo_postal"
          value={usuarioCompleto.codigo_postal || ""}
          onChange={(e) => {
            actualizarDatoUsuarioCompleto(e);
          }}
        />
        </label>

      {usuario.role == "sanitario" ? (
          <label>Especialidad:
          <input
            type="text"
            name="especialidad"
            value={usuarioCompleto.especialidad || ""}
            onChange={(e) => {
              actualizarDatoUsuarioCompleto(e);
            }}
          />
          </label>
      ) : (
          <label>Grupo sanguíneo:
          <input
            type="text"
            name="grupo_sanguineo"
            value={usuarioCompleto.grupo_sanguineo || ""}
            onChange={(e) => {
              actualizarDatoUsuarioCompleto(e);
            }}
          />
          </label>
      )}
      <button onClick={async () => {}}>Cancelar</button>

      <button
        onClick={async () => {
          {
            usuario.role == "sanitario"
              ? actualizarUsuarioSanitario()
              : actualizarUsuarioPaciente();
          }
        }}
      >
        Actualizar perfil
      </button>
    </div>
  );
};

export default ActualizarPerfilFormulario;
