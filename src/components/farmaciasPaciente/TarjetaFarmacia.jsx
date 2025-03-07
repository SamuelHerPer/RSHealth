import React from 'react';
import { getPhotoUrl } from '../../biblioteca/apiMaps.js';
import "./TarjetaFarmacia.css";
import fotoFarmacia from "../../assets/images/sinFoto.jpg";

const TarjetaFarmacia = ({ farmacia }) => {
  // Comprobamos que se haya encontrado la farmacia, si no, avisará con el mensaje.
  if (!farmacia) {
    return <div>No se encontraron datos de la farmacia.</div>;
  }

  // Intento obtener una URL de la primera foto si existe información de fotos en el objeto de farmacia.
  const photoUrl = farmacia.photos && farmacia.photos.length > 0 ? getPhotoUrl(farmacia.photos[0].photo_reference) : null;
  return (
    <div className='tarjetaFarmacia'>
      <h2>{farmacia.name.toUpperCase()}</h2>
      <p>Valoración: {farmacia.rating ? farmacia.rating + ' / 5 ' : "No disponible"}</p>
      <br />
      {photoUrl ? <img src={photoUrl} alt="farmacia"/> : <img src={fotoFarmacia} alt="sin foto"/>}
      <br />

      {/* Muestro el número de teléfono de la farmacia si está disponible. */}
      {farmacia.formatted_phone_number && (
        <p>Teléfono: {farmacia.formatted_phone_number}</p>
      )}

      {/* Muestro el horario de la farmacia si está disponible, cada día en una nueva línea. */}
      {farmacia.opening_hours && farmacia.opening_hours.weekday_text ? (
        <>
          <h3>-Horario-</h3>
          {farmacia.opening_hours.weekday_text.map((v, i, a) => {
            return <p key={i}>{v.charAt(0).toUpperCase() + v.slice(1)}.</p>
          })}
        </>
        
      ) : (
        <>
          <h3>-Horario-</h3>
          <p>No disponible</p>
        </>
      )}
    </div>
  );
}

export default TarjetaFarmacia;
