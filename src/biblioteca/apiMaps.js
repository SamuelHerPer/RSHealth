// apiMaps.js
import axios from 'axios';

const API_KEY = 'TuClaveAPIReal'; // Reemplaza con tu clave de API real

// Función para buscar farmacias en una ciudad específica
export const farmaciasPorCiudad = async (ciudad) => {
  const encodedCity = encodeURIComponent(ciudad);
  const geoUrl = `/maps/api/geocode/json?address=${encodedCity}&key=${API_KEY}`;

  try {
    const respuesta = await axios.get(geoUrl);
    if (respuesta.data.results && respuesta.data.results.length > 0) {
      const { lat, lng } = respuesta.data.results[0].geometry.location;
      const farmaciasURL = `/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=pharmacy&key=${API_KEY}`;
      const respuestaFarmacias = await axios.get(farmaciasURL);
      if (respuestaFarmacias.data.results && respuestaFarmacias.data.results.length > 0) {
        return { success: true, data: respuestaFarmacias.data.results.map(farmacia => ({
          id: farmacia.place_id,
          name: farmacia.name,
          lat: farmacia.geometry.location.lat,
          lng: farmacia.geometry.location.lng,
          place_id: farmacia.place_id
        }))};
      } else {
        return { success: false, message: 'No se ha encontrado ninguna farmacia' };
      }
    } else {
      return { success: false, message: 'No se ha encontrado la ciudad' };
    }
  } catch (error) {
    console.error('Error fetching pharmacies by city:', error);
    return { success: false, message: 'Error al buscar farmacias' };
  }
}

// Función para obtener detalles de una farmacia específica
export const obtenerDetallesFarmacias = async (farma) => {
  const detallesUrl = `/maps/api/place/details/json?place_id=${farma.place_id}&fields=name,rating,formatted_phone_number,opening_hours,photos&key=${API_KEY}`;
  const response = await axios.get(detallesUrl);
  return response.data.result;  // Contiene los detalles extendidos
}

// Función para enriquecer una lista de farmacias con detalles adicionales
export const datosFarmacia = async (farmas) => {
  const promises = farmas.map(async (farm) => {
    const detalles = await obtenerDetallesFarmacias(farm);
    const datosDeFarmacia = { ...farm, ...detalles };
    return datosDeFarmacia;
  });
  return Promise.all(promises);
}

// Función para obtener la URL de una foto de farmacia
export const getPhotoUrl = (photoReference) => {
  return `/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${API_KEY}`;
}
