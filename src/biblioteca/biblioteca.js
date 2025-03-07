// Función para generar un nuevi UUID aleatorio.
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export {generateUUID};

//Función para formatear la fecha  (Cortesía GPT)
function convertirStringAFecha(strFecha) {
  // Crear un objeto Date a partir del string de fecha
  var fecha = new Date(strFecha);

  // Obtener los componentes de fecha y hora
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
  var año = fecha.getFullYear();
  var horas = fecha.getHours();
  var minutos = fecha.getMinutes();

  // Añadir cero a la izquierda si es necesario para día y mes
  dia = dia < 10 ? '0' + dia : dia;
  mes = mes < 10 ? '0' + mes : mes;
  horas = horas < 10 ? '0' + horas : horas;
  minutos = minutos < 10 ? '0' + minutos : minutos;

  // Formatear la fecha y hora como string
  var fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}`;

  return fechaFormateada;
}


function cambiarFormatoFecha(fecha) {
  const partes = fecha.split('-'); // Separa la fecha por el guion
  return `${partes[2]}-${partes[1]}-${partes[0]}`; // Reordena las partes
}

function convertirFormatoHora(horaCompleta) {
  const partes = horaCompleta.split(':'); // Separa la hora por los dos puntos
  if (partes.length < 2) {
    throw new Error('Formato de hora inválido. Asegúrate de que esté en formato "HH:mm:ss".');
  }
  return `${partes[0]}:${partes[1]}`; // Devuelve solo la hora y los minutos
}



export {convertirStringAFecha, cambiarFormatoFecha, convertirFormatoHora};