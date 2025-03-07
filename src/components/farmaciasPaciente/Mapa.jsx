// Mapa.jsx
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import "./Mapa.css";

// Este componente crea un mapa de Google Maps configurado con un centro y zoom específicos.
const Mapa = ({ foco, farmacias }) => {
  return (
    <GoogleMap center={foco} zoom={12} mapContainerClassName='MapaFarmacias'>
      {farmacias.map(farmacia => (
        // Creo un marcador para cada farmacia en la lista de farmacias.
        <Marker key={farmacia.id} position={{ lat: farmacia.lat, lng: farmacia.lng }} title={farmacia.name} />
      ))}
    </GoogleMap>
  );
}

export default Mapa;
