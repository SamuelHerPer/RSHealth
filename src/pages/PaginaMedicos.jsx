import React, {useEffect, useState} from 'react'
import './PaginaMedicos.css'
import useDatos from '../hooks/useDatos';
import TarjetaSanitario from '../components/tarjetaSanitario/TarjetaSanitario';

// Página que muestra todos los médicos de la clínica.
const PaginaMedicos = () => {

// Se extraen los estados y funciones necesariss del contexto (utilizando el hook).
const {
  obtenerSanitarios,
  sanitarios
} = useDatos();

// Se crean los estados necesarios en ámbito local.
const [nombreSanitario, setNombreSanitario] = useState("");
const [cargando, setCargando] = useState(true);


// Se obtienen los sanitarios de la base de datos y se cambia el estado de cargando para que desaparezca el mensaje (esto se hace cada vez que se carga el componente).
useEffect(() => {
  obtenerSanitarios().then(() => {
    setCargando(false); 
  });
}, []);

// Función para manejar los cambios del input para buscar médicos.
const handleInputChange = (event) => {
  const { value } = event.target;
  setNombreSanitario(value);
};

// Función para vacíar el estado que almacena el médico seleccionado.
const limpiarSanitario = () => {
  setNombreSanitario("");
};

// Estado que almacena los médicos filtrados.
const sanitariosFiltrados = nombreSanitario
? sanitarios.filter((sanitario) =>
    `${sanitario.nombre} ${sanitario.apellido_1} ${sanitario.apellido_2}`.toLowerCase().includes(nombreSanitario.toLowerCase())
  )
: sanitarios;

// Se pinta el input para filtrar/buscar médicos y las tarjetas en la que se pintan los médicos.
  return (
    <div id='PaginaMedicos'>
        <h1>CUADRO MÉDICO</h1>
        <div id="FiltrosConsulta">
        <h2>BUSQUEDA DE SANITARIOS</h2>
        <div id="OpcionFiltro">
          <input
            className="busqueda"
            type="text"
            value={nombreSanitario}
            onChange={handleInputChange}
            name="sanitario"
            id="sanitario"
            list="sanitarios"
            autoComplete="off"
          />
          <datalist id="sanitarios">
            {sanitarios &&
              sanitarios.map((sanitario) => (
                <option
                  key={sanitario.nombre}
                  value={`${sanitario.nombre} ${sanitario.apellido_1} ${sanitario.apellido_2}`}
                  >
                </option>
              ))}
          </datalist>
          <button className="BotonPaciente" onClick={limpiarSanitario}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <br />
      <br />
        <div id='TarjetasSanitarios'>
          {sanitariosFiltrados && sanitariosFiltrados.length ?
            sanitariosFiltrados.map((v,i,a) => {
              return <TarjetaSanitario key={i} sanitario={v}/>
            })
            :
            "No se han encontrado sanitarios."
        }
        </div>
    </div>
  )
}

export default PaginaMedicos