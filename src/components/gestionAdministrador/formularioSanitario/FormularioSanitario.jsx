import React, { useState, useEffect } from "react";
import useUsuarios from "../../../hooks/useUsuarios";
import "./FormularioSanitario.css";
import useDatos from "../../../hooks/useDatos";

// Componente que muestra el formulario para crear un nuevo sanitario.
const FormularioSanitario = () => {

  // Se extraen los estados y funciones necesarios del contexto utilizando el hook.
  const {
    nuevoUsuario,
    crearCuentaSanitario,
    errorUsuario,
    actualizarDatoUsuario,
    vaciarDatosUsuario,
  } = useUsuarios();
  const { obtenerSanitarios, obtenerPacientes, pacientes, sanitarios } = useDatos();


  // Campos obligatorios del formulario.
  const camposObligatorios = [
    nuevoUsuario.password,
    nuevoUsuario.nombre,
    nuevoUsuario.apellido_1,
    nuevoUsuario.apellido_2,
    nuevoUsuario.direccion,
    nuevoUsuario.provincia,
    nuevoUsuario.ciudad,
    nuevoUsuario.especialidad
  ];

  const camposCorrectos = {
    passwordCorrecta: true,
    nombreCorrecto: true,
    apellido1Correcto: true,
    apellido2Correcto: true,
    direccionCorrecta: true,
    provinciaCorrecta: true,
    ciudadCorrecta: true,
    especialidadCorrecta: true,
    correoCorrecto: true,
    telefonoCorrecto: true,
    fechaCorrecta: true,
    dniCorrecto: true,
  };

  // Se declaran los estados necesario en ámbito local.
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [codigoPostal, setCodigoPostal] = useState("");
  const [erroresCamposUsuario, setErroresCamposUsuario] = useState("");
  const [emailVerificacionMensaje, setEmailVerificacionMensaje] = useState("");
  const [esCorrecto, setEsCorrecto] = useState(camposCorrectos);

  useEffect(() => {
    vaciarDatosUsuario();
  },[])

  // Función para validar el formulario completo.
  const validarCampos = () => {
    setEsCorrecto(camposCorrectos);
    var resultado = true;
    camposObligatorios.map((v, i, a) => {
      if (v == false) {
        if (i == 0) {
          setEsCorrecto((prev) => ({
            ...prev,
            passwordCorrecta: false,
          }));
        } else if (i == 1) {
          setEsCorrecto((prev) => ({
            ...prev,
            nombreCorrecto: false,
          }));
        } else if (i == 2) {
          setEsCorrecto((prev) => ({
            ...prev,
            apellido1Correcto: false,
          }));
        } else if (i == 3) {
          setEsCorrecto((prev) => ({
            ...prev,
            apellido2Correcto: false,
          }));
        } else if (i == 4) {
          setEsCorrecto((prev) => ({
            ...prev,
            direccionCorrecta: false,
          }));
        } else if (i == 5) {
          setEsCorrecto((prev) => ({
            ...prev,
            provinciaCorrecta: false,
          }));
        } else if (i == 6) {
          setEsCorrecto((prev) => ({
            ...prev,
            ciudadCorrecta: false,
          }));
        } else if (i == 7) {
          setEsCorrecto((prev) => ({
            ...prev,
            especialidadCorrecta: false,
          }));
        } 
        resultado = false;
      }
    });
    if (validarCorreo(nuevoUsuario.email) == false) {
      setEsCorrecto((prev) => ({
        ...prev,
        correoCorrecto: false,
      }));
      resultado = false;
    }
    if (validarTelefono(nuevoUsuario.telefono) == false) {
      setEsCorrecto((prev) => ({
        ...prev,
        telefonoCorrecto: false,
      }));
      resultado = false;
    }

    if (validarFechaNacimiento(nuevoUsuario.fecha_nacimiento) == false) {
      setEsCorrecto((prev) => ({
        ...prev,
        fechaCorrecta: false,
      }));
      resultado = false;
    }

    if (validarDniSanitario(nuevoUsuario.dni.toUpperCase()) == false) {
      setEsCorrecto((prev) => ({
        ...prev,
        dniCorrecto: false,
      }));
      resultado = false;
    }
    return resultado;
  }

  // Función para validar el formato del correo electrónico
  const validarCorreo = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var correoRepetido = false;
    sanitarios.map(sanitario => {
      if (sanitario.email === email){
        correoRepetido = true;
      }
    });
    pacientes.map((paciente) => {
      if (paciente.email === email) {
        correoRepetido = true;
      }
    });
    return (!correoRepetido && regex.test(email));
  };

  // Función para validar el formato del teléfono
  const validarTelefono = (telefono) => {
    const regex = /^[0-9]{9}$/;
    return regex.test(telefono);
  };

  // Función para validar el formato de la fecha de nacimiento
  const validarFechaNacimiento = (fecha_nacimiento) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(fecha_nacimiento);
  };

  // Función para validar el formato del dni
  const validarDniSanitario = (dniSanitario) => {
    const regex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    var dniRepetido = false;
    sanitarios.map(sanitario => {
      if (sanitario.dni_sanitario === "S" + dniSanitario) {
        dniRepetido = true
      }
    })
    return (!dniRepetido && regex.test(dniSanitario));
  };

  // Se conecta a la api de geonames para traer las provincias y ciudades.
  useEffect(() => {
    setErroresCamposUsuario("");
    setEmailVerificacionMensaje("");
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

  // Obtiene los sanitarios.
  useEffect(() => {
    obtenerSanitarios();
    obtenerPacientes();
  }, []);

  // Controla el cambio de provincia.
  const handleProvinciaChange = (e) => {
    actualizarDatoUsuario(e);
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

  // Controla el cambio de ciudad.
  const handleCiudadChange = (e) => {
    actualizarDatoUsuario(e);
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
    <div id="FormularioSanitario">
      <label className={esCorrecto.correoCorrecto ? "" : "errorInputForm"}>
          <span>*</span>Correo Electrónico:
          <input
            type="email"
            name="email"
            value={nuevoUsuario.email || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label className={esCorrecto.passwordCorrecta ? "" : "errorInputForm"}>
          <span>*</span>Contraseña:
          <input
            type="password"
            name="password"
            value={nuevoUsuario.password || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label className={esCorrecto.dniCorrecto ? "" : "errorInputForm"}>
          <span>*</span>DNI:
          <input
            type="text"
            name="dni"
            value={nuevoUsuario.dni || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label className={esCorrecto.nombreCorrecto ? "" : "errorInputForm"}>
          <span>*</span>Nombre:
          <input
            type="text"
            name="nombre"
            value={nuevoUsuario.nombre || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label className={esCorrecto.apellido1Correcto ? "" : "errorInputForm"}>
          <span>*</span>Primer apellido:
          <input
            type="text"
            name="apellido_1"
            value={nuevoUsuario.apellido_1 || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label className={esCorrecto.apellido2Correcto ? "" : "errorInputForm"}>
          <span>*</span>Segundo apellido:
          <input
            type="text"
            name="apellido_2"
            value={nuevoUsuario.apellido_2 || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label className={esCorrecto.fechaCorrecta ? "" : "errorInputForm"}>
          <span>*</span>Fecha de nacimiento:
          <input
            type="date"
            name="fecha_nacimiento"
            value={nuevoUsuario.fecha_nacimiento || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label className={esCorrecto.telefonoCorrecto ? "" : "errorInputForm"}>
          <span>*</span>Teléfono:
          <input
            type="number"
            name="telefono"
            value={nuevoUsuario.telefono || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label className={esCorrecto.direccionCorrecta ? "" : "errorInputForm"}>
          <span>*</span>Dirección:
          <input
            type="text"
            name="direccion"
            value={nuevoUsuario.direccion || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label className={esCorrecto.provinciaCorrecta ? "" : "errorInputForm"}>
          <span>*</span>Provincia:
          <select
            name="provincia"
            value={nuevoUsuario.provincia || ""}
            onChange={handleProvinciaChange}
            required
            className="desplegableAdministrador"
          >
            <option value="">Seleccione una provincia</option>
            {provincias.map((provincia) => (
              <option key={provincia.geonameId} value={provincia.geonameId}>
                {provincia.name}
              </option>
            ))}
          </select>
        </label>

        <label className={esCorrecto.ciudadCorrecta ? "" : "errorInputForm"}>
          <span>*</span>Ciudad:
          <select
            name="ciudad"
            value={nuevoUsuario.ciudad || ""}
            onChange={handleCiudadChange}
            required
            className="desplegableAdministrador"
          >
            <option value="">Seleccione una ciudad</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.geonameId} value={ciudad.name}>
                {ciudad.name}
              </option>
            ))}
          </select>
        </label>

        <label className={esCorrecto.especialidadCorrecta ? "" : "errorInputForm"}>
          <span>*</span>Especialidad:
          <input
            type="text"
            name="especialidad"
            value={nuevoUsuario.especialidad || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label>
          Formacion:
          <input
            type="text"
            name="formacion"
            value={nuevoUsuario.formacion || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label>
          Experiencia:
          <input
            type="text"
            name="experiencia"
            value={nuevoUsuario.experiencia || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

        <label>
          Informacion Personal:
          <input
            type="text"
            name="informacion_personal"
            value={nuevoUsuario.informacion_personal || ""}
            onChange={(e) => {
              actualizarDatoUsuario(e);
            }}
          />
        </label>

      <div id="confEmailUsuario">{emailVerificacionMensaje}</div>
      <div id="ErrorCrearUsuario">{erroresCamposUsuario}</div>
      <button
      className="BotonAdministradorCrearUsuario"
        onClick={() => {
          if (validarCampos()) {
            setErroresCamposUsuario("");
            crearCuentaSanitario();
            setEmailVerificacionMensaje("Verifica el correo para la confirmación de la cuenta.")
            vaciarDatosUsuario();
          } else {
            setErroresCamposUsuario("Rellena los campos obligatorios correctamente.");

          }
        }}
      >
        Crear
      </button>
    </div>
  );
};

export default FormularioSanitario;
