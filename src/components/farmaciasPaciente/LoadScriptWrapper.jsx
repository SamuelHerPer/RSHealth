// LoadScriptWrapper.jsx
import React from 'react';
import { LoadScript } from '@react-google-maps/api';

//Realizado para que se cargue el mapa solo una vez al cargar la App
const LoadScriptWrapper = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey="TuClaveAPIReal">
      {children}
    </LoadScript>
  );
};

export default LoadScriptWrapper;
