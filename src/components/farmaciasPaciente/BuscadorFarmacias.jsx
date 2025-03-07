import React, { useState, useEffect } from 'react';
import Mapa from './Mapa';
import TarjetaFarmacia from './TarjetaFarmacia';
import { farmaciasPorCiudad, datosFarmacia } from '../../biblioteca/apiMaps';
import useUsuarios from '../../hooks/useUsuarios';
import "./BuscadorFarmacias.css";

const BuscadorFarmacias = () => {
  // Creación de estados para manejar las farmacias, el foco del mapa, mensajes de error, etc.
  const [foco, setFoco] = useState(null);
  const [farmacias, setFarmacias] = useState([]);
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [informacion, setInformacion] = useState('Cargando farmacias...');

  //Obtengo el usuario y su ciudad
  const {usuario} = useUsuarios();
  const defaultCity = usuario.ciudad; 

  // Función para cargar las farmacias de una ciudad específica.
  const cargarFarmacias = async (ciudad) => {
    try {
      const result = await farmaciasPorCiudad(ciudad);
      if (result.success) {
        setInformacion('');
        const farmaciasDatos = await datosFarmacia(result.data);
        setFarmacias(farmaciasDatos);
        if (farmaciasDatos.length > 0) {
          setFoco({ lat: farmaciasDatos[0].lat, lng: farmaciasDatos[0].lng }); // Ajusto el foco del mapa a la primera farmacia.
        }
        setErrorMessage('');
      } else {
        setErrorMessage(result.message);
        setInformacion('');
      }
    } catch (error) {
      setErrorMessage('Error al buscar farmacias');
    }
  };

  // Cargamos las farmacias en la ciudad por defecto al montar el componente
  useEffect(() => {
    cargarFarmacias(defaultCity);
  }, []);

  // Manejador para cuando el usuario cambia la ciudad en el formulario.
  const cambioCiudad = async () => {
    if (city) {
      cargarFarmacias(city);
    }
  };

  return (
    <div id='BuscadorFarmacias'>
      <div className='buscarFarmacias'>
        <form>
          <input 
            type="text" 
            placeholder="Introduzca una ciudad" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
          />
          <button className='BotonPaciente' onClick={(e) => {
            e.preventDefault();
            cambioCiudad();
            setErrorMessage('');
            setInformacion('Buscando nuevas farmacias...');
          }}>Buscar</button>
        </form>
      </div>
      {errorMessage && <p className='errorInformativo'>{errorMessage}</p>}
      {informacion && <h2 className='avisoCargandoFarmacias'>{informacion}</h2>}
      {foco && <Mapa foco={foco} farmacias={farmacias} />}
      <div className='listadoFarmacias'>
        {farmacias.map(farmacia => (
          <TarjetaFarmacia key={farmacia.id} farmacia={farmacia} />
        ))}
      </div>
    </div>
  );
}

export default BuscadorFarmacias;
