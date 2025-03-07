import React, { useState, useEffect } from "react";
import "./ModalPerfil.css";
import useUsuarios from "../../hooks/useUsuarios";

// Muestra el modal para actualizar el perfil.
const ModalPerfil = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const {
    usuario,
    actualizarDatoUsuarioCompleto,
    actualizarDatosDelUsuario,
    actualizarSanitario,
    actualizarPaciente,
    isOculto,
    ocultarModal,
  } = useUsuarios();

  // Se declaran los estados necesario en ámbito local.
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [codigoPostal, setCodigoPostal] = useState("");

  // Obtiene las provincias y ciudades.
  useEffect(() => {
    ActualizacionProvincia(usuario.provincia)
    // Obtengo las comunidades autónomas de España y a partir de ellas obtengo las provincias y ciudades.
    fetch(
      "http://api.geonames.org/childrenJSON?geonameId=2510769&username=samuelyjoseraul"
    )
      .then((response) => response.json())
      .then((data) => {
        const comunidades = data.geonames;
        const provinciasRequests = comunidades.map((comunidad) =>
          fetch(
            `http://api.geonames.org/childrenJSON?geonameId=${comunidad.geonameId}&username=samuelyjoseraul`
          ).then((response) => response.json())
        );
        return Promise.all(provinciasRequests);
      })
      .then((provinciasArrays) => {
        const provinciasFiltradas = provinciasArrays.flatMap((data) =>
          data.geonames.filter(
            (geo) => geo.fcodeName === "second-order administrative division"
          )
        );
        setProvincias(provinciasFiltradas);
      })
      .catch((error) => console.error("Error al obtener provincias", error));
  }, []);

  // Maneja el cambio de provincia.
  const handleProvinciaChange = (e) => {
    actualizarDatoUsuarioCompleto(e);
    const provinciaId = e.target.value;
    fetch(
      `http://api.geonames.org/childrenJSON?geonameId=${provinciaId}&username=samuelyjoseraul`
    )
      .then((response) => response.json())
      .then((data) => {
        setCiudades(data.geonames);
        setCodigoPostal(""); // Reinicio el código postal cuando cambias de provincia
      });
  };

  // Actualiza la provincia.
  const ActualizacionProvincia = (e) => {
    const provinciaId = e;
    fetch(
      `http://api.geonames.org/childrenJSON?geonameId=${provinciaId}&username=samuelyjoseraul`
    )
      .then((response) => response.json())
      .then((data) => {
        setCiudades(data.geonames);
        setCodigoPostal(""); // Reinicio el código postal cuando cambias de provincia
      });
  };

  // Maneja el cambio de ciudad
  const handleCiudadChange = (e) => {
    actualizarDatoUsuarioCompleto(e);
    const ciudadSeleccionada = ciudades.find(
      (ciudad) => ciudad.name === e.target.value
    );

    if (ciudadSeleccionada) {
      fetch(
        `http://api.geonames.org/postalCodeSearchJSON?placename=${ciudadSeleccionada.name}&maxRows=1&username=samuelyjoseraul`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.postalCodes && data.postalCodes.length > 0) {
            // Cojo el primer código postal de la lista(A veces hay más de uno).
            setCodigoPostal(data.postalCodes[0].postalCode);
          } else {
            setCodigoPostal(""); // Por si no encuentra un código postal.
            console.log("No se encontró un código postal para esta ciudad");
          }
        })
        .catch((error) => {
          console.error("Error al obtener código postal", error);
          setCodigoPostal("");
        });
    }
  };

  return (
    <div id="ModalPerfil" className={isOculto ? "ocultar" : ""}>
      <div className="contenidoPerfil">
        <div>
          <h2 className="titulo">ACTUALIZA TU PERFIL</h2>

          <form>

            <p>
              <label>
                Teléfono:
                <input
                  className={
                    usuario.role == "sanitario"
                      ? "inputPerfilSanitario"
                      : "inputPerfilPaciente"
                  }
                  type="number"
                  name="telefono"
                  value={usuario.telefono || ""}
                  onChange={(e) => {
                    actualizarDatoUsuarioCompleto(e);
                  }}
                />
              </label>
            </p>

            <p>
              <label>
                Dirección:
                <input
                  className={
                    usuario.role == "sanitario"
                      ? "inputPerfilSanitario"
                      : "inputPerfilPaciente"
                  }
                  type="text"
                  name="direccion"
                  value={usuario.direccion || ""}
                  onChange={(e) => {
                    actualizarDatoUsuarioCompleto(e);
                  }}
                />
              </label>
            </p>

            <p>
              <label>
                Provincia:
                <select
                  name="provincia"
                  value={usuario.provincia || ""}
                  onChange={handleProvinciaChange}
                  required
                  className={
                    usuario.role == "sanitario"
                      ? "inputPerfilSanitario desplegable"
                      : "inputPerfilPaciente desplegable"
                  }
                >
                  <option value="">Seleccione una provincia</option>
                  {provincias.map((provincia) => (
                    <option
                      key={provincia.geonameId}
                      value={provincia.geonameId}
                    >
                      {provincia.name}
                    </option>
                  ))}
                </select>
              </label>
            </p>
            {usuario.role == "administrador" ? (
              ""
            ) : (
              <p>
              <label>
                Ciudad:
                <select
                  name="ciudad"
                  value={usuario.ciudad || ""}
                  onChange={handleCiudadChange}
                  required
                  className={
                    usuario.role == "sanitario"
                      ? "inputPerfilSanitario desplegable"
                      : "inputPerfilPaciente desplegable"
                  }
                >
                  <option value="">Seleccione una ciudad</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad.geonameId} value={ciudad.name}>
                      {ciudad.name}
                    </option>
                  ))}
                </select>
              </label>
            </p>
            )}
            
          </form>
        </div>

        <div className="botones">
          <button
            className={
              usuario.role == "sanitario"
                ? "BotonModalPerfil BotonSanitario"
                : "BotonModalPerfil BotonPaciente"
            }
            onClick={async () => {
              if (usuario.role === "sanitario") {
                actualizarDatosDelUsuario();
                actualizarSanitario();
                ocultarModal();
              } else {
                actualizarDatosDelUsuario();
                actualizarPaciente();
                ocultarModal();
              }
            }}
          >
            Actualizar perfil
          </button>
          <button
            className={
              usuario.role == "sanitario"
                ? "BotonModalPerfil BotonSanitario"
                : "BotonModalPerfil BotonPaciente"
            }
            onClick={() => {
              ocultarModal(); //Oculto el modal al cancelar.
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPerfil;
